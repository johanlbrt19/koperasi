const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendEmail, emailTemplates } = require('../utils/email');
const ActivityLog = require('../models/ActivityLog');

// Generate JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Create activity log
const createActivityLog = async (userId, action, description, targetUserId = null, details = {}) => {
  try {
    await ActivityLog.create({
      user: userId,
      action,
      description,
      targetUser: targetUserId,
      details
    });
  } catch (error) {
    console.error('Error creating activity log:', error);
  }
};

// Register user
exports.register = async (req, res) => {
  try {
    const { nim, nama, email, password, fakultas, jurusan } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { nim }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: existingUser.email === email ? 'Email sudah terdaftar' : 'NIM sudah terdaftar'
      });
    }

    // Check if required files are uploaded
    if (!req.files || !req.files.ktm || !req.files.berkas || !req.files.foto) {
      return res.status(400).json({
        success: false,
        message: 'File KTM, berkas pendukung, dan foto profil wajib diupload'
      });
    }

    // Create user
    const user = await User.create({
      nim,
      nama,
      email,
      password,
      fakultas,
      jurusan,
      ktmFile: req.files.ktm[0].filename,
      berkasFile: req.files.berkas[0].filename,
      fotoProfile: req.files.foto[0].filename
    });

    // Send registration success email (non-blocking)
    try {
      const emailTemplate = emailTemplates.registrationSuccess(nama);
      await sendEmail({
        email: email,
        ...emailTemplate
      });
    } catch (emailError) {
      console.error('Email sending failed (registration will proceed):', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Pendaftaran berhasil! Silakan tunggu konfirmasi dari admin.',
      data: {
        user: {
          id: user._id,
          nim: user.nim,
          nama: user.nama,
          email: user.email,
          status: user.status
        }
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Silakan coba lagi.'
    });
  }
};

// Login user with NIM
exports.login = async (req, res) => {
  try {
    const { nim, password } = req.body;

    // Check if user exists and get password
    const user = await User.findOne({ nim }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'NIM atau password salah'
      });
    }

    // Check if user is approved
    if (user.status !== 'approved' && user.role === 'user') {
      let message = 'Akun Anda belum disetujui oleh admin';
      if (user.status === 'rejected') {
        message = `Akun Anda ditolak. Alasan: ${user.rejectionReason || 'Tidak ada alasan spesifik'}`;
      }
      return res.status(403).json({
        success: false,
        message
      });
    }

    // Generate token
    const token = signToken(user._id);

    // Log login activity
    await createActivityLog(user._id, 'login', `${user.nama} berhasil login`);

    res.status(200).json({
      success: true,
      message: 'Login berhasil',
      token,
      data: {
        user: {
          id: user._id,
          nim: user.nim,
          nama: user.nama,
          email: user.email,
          fakultas: user.fakultas,
          jurusan: user.jurusan,
          role: user.role,
          status: user.status,
          fotoProfile: user.fotoProfile
        }
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Silakan coba lagi.'
    });
  }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const { nim, email } = req.body;

    const user = await User.findOne({ nim, email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'NIM atau email tidak ditemukan'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    // Send reset email (use SPA hash route with query token)
    const resetUrl = `${req.protocol}://${req.get('host')}/#/reset-password?token=${resetToken}`;
    const emailTemplate = emailTemplates.resetPassword(user.nama, resetUrl);
    
    await sendEmail({
      email: user.email,
      ...emailTemplate
    });

    res.status(200).json({
      success: true,
      message: 'Email reset password telah dikirim'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Silakan coba lagi.'
    });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Token tidak valid atau sudah expired'
      });
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    // Log password change
    await createActivityLog(user._id, 'change_password', `${user.nama} berhasil mengubah password`);

    res.status(200).json({
      success: true,
      message: 'Password berhasil diubah'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Silakan coba lagi.'
    });
  }
};

// Get current user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          nim: user.nim,
          nama: user.nama,
          email: user.email,
          fakultas: user.fakultas,
          jurusan: user.jurusan,
          role: user.role,
          status: user.status,
          fotoProfile: user.fotoProfile
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { nama, email } = req.body;
    const updateData = {};

    if (nama) updateData.nama = nama;
    if (email) updateData.email = email;

    // Check if email is already taken by another user
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: req.user.id } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email sudah digunakan oleh user lain'
        });
      }
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
      runValidators: true
    });

    // Log profile update
    await createActivityLog(user._id, 'update_profile', `${user.nama} berhasil mengubah profil`);

    res.status(200).json({
      success: true,
      message: 'Profil berhasil diperbarui',
      data: {
        user: {
          id: user._id,
          nim: user.nim,
          nama: user.nama,
          email: user.email,
          fakultas: user.fakultas,
          jurusan: user.jurusan,
          role: user.role,
          status: user.status
        }
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    if (!(await user.matchPassword(currentPassword))) {
      return res.status(400).json({
        success: false,
        message: 'Password saat ini salah'
      });
    }

    user.password = newPassword;
    await user.save();

    // Log password change
    await createActivityLog(user._id, 'change_password', `${user.nama} berhasil mengubah password`);

    res.status(200).json({
      success: true,
      message: 'Password berhasil diubah'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Upload profile photo
exports.uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'File foto tidak ditemukan'
      });
    }

    const user = await User.findByIdAndUpdate(req.user.id, {
      fotoProfile: req.file.filename
    }, { new: true });

    // Log profile photo update
    await createActivityLog(user._id, 'update_profile', `${user.nama} berhasil mengubah foto profil`);

    res.status(200).json({
      success: true,
      message: 'Foto profil berhasil diubah',
      data: {
        fotoProfile: user.fotoProfile
      }
    });

  } catch (error) {
    console.error('Upload profile photo error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};