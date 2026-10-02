"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, User, Settings, LogOut, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MobileSidebar } from "@/components/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

const DEFAULT_AVATAR = "https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay"

export function Navbar() {
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR)

  useEffect(() => {
    const updateAvatar = () => {
      const savedAvatar = localStorage.getItem("user_avatar")
      if (savedAvatar) {
        setAvatar(savedAvatar)
      } else {
        setAvatar(DEFAULT_AVATAR)
      }
    }

    updateAvatar()
    window.addEventListener("avatarChanged", updateAvatar)

    return () => {
      window.removeEventListener("avatarChanged", updateAvatar)
    }
  }, [])

  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 flex items-center justify-between sticky top-0 z-10">
      
      {/* Sol Kısım: Mobil Menü ve Arama */}
      <div className="flex items-center gap-3 w-full max-w-md">
        <MobileSidebar />
        
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Ara..."
            className="w-full pl-8 bg-muted/40 rounded-lg text-sm"
          />
        </div>
      </div>

      {/* Sağ Kısım: Bildirimler ve Profil Dropdown Menüleri */}
      <div className="flex items-center gap-4">
        
        {/* Bildirimler Menüsü */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="font-semibold">Bildirimler</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
              <div className="flex items-center gap-2 font-medium text-xs">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Yeni Sipariş Alındı</span>
              </div>
              <p className="text-xs text-muted-foreground pl-6">Kenji Satoru 1,999.00 TL tutarında alışveriş yaptı.</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
              <div className="flex items-center gap-2 font-medium text-xs">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Sistem Güncellendi</span>
              </div>
              <p className="text-xs text-muted-foreground pl-6">Admin panel v1.2 başarıyla yayına alındı.</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profil Menüsü */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 pl-2 border-l cursor-pointer hover:opacity-80 transition-opacity">
              <Avatar className="h-9 w-9 border border-border shadow-sm">
                <AvatarImage src={avatar} />
                <AvatarFallback>BK</AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left leading-tight">
                <span className="block text-sm font-semibold">Berkay Kök</span>
                <span className="block text-xs text-muted-foreground">Admin</span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                <User className="h-4 w-4" />
                <span>Profil Ayarları</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                <Settings className="h-4 w-4" />
                <span>Ayarlar</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive focus:text-destructive flex items-center gap-2 cursor-pointer"
              onClick={() => alert("Çıkış yapıldı.")}
            >
              <LogOut className="h-4 w-4" />
              <span>Çıkış Yap</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  )
}