"use client"

import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DollarSign, Users, CreditCard, Activity, TrendingUp } from "lucide-react"

const monthlyData = [
  { month: "Oca", amount: 5600 },
  { month: "Şub", amount: 3100 },
  { month: "Mar", amount: 2400 },
  { month: "Nis", amount: 2100 },
  { month: "May", amount: 1100 },
  { month: "Haz", amount: 5650 },
  { month: "Tem", amount: 5800 },
  { month: "Ağu", amount: 4100 },
  { month: "Eyl", amount: 2200 },
  { month: "Eki", amount: 3500 },
]

const recentSales = [
  {
    name: "Kenji Satoru",
    email: "kenji@example.com",
    amount: "₺1,999.00",
    quantity: "2 adet ürün",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kenji",
  },
  {
    name: "Kadir Yılmaz",
    email: "kadir@example.com",
    amount: "₺39.00",
    quantity: "1 adet ürün",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kadir",
  },
  {
    name: "Mustafa Kaya",
    email: "mustafa@example.com",
    amount: "₺299.00",
    quantity: "3 adet ürün",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mustafa",
  },
  {
    name: "Berkay Kök",
    email: "berkay@example.com",
    amount: "₺99.00",
    quantity: "1 adet ürün",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay",
  },
]

export default function DashboardPage() {
  const maxAmount = Math.max(...monthlyData.map((d) => d.amount))

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="md:pl-64 flex flex-col min-h-screen">
        <Navbar />

        <main className="p-4 md:p-6 space-y-6 flex-1">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Genel Bakış</h1>
          </div>

          {/* İstatistik Kartları */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₺45,231.89</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <span className="text-emerald-500 font-medium">+20.1%</span> geçen aydan beri
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Yeni Kullanıcılar</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2,350</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <span className="text-emerald-500 font-medium">+180.1%</span> geçen aydan beri
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Satışlar</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <span className="text-emerald-500 font-medium">+19%</span> geçen aydan beri
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Aktif Oturumlar</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <span className="text-emerald-500 font-medium">+201</span> son 1 saatte
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Grafik ve Son Satışlar */}
          <div className="grid gap-6 md:grid-cols-7">
            {/* Aylık Gelir Analizi Grafiği */}
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Aylık Gelir Analizi</CardTitle>
                <CardDescription>Son 10 aya ait genel satış dağılımı.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[280px] w-full pt-4">
                  <div className="flex h-full items-end justify-between gap-2 border-b border-border pb-6">
                    {monthlyData.map((item) => {
                      const heightPercent = Math.round((item.amount / maxAmount) * 100)
                      return (
                        <div
                          key={item.month}
                          className="group relative flex flex-1 flex-col items-center h-full justify-end"
                        >
                          {/* İyileştirilmiş ve Okunabilir Tooltip */}
                          <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-30 bg-popover text-popover-foreground border border-border text-xs font-semibold px-2.5 py-1 rounded-md shadow-md whitespace-nowrap">
                            ₺{item.amount.toLocaleString("tr-TR")}
                          </div>

                          {/* Sütun Çubuğu */}
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className="w-full max-w-[36px] bg-primary/80 group-hover:bg-primary rounded-t transition-colors duration-150"
                          />

                          <span className="absolute -bottom-6 text-xs text-muted-foreground font-medium">
                            {item.month}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Son Satışlar Kartı (Adet Bilgisi Eklenmiş) */}
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Son Satışlar</CardTitle>
                <CardDescription>Bu ay toplam 265 satış gerçekleşti.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentSales.map((sale, i) => (
                    <div key={i} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border">
                          <AvatarImage src={sale.avatar} alt={sale.name} />
                          <AvatarFallback>{sale.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold leading-none">{sale.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{sale.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-foreground">{sale.amount}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{sale.quantity}</p>
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