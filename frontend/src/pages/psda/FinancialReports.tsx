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
import { FileText, Download, BarChart3, TrendingUp, Calendar, Filter } from 'lucide-react';

const FinancialReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);

  // Mock data - replace with actual API calls
  const financialSummary = {
    totalAssets: 5000000000,
    totalLiabilities: 2000000000,
    netWorth: 3000000000,
    monthlyRevenue: 500000000,
    monthlyExpenses: 300000000,
    netIncome: 200000000
  };

  const balanceSheet = [
    {
      category: 'Aset Lancar',
      items: [
        { name: 'Kas dan Bank', amount: 1000000000 },
        { name: 'Piutang Anggota', amount: 500000000 },
        { name: 'Simpanan Berjangka', amount: 2000000000 }
      ]
    },
    {
      category: 'Aset Tetap',
      items: [
        { name: 'Gedung', amount: 1000000000 },
        { name: 'Peralatan', amount: 500000000 }
      ]
    },
    {
      category: 'Kewajiban',
      items: [
        { name: 'Simpanan Anggota', amount: 1500000000 },
        { name: 'Pinjaman Bank', amount: 500000000 }
      ]
    }
  ];

  const incomeStatement = [
    {
      category: 'Pendapatan',
      items: [
        { name: 'Bunga Pinjaman', amount: 100000000 },
        { name: 'Jasa Simpanan', amount: 50000000 },
        { name: 'Pendapatan Lainnya', amount: 50000000 }
      ]
    },
    {
      category: 'Beban',
      items: [
        { name: 'Bunga Simpanan', amount: 30000000 },
        { name: 'Beban Operasional', amount: 20000000 },
        { name: 'Beban Administrasi', amount: 10000000 }
      ]
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleExport = (format: string) => {
    console.log('Export report:', { format, period: selectedPeriod, year: selectedYear });
    // Implement export logic
    setIsExportDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Laporan Keuangan</h1>
            <p className="text-gray-600">Analisis dan laporan keuangan koperasi</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Aset
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(financialSummary.totalAssets)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +12.5% dari tahun lalu
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Kewajiban
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(financialSummary.totalLiabilities)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +8.2% dari tahun lalu
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Kekayaan Bersih
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(financialSummary.netWorth)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +15.3% dari tahun lalu
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Export */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Filter Laporan</CardTitle>
                  <CardDescription>
                    Pilih periode dan format laporan
                  </CardDescription>
                </div>
                <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Download className="mr-2 h-4 w-4" />
                      Export Laporan
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Export Laporan</DialogTitle>
                      <DialogDescription>
                        Pilih format file untuk export laporan
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Button onClick={() => handleExport('pdf')} variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          PDF
                        </Button>
                        <Button onClick={() => handleExport('excel')} variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          Excel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="period">Periode</Label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih periode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Bulanan</SelectItem>
                      <SelectItem value="quarterly">Triwulan</SelectItem>
                      <SelectItem value="yearly">Tahunan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="year">Tahun</Label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tahun" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Terapkan Filter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reports */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Balance Sheet */}
            <Card>
              <CardHeader>
                <CardTitle>Neraca</CardTitle>
                <CardDescription>
                  Posisi keuangan koperasi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {balanceSheet.map((section, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">
                        {section.category}
                      </h4>
                      <div className="space-y-1">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex justify-between text-sm">
                            <span className="text-gray-600">{item.name}</span>
                            <span className="font-medium">{formatCurrency(item.amount)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Income Statement */}
            <Card>
              <CardHeader>
                <CardTitle>Laba Rugi</CardTitle>
                <CardDescription>
                  Pendapatan dan beban koperasi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {incomeStatement.map((section, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">
                        {section.category}
                      </h4>
                      <div className="space-y-1">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex justify-between text-sm">
                            <span className="text-gray-600">{item.name}</span>
                            <span className="font-medium">{formatCurrency(item.amount)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-sm font-semibold">
                      <span>Laba Bersih</span>
                      <span className="text-green-600">
                        {formatCurrency(financialSummary.netIncome)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;
