"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const DEFAULT_AVATAR = "https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay"

export function Navbar() {
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR)

  useEffect(() => {
    // Sayfa ilk yüklendiğinde localStorage'dan alalım
    const updateAvatar = () => {
      const savedAvatar = localStorage.getItem("user_avatar")
      if (savedAvatar) {
        setAvatar(savedAvatar)
      } else {
        setAvatar(DEFAULT_AVATAR)
      }
    }

    updateAvatar()

    // Ayarlar sayfasından tetiklenen özel olayı (event) dinleyelim
    window.addEventListener("avatarChanged", updateAvatar)

    return () => {
      window.removeEventListener("avatarChanged", updateAvatar)
    }
  }, [])

  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Ara..."
            className="w-full pl-8 bg-muted/40 rounded-lg text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </Button>

        <div className="flex items-center gap-3 pl-2 border-l">
          <Avatar className="h-9 w-9 border border-border shadow-sm">
            <AvatarImage src={avatar} />
            <AvatarFallback>BK</AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left leading-tight">
            <span className="block text-sm font-semibold">Berkay Kök</span>
            <span className="block text-xs text-muted-foreground">Admin</span>
          </div>
        </div>
      </div>
    </header>
  )
}