"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Package, BarChart3, Settings, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useState } from "react"

const routes = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Kullanıcılar", icon: Users, href: "/users" },
  { label: "Ürünler", icon: Package, href: "/products" },
  { label: "Analizler", icon: BarChart3, href: "/analytics" },
  { label: "Ayarlar", icon: Settings, href: "/settings" },
]

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-card text-card-foreground border-r border-border">
      {/* Logo & Başlık */}
      <div className="p-6 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
          A
        </div>
        <span className="font-bold text-lg">AdminPanel</span>
      </div>

      {/* Menü Linkleri */}
      <div className="flex-1 px-4 space-y-1">
        {routes.map((route) => {
          const isActive = pathname === route.href
          return (
            <Link
              key={route.href}
              href={route.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-secondary text-foreground font-semibold"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.label}
            </Link>
          )
        })}
      </div>

      {/* Çıkış Yap Butonu */}
      <div className="p-4 border-t border-border mt-auto">
        <button 
          onClick={() => {
            if (onNavigate) onNavigate()
            alert("Çıkış yapıldı.")
          }}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Çıkış Yap
        </button>
      </div>
    </div>
  )
}

export function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-50">
      <SidebarContent />
    </aside>
  )
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigasyon Menüsü</SheetTitle>
        </SheetHeader>
        <SidebarContent onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}