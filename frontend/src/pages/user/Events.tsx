import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, MapPin, Users, Search, Filter } from 'lucide-react';

const Events: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock data - replace with actual API calls
  const events = [
    {
      id: '1',
      title: 'Rapat Anggota Tahunan',
      description: 'Rapat anggota tahunan untuk membahas laporan keuangan dan rencana kerja tahun depan',
      date: '2024-03-15',
      time: '09:00',
      location: 'Aula Utama UIN SGD',
      category: 'Rapat',
      status: 'upcoming',
      maxParticipants: 200,
      currentParticipants: 150,
      image: '/placeholder-event.jpg'
    },
    {
      id: '2',
      title: 'Pelatihan Kewirausahaan',
      description: 'Pelatihan kewirausahaan untuk mengembangkan kemampuan bisnis anggota',
      date: '2024-02-20',
      time: '14:00',
      location: 'Ruang Seminar FEB',
      category: 'Pelatihan',
      status: 'upcoming',
      maxParticipants: 50,
      currentParticipants: 35,
      image: '/placeholder-event.jpg'
    },
    {
      id: '3',
      title: 'Bazar Produk Koperasi',
      description: 'Pameran dan penjualan produk-produk hasil usaha koperasi',
      date: '2024-01-25',
      time: '08:00',
      location: 'Lapangan Parkir Kampus',
      category: 'Bazar',
      status: 'completed',
      maxParticipants: 100,
      currentParticipants: 100,
      image: '/placeholder-event.jpg'
    }
  ];

  const categories = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'Rapat', label: 'Rapat' },
    { value: 'Pelatihan', label: 'Pelatihan' },
    { value: 'Bazar', label: 'Bazar' },
    { value: 'Seminar', label: 'Seminar' },
    { value: 'Lainnya', label: 'Lainnya' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="default">Akan Datang</Badge>;
      case 'ongoing':
        return <Badge variant="secondary">Sedang Berlangsung</Badge>;
      case 'completed':
        return <Badge variant="outline">Selesai</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRegister = (eventId: string) => {
    console.log('Register for event:', eventId);
    // Implement registration logic
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Kegiatan Koperasi</h1>
            <p className="text-gray-600">Daftar kegiatan dan acara koperasi</p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari kegiatan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="aspect-video bg-gray-200 relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    {getStatusBadge(event.status)}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="mr-2 h-4 w-4" />
                      {new Date(event.date).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="mr-2 h-4 w-4" />
                      {event.time} WIB
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="mr-2 h-4 w-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="mr-2 h-4 w-4" />
                      {event.currentParticipants}/{event.maxParticipants} peserta
                    </div>
                  </div>

                  <div className="pt-4">
                    {event.status === 'upcoming' ? (
                      <Button 
                        className="w-full" 
                        onClick={() => handleRegister(event.id)}
                        disabled={event.currentParticipants >= event.maxParticipants}
                      >
                        {event.currentParticipants >= event.maxParticipants ? 'Penuh' : 'Daftar'}
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full" disabled>
                        {event.status === 'completed' ? 'Selesai' : 'Tidak Tersedia'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Tidak ada kegiatan ditemukan
                </h3>
                <p className="text-gray-500">
                  Coba ubah filter atau kata kunci pencarian Anda.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
