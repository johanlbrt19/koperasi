const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../config/multer');
const Event = require('../models/Event');
const {
  getPendingApplications,
  getAllApplications,
  getApplicationDetails,
  approveApplication,
  rejectApplication,
  getStats,
} = require('../controllers/adminController');

const router = express.Router();

// Protect and authorize PSDA only
router.use(protect);
router.use(authorize('psda'));

// PSDA controls applications approval/review
router.get('/applications/pending', getPendingApplications);
router.get('/applications', getAllApplications);
router.get('/applications/:id', getApplicationDetails);
router.put('/applications/:id/approve', approveApplication);
router.put('/applications/:id/reject', rejectApplication);

// Create event
router.post('/events', upload.single('poster'), async (req, res) => {
  try {
    const { title, description, date, time, startTime, endTime, location, enableAttendance, category } = req.body;
    const event = await Event.create({
      title,
      description,
      date,
      time,
      startTime,
      endTime,
      location,
      category,
      poster: req.file ? req.file.filename : null,
      enableAttendance: enableAttendance !== 'false',
      createdBy: req.user._id
    });
    res.status(201).json({ success: true, data: { event } });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// List events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json({ success: true, data: { events } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get single event
router.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event tidak ditemukan' });
    res.json({ success: true, data: { event } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update event
router.put('/events/:id', upload.single('poster'), async (req, res) => {
  try {
    const { title, description, date, time, startTime, endTime, location, enableAttendance, category } = req.body;
    const update = { title, description, date, time, startTime, endTime, location, category };
    if (typeof enableAttendance !== 'undefined') update.enableAttendance = enableAttendance !== 'false';
    if (req.file) update.poster = req.file.filename;

    const event = await Event.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!event) return res.status(404).json({ success: false, message: 'Event tidak ditemukan' });
    res.json({ success: true, data: { event } });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete event
router.delete('/events/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event tidak ditemukan' });
    res.json({ success: true, message: 'Event dihapus' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;


