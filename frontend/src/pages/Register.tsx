import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Upload, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const registerSchema = z.object({
  nim: z.string().min(1, 'NIM wajib diisi'),
  nama: z.string().min(1, 'Nama lengkap wajib diisi'),
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  confirmPassword: z.string(),
  fakultas: z.string().min(1, 'Fakultas wajib dipilih'),
  jurusan: z.string().min(1, 'Jurusan wajib diisi'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak sama",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const fakultasOptions = [
  'Fakultas Adab dan Humaniora',
  'Fakultas Dakwah dan Komunikasi',
  'Fakultas Ekonomi dan Bisnis Islam',
  'Fakultas Ilmu Tarbiyah dan Keguruan',
  'Fakultas Psikologi',
  'Fakultas Sains dan Teknologi',
  'Fakultas Syariah dan Hukum',
  'Fakultas Ushuluddin'
];

const Register: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<{
    ktm: File | null;
    berkas: File | null;
    foto: File | null;
  }>({
    ktm: null,
    berkas: null,
    foto: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleFileChange = (field: 'ktm' | 'berkas' | 'foto', file: File | null) => {
    setFiles(prev => ({ ...prev, [field]: file }));
  };

  const onSubmit = async (data: RegisterFormData) => {
    // Validate files
    if (!files.ktm || !files.berkas || !files.foto) {
      toast({
        title: "Error",
        description: "Semua file (KTM, berkas pendukung, dan foto profil) wajib diupload",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('nim', data.nim);
      formData.append('nama', data.nama);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('fakultas', data.fakultas);
      formData.append('jurusan', data.jurusan);
      formData.append('ktm', files.ktm);
      formData.append('berkas', files.berkas);
      formData.append('foto', files.foto);

      await registerUser(formData);
      
      toast({
        title: "Pendaftaran Berhasil",
        description: "Akun Anda telah terdaftar. Silakan tunggu konfirmasi dari admin.",
      });
      
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Terjadi kesalahan saat mendaftar",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Daftar Akun
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Bergabung dengan Koperasi Mahasiswa UIN SGD Bandung
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Form Pendaftaran</CardTitle>
            <CardDescription>
              Lengkapi data diri Anda untuk mendaftar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* NIM */}
              <div>
                <Label htmlFor="nim">NIM</Label>
                <Input
                  id="nim"
                  type="text"
                  {...register('nim')}
                  className={errors.nim ? 'border-red-500' : ''}
                />
                {errors.nim && (
                  <p className="mt-1 text-sm text-red-600">{errors.nim.message}</p>
                )}
              </div>

              {/* Nama */}
              <div>
                <Label htmlFor="nama">Nama Lengkap</Label>
                <Input
                  id="nama"
                  type="text"
                  {...register('nama')}
                  className={errors.nama ? 'border-red-500' : ''}
                />
                {errors.nama && (
                  <p className="mt-1 text-sm text-red-600">{errors.nama.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword')}
                  className={errors.confirmPassword ? 'border-red-500' : ''}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Fakultas */}
              <div>
                <Label htmlFor="fakultas">Fakultas</Label>
                <Select onValueChange={(value) => setValue('fakultas', value)}>
                  <SelectTrigger className={errors.fakultas ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Pilih fakultas" />
                  </SelectTrigger>
                  <SelectContent>
                    {fakultasOptions.map((fakultas) => (
                      <SelectItem key={fakultas} value={fakultas}>
                        {fakultas}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.fakultas && (
                  <p className="mt-1 text-sm text-red-600">{errors.fakultas.message}</p>
                )}
              </div>

              {/* Jurusan */}
              <div>
                <Label htmlFor="jurusan">Jurusan</Label>
                <Input
                  id="jurusan"
                  type="text"
                  {...register('jurusan')}
                  className={errors.jurusan ? 'border-red-500' : ''}
                />
                {errors.jurusan && (
                  <p className="mt-1 text-sm text-red-600">{errors.jurusan.message}</p>
                )}
              </div>

              {/* File Uploads */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Upload Dokumen</h3>
                
                {/* KTM */}
                <div>
                  <Label htmlFor="ktm">Kartu Tanda Mahasiswa (KTM)</Label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="ktm"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload file</span>
                          <input
                            id="ktm"
                            name="ktm"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={(e) => handleFileChange('ktm', e.target.files?.[0] || null)}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, JPEG</p>
                    </div>
                  </div>
                  {files.ktm && (
                    <div className="mt-2 flex items-center text-sm text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {files.ktm.name}
                    </div>
                  )}
                </div>

                {/* Berkas Pendukung */}
                <div>
                  <Label htmlFor="berkas">Berkas Pendukung</Label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="berkas"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload file</span>
                          <input
                            id="berkas"
                            name="berkas"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={(e) => handleFileChange('berkas', e.target.files?.[0] || null)}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, JPEG</p>
                    </div>
                  </div>
                  {files.berkas && (
                    <div className="mt-2 flex items-center text-sm text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {files.berkas.name}
                    </div>
                  )}
                </div>

                {/* Foto Profil */}
                <div>
                  <Label htmlFor="foto">Foto Profil</Label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="foto"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload file</span>
                          <input
                            id="foto"
                            name="foto"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={(e) => handleFileChange('foto', e.target.files?.[0] || null)}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, JPEG</p>
                    </div>
                  </div>
                  {files.foto && (
                    <div className="mt-2 flex items-center text-sm text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {files.foto.name}
                    </div>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mendaftar...
                  </>
                ) : (
                  'Daftar'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Sudah punya akun?{' '}
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Masuk di sini
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
