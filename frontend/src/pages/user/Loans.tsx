import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, CreditCard, FileText, Download, Eye, Calculator } from 'lucide-react';

const Loans: React.FC = () => {
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [loanTenure, setLoanTenure] = useState('');

  // Mock data - replace with actual API calls
  const loanSummary = {
    totalLoans: 2,
    activeLoans: 1,
    totalAmount: 5000000,
    monthlyPayment: 500000,
    nextPayment: '2024-02-15'
  };

  const activeLoans = [
    {
      id: '1',
      amount: 5000000,
      purpose: 'Biaya Kuliah',
      tenure: 12,
      interestRate: 12,
      monthlyPayment: 500000,
      remainingBalance: 3000000,
      nextPayment: '2024-02-15',
      status: 'active'
    }
  ];

  const completedLoans = [
    {
      id: '2',
      amount: 2000000,
      purpose: 'Laptop',
      tenure: 6,
      interestRate: 10,
      monthlyPayment: 350000,
      completedDate: '2023-12-15',
      status: 'completed'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Aktif</Badge>;
      case 'completed':
        return <Badge variant="secondary">Lunas</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Jatuh Tempo</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  const handleApplyLoan = () => {
    console.log('Apply loan:', { loanAmount, loanPurpose, loanTenure });
    // Implement loan application logic
    setIsApplyDialogOpen(false);
    setLoanAmount('');
    setLoanPurpose('');
    setLoanTenure('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Pinjaman Saya</h1>
            <p className="text-gray-600">Kelola pinjaman dan cicilan Anda</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Pinjaman
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(loanSummary.totalAmount)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {loanSummary.totalLoans} pinjaman
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pinjaman Aktif
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loanSummary.activeLoans}
                </div>
                <p className="text-xs text-muted-foreground">
                  Sedang berjalan
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Cicilan Bulanan
                </CardTitle>
                <Calculator className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(loanSummary.monthlyPayment)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total per bulan
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Jatuh Tempo
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loanSummary.nextPayment}
                </div>
                <p className="text-xs text-muted-foreground">
                  Pembayaran berikutnya
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
                <CardDescription>
                  Kelola pinjaman Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Ajukan Pinjaman
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ajukan Pinjaman</DialogTitle>
                      <DialogDescription>
                        Isi form untuk mengajukan pinjaman baru
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="loan-amount">Jumlah Pinjaman</Label>
                        <Input
                          id="loan-amount"
                          type="number"
                          placeholder="Masukkan jumlah"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="loan-purpose">Tujuan Pinjaman</Label>
                        <Select value={loanPurpose} onValueChange={setLoanPurpose}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih tujuan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="education">Biaya Kuliah</SelectItem>
                            <SelectItem value="equipment">Peralatan</SelectItem>
                            <SelectItem value="emergency">Dana Darurat</SelectItem>
                            <SelectItem value="other">Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="loan-tenure">Tenor (bulan)</Label>
                        <Select value={loanTenure} onValueChange={setLoanTenure}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih tenor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6">6 Bulan</SelectItem>
                            <SelectItem value="12">12 Bulan</SelectItem>
                            <SelectItem value="24">24 Bulan</SelectItem>
                            <SelectItem value="36">36 Bulan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleApplyLoan} className="w-full">
                        Ajukan Pinjaman
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="w-full">
                  <Calculator className="mr-2 h-4 w-4" />
                  Kalkulator Pinjaman
                </Button>

                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Laporan
                </Button>
              </CardContent>
            </Card>

            {/* Loan Details */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Detail Pinjaman</CardTitle>
                <CardDescription>
                  Informasi pinjaman Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="active" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="active">
                      Pinjaman Aktif ({activeLoans.length})
                    </TabsTrigger>
                    <TabsTrigger value="completed">
                      Pinjaman Lunas ({completedLoans.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="active" className="mt-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Jumlah</TableHead>
                          <TableHead>Tujuan</TableHead>
                          <TableHead>Tenor</TableHead>
                          <TableHead>Cicilan</TableHead>
                          <TableHead>Sisa</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activeLoans.map((loan) => (
                          <TableRow key={loan.id}>
                            <TableCell className="font-medium">
                              {formatCurrency(loan.amount)}
                            </TableCell>
                            <TableCell>{loan.purpose}</TableCell>
                            <TableCell>{loan.tenure} bulan</TableCell>
                            <TableCell>{formatCurrency(loan.monthlyPayment)}</TableCell>
                            <TableCell>{formatCurrency(loan.remainingBalance)}</TableCell>
                            <TableCell>{getStatusBadge(loan.status)}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>

                  <TabsContent value="completed" className="mt-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Jumlah</TableHead>
                          <TableHead>Tujuan</TableHead>
                          <TableHead>Tenor</TableHead>
                          <TableHead>Cicilan</TableHead>
                          <TableHead>Lunas</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {completedLoans.map((loan) => (
                          <TableRow key={loan.id}>
                            <TableCell className="font-medium">
                              {formatCurrency(loan.amount)}
                            </TableCell>
                            <TableCell>{loan.purpose}</TableCell>
                            <TableCell>{loan.tenure} bulan</TableCell>
                            <TableCell>{formatCurrency(loan.monthlyPayment)}</TableCell>
                            <TableCell>{loan.completedDate}</TableCell>
                            <TableCell>{getStatusBadge(loan.status)}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
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
    </div>
  );
};

export default Loans;
