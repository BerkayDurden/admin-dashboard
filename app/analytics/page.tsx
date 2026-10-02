"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Eye,
  ArrowUpRight,
  BarChart2,
} from "lucide-react"

// Zaman Aralığına Göre Dinamik Mock Veriler
const analyticsData = {
  "7days": {
    avgOrder: "₺412.00",
    avgOrderTrend: "+12.1%",
    conversion: "%3.85",
    conversionTrend: "+2.4%",
    visits: "29,120",
    visitsTrend: "+18.2%",
    returnRate: "%0.85",
    returnTrend: "-0.2%",
    categories: [
      { name: "Elektronik", sales: "₺7,850.00", percentage: 58, count: "34 Satış" },
      { name: "Ses Sistemleri", sales: "₺3,120.00", percentage: 23, count: "16 Satış" },
      { name: "Aksesuar", sales: "₺1,640.00", percentage: 12, count: "12 Satış" },
      { name: "Giyim", sales: "₺950.00", percentage: 7, count: "8 Satış" },
    ],
    topProducts: [
      { name: 'AOC 27G50Z 27" 240Hz Monitör', category: "Elektronik", revenue: "₺38,994.00", totalSold: 6 },
      { name: "Mekanik Oyuncu Klavyesi (RGB)", category: "Elektronik", revenue: "₺10,995.00", totalSold: 5 },
      { name: "JBL Tune 520BT Kulaklık", category: "Ses Sistemleri", revenue: "₺7,596.00", totalSold: 4 },
      { name: "Northbayou F80 Monitör Kolu", category: "Aksesuar", revenue: "₺3,897.00", totalSold: 3 },
    ],
  },
  "30days": {
    avgOrder: "₺384.50",
    avgOrderTrend: "+8.4%",
    conversion: "%3.42",
    conversionTrend: "+1.2%",
    visits: "128,450",
    visitsTrend: "+14.6%",
    returnRate: "%1.15",
    returnTrend: "-0.4%",
    categories: [
      { name: "Elektronik", sales: "₺28,450.00", percentage: 62, count: "142 Satış" },
      { name: "Ses Sistemleri", sales: "₺9,850.00", percentage: 22, count: "58 Satış" },
      { name: "Aksesuar", sales: "₺4,930.00", percentage: 11, count: "45 Satış" },
      { name: "Giyim", sales: "₺2,001.89", percentage: 5, count: "20 Satış" },
    ],
    topProducts: [
      { name: 'AOC 27G50Z 27" 240Hz Monitör', category: "Elektronik", revenue: "₺155,976.00", totalSold: 24 },
      { name: "Mekanik Oyuncu Klavyesi (RGB)", category: "Elektronik", revenue: "₺39,582.00", totalSold: 18 },
      { name: "JBL Tune 520BT Kulaklık", category: "Ses Sistemleri", revenue: "₺28,485.00", totalSold: 15 },
      { name: "Northbayou F80 Monitör Kolu", category: "Aksesuar", revenue: "₺15,588.00", totalSold: 12 },
    ],
  },
  year: {
    avgOrder: "₺365.00",
    avgOrderTrend: "+15.2%",
    conversion: "%3.10",
    conversionTrend: "+0.8%",
    visits: "1,450,200",
    visitsTrend: "+24.5%",
    returnRate: "%1.30",
    returnTrend: "+0.1%",
    categories: [
      { name: "Elektronik", sales: "₺342,100.00", percentage: 65, count: "1,840 Satış" },
      { name: "Ses Sistemleri", sales: "₺105,200.00", percentage: 20, count: "620 Satış" },
      { name: "Aksesuar", sales: "₺52,600.00", percentage: 10, count: "410 Satış" },
      { name: "Giyim", sales: "₺26,300.00", percentage: 5, count: "210 Satış" },
    ],
    topProducts: [
      { name: 'AOC 27G50Z 27" 240Hz Monitör', category: "Elektronik", revenue: "₺1,819,720.00", totalSold: 280 },
      { name: "Mekanik Oyuncu Klavyesi (RGB)", category: "Elektronik", revenue: "₺461,790.00", totalSold: 210 },
      { name: "JBL Tune 520BT Kulaklık", category: "Ses Sistemleri", revenue: "₺303,840.00", totalSold: 160 },
      { name: "Northbayou F80 Monitör Kolu", category: "Aksesuar", revenue: "₺181,860.00", totalSold: 140 },
    ],
  },
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"7days" | "30days" | "year">("30days")

  const currentData = analyticsData[timeRange]

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="md:pl-64 flex flex-col min-h-screen">
        <Navbar />

        <main className="p-4 md:p-6 space-y-6 flex-1">
          {/* Üst Başlık ve Zaman Aralığı Filtresi */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Analizler & Raporlar</h1>
              <p className="text-sm text-muted-foreground">
                Mağazanızın satış performansını, dönüşüm oranlarını ve kategori dağılımlarını inceleyin.
              </p>
            </div>

            <Select
              value={timeRange}
              onValueChange={(val) => setTimeRange(val as "7days" | "30days" | "year")}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Zaman aralığı" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Son 7 Gün</SelectItem>
                <SelectItem value="30days">Son 30 Gün</SelectItem>
                <SelectItem value="year">Bu Yıl (2026)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Metrik Özet Kartları */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ortalama Sipariş Tutarı</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.avgOrder}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <span className="text-emerald-500 font-medium flex items-center">
                    <TrendingUp className="h-3 w-3 mr-0.5" /> {currentData.avgOrderTrend}
                  </span>
                  önceki döneme göre
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Dönüşüm Oranı</CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.conversion}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <span className="text-emerald-500 font-medium flex items-center">
                    <TrendingUp className="h-3 w-3 mr-0.5" /> {currentData.conversionTrend}
                  </span>
                  önceki döneme göre
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Mağaza Ziyareti</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.visits}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <span className="text-emerald-500 font-medium flex items-center">
                    <TrendingUp className="h-3 w-3 mr-0.5" /> {currentData.visitsTrend}
                  </span>
                  önceki döneme göre
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">İade & İptal Oranı</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentData.returnRate}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <span className="text-emerald-500 font-medium flex items-center">
                    <TrendingDown className="h-3 w-3 mr-0.5" /> {currentData.returnTrend}
                  </span>
                  değişim oranı
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Kategori Dağılımı ve En Çok Satan Ürünler */}
          <div className="grid gap-6 md:grid-cols-7">
            {/* Kategori Bazlı Satış Oranları */}
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Kategori Bazlı Gelir Dağılımı</CardTitle>
                <CardDescription>
                  Seçilen dönemde kategorilerin toplam cirodaki payı.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentData.categories.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span className="flex items-center gap-2">
                        {item.name}
                        <Badge variant="outline" className="text-[10px] font-normal">
                          {item.count}
                        </Badge>
                      </span>
                      <span className="font-bold">{item.sales} ({item.percentage}%)</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* En Çok Ciro Yapan Ürünler */}
            <Card className="md:col-span-3">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Öne Çıkan Ürünler</CardTitle>
                  <CardDescription>En yüksek ciroya ulaşan ilk 4 ürün.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {currentData.topProducts.map((p, index) => (
                    <div key={index} className="flex items-center justify-between gap-3 border-b border-border/50 pb-3 last:border-0 last:pb-0">
                      <div className="space-y-1 overflow-hidden">
                        <p className="text-xs font-semibold truncate">{p.name}</p>
                        <p className="text-[11px] text-muted-foreground">{p.category} • {p.totalSold} Adet</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-bold">{p.revenue}</p>
                        <span className="inline-flex items-center text-[10px] text-emerald-500 font-medium">
                          <ArrowUpRight className="h-3 w-3" /> Popüler
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}