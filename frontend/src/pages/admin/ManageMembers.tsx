import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, UserCheck, UserX, Eye, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const ManageMembers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API calls
  const pendingMembers = [
    {
      id: '1',
      nim: '123456789',
      nama: 'Ahmad Fauzi',
      email: 'ahmad@example.com',
      fakultas: 'Fakultas Sains dan Teknologi',
      jurusan: 'Teknik Informatika',
      status: 'pending',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      nim: '987654321',
      nama: 'Siti Nurhaliza',
      email: 'siti@example.com',
      fakultas: 'Fakultas Ekonomi dan Bisnis Islam',
      jurusan: 'Manajemen',
      status: 'pending',
      createdAt: '2024-01-14'
    }
  ];

  const approvedMembers = [
    {
      id: '3',
      nim: '111222333',
      nama: 'Budi Santoso',
      email: 'budi@example.com',
      fakultas: 'Fakultas Syariah dan Hukum',
      jurusan: 'Hukum Keluarga',
      status: 'approved',
      createdAt: '2024-01-10'
    }
  ];

  const rejectedMembers = [
    {
      id: '4',
      nim: '444555666',
      nama: 'Citra Dewi',
      email: 'citra@example.com',
      fakultas: 'Fakultas Ilmu Tarbiyah dan Keguruan',
      jurusan: 'Pendidikan Matematika',
      status: 'rejected',
      rejectionReason: 'Dokumen tidak lengkap',
      createdAt: '2024-01-12'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Menunggu</Badge>;
      case 'approved':
        return <Badge variant="default">Disetujui</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Ditolak</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleApprove = (memberId: string) => {
    console.log('Approve member:', memberId);
    // Implement approve logic
  };

  const handleReject = (memberId: string) => {
    console.log('Reject member:', memberId);
    // Implement reject logic
  };

  const handleViewDetails = (memberId: string) => {
    console.log('View details:', memberId);
    // Implement view details logic
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Manajemen Anggota</h1>
            <p className="text-gray-600">Kelola pendaftaran dan status anggota koperasi</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Daftar Anggota</CardTitle>
                  <CardDescription>
                    Kelola data anggota dan persetujuan pendaftaran
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari anggota..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pending" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="pending">
                    Menunggu Persetujuan ({pendingMembers.length})
                  </TabsTrigger>
                  <TabsTrigger value="approved">
                    Disetujui ({approvedMembers.length})
                  </TabsTrigger>
                  <TabsTrigger value="rejected">
                    Ditolak ({rejectedMembers.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>NIM</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Fakultas</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Tanggal Daftar</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingMembers.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">{member.nim}</TableCell>
                          <TableCell>{member.nama}</TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell>{member.fakultas}</TableCell>
                          <TableCell>{getStatusBadge(member.status)}</TableCell>
                          <TableCell>{member.createdAt}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewDetails(member.id)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Lihat Detail
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleApprove(member.id)}>
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  Setujui
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleReject(member.id)}>
                                  <UserX className="mr-2 h-4 w-4" />
                                  Tolak
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="approved" className="mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>NIM</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Fakultas</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Tanggal Disetujui</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {approvedMembers.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">{member.nim}</TableCell>
                          <TableCell>{member.nama}</TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell>{member.fakultas}</TableCell>
                          <TableCell>{getStatusBadge(member.status)}</TableCell>
                          <TableCell>{member.createdAt}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewDetails(member.id)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Lihat Detail
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="rejected" className="mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>NIM</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Fakultas</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Alasan Penolakan</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rejectedMembers.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">{member.nim}</TableCell>
                          <TableCell>{member.nama}</TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell>{member.fakultas}</TableCell>
                          <TableCell>{getStatusBadge(member.status)}</TableCell>
                          <TableCell>{member.rejectionReason}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewDetails(member.id)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Lihat Detail
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManageMembers;
