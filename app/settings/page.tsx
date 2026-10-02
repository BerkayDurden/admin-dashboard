"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { User, Bell, Shield, Palette, Upload, Check, Lock } from "lucide-react"

const DEFAULT_AVATAR = "https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()

  // Profil Form State'leri
  const [name, setName] = useState("Berkay Kök")
  const [email, setEmail] = useState("berkay@example.com")
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR)
  const [pendingAvatar, setPendingAvatar] = useState<string | null>(null)
  const [isProfileSaved, setIsProfileSaved] = useState(false)

  // Sayfa ilk açıldığında kaydedilmiş avatarı alalım
  useEffect(() => {
    const savedAvatar = localStorage.getItem("user_avatar")
    if (savedAvatar) {
      setAvatar(savedAvatar)
    }
  }, [])

  // Şifre Form State'leri
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isPassSaved, setIsPassSaved] = useState(false)

  // Bildirim State'leri
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [orderNotifs, setOrderNotifs] = useState(true)
  const [securityAlerts, setSecurityAlerts] = useState(true)

  // Profil Fotoğrafı Seçimi (Geçici önizleme)
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPendingAvatar(result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Varsayılana Dön (Direkt anında uygular)
  const handleResetAvatar = () => {
    setPendingAvatar(null)
    setAvatar(DEFAULT_AVATAR)
    localStorage.setItem("user_avatar", DEFAULT_AVATAR)
    window.dispatchEvent(new Event("avatarChanged"))
  }

  // Profil Kaydet
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()

    if (pendingAvatar !== null) {
      setAvatar(pendingAvatar)
      localStorage.setItem("user_avatar", pendingAvatar)
      window.dispatchEvent(new Event("avatarChanged"))
      setPendingAvatar(null)
    }

    setIsProfileSaved(true)
    setTimeout(() => setIsProfileSaved(false), 2500)
  }

  // Şifre Kaydet
  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) return
    setIsPassSaved(true)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setTimeout(() => setIsPassSaved(false), 2500)
  }

  const activeAvatar = pendingAvatar !== null ? pendingAvatar : avatar

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="md:pl-64 flex flex-col min-h-screen">
        <Navbar />

        <main className="p-6 md:p-8 space-y-8 flex-1 max-w-5xl mx-auto w-full">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Ayarlar</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Hesap tercihlerinizi, bildirimlerinizi ve güvenlik ayarlarınızı yönetin.
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-12 p-1 bg-muted/60 border rounded-xl">
              <TabsTrigger value="profile" className="flex items-center gap-2 rounded-lg font-medium">
                <User className="h-4 w-4" /> Profil
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2 rounded-lg font-medium">
                <Bell className="h-4 w-4" /> Bildirimler
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2 rounded-lg font-medium">
                <Shield className="h-4 w-4" /> Güvenlik
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2 rounded-lg font-medium">
                <Palette className="h-4 w-4" /> Görünüm
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: PROFİL AYARLARI */}
            <TabsContent value="profile">
              <Card className="border shadow-sm">
                <form onSubmit={handleSaveProfile}>
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-xl">Profil Bilgileri</CardTitle>
                    <CardDescription>
                      Profil resminizi ve kişisel bilgilerinizi buradan güncelleyebilirsiniz.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                      <Avatar className="h-20 w-20 border-2 border-border shadow-sm">
                        <AvatarImage src={activeAvatar} />
                        <AvatarFallback>BK</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5">
                          <Label
                            htmlFor="avatar-upload"
                            className="cursor-pointer inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 rounded-md text-xs font-semibold transition-colors"
                          >
                            <Upload className="h-3.5 w-3.5" /> Fotoğraf Yükle
                          </Label>
                          <Input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleResetAvatar}
                            className="text-xs h-9"
                          >
                            Varsayılana Dön
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          JPG, PNG veya SVG formatlarını kullanabilirsiniz.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 pt-2">
                      <div className="space-y-2">
                        <Label htmlFor="set-name">Ad Soyad</Label>
                        <Input
                          id="set-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="set-email">E-posta Adresi</Label>
                        <Input
                          id="set-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="h-10"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t px-6 py-4 bg-muted/20 rounded-b-xl">
                    <p className="text-xs text-muted-foreground">Değişiklikler kaydet butonuna basınca uygulanır.</p>
                    <Button type="submit" size="sm" className="h-9 px-4 font-medium flex items-center gap-2">
                      {isProfileSaved ? (
                        <>
                          <Check className="h-4 w-4 text-emerald-400" /> Kaydedildi
                        </>
                      ) : (
                        "Değişiklikleri Kaydet"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* TAB 2: BİLDİRİM AYARLARI */}
            <TabsContent value="notifications">
              <Card className="border shadow-sm">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl">Bildirim Tercihleri</CardTitle>
                  <CardDescription>
                    Hangi konularda e-posta ve bildirim almak istediğinizi seçin.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-4">
                  <div className="flex items-center justify-between space-x-4 p-3 rounded-lg hover:bg-muted/40 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-base font-semibold">E-posta Bildirimleri</Label>
                      <p className="text-xs text-muted-foreground">
                        Haftalık özet raporları ve sistem güncellemelerini e-posta ile alın.
                      </p>
                    </div>
                    <Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} />
                  </div>
                  <div className="flex items-center justify-between space-x-4 p-3 rounded-lg hover:bg-muted/40 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-base font-semibold">Yeni Sipariş Uyarısı</Label>
                      <p className="text-xs text-muted-foreground">
                        Mağazanıza yeni bir sipariş geldiğinde anlık bildirim alın.
                      </p>
                    </div>
                    <Switch checked={orderNotifs} onCheckedChange={setOrderNotifs} />
                  </div>
                  <div className="flex items-center justify-between space-x-4 p-3 rounded-lg hover:bg-muted/40 transition-colors">
                    <div className="space-y-0.5">
                      <Label className="text-base font-semibold">Güvenlik Uyarıları</Label>
                      <p className="text-xs text-muted-foreground">
                        Bilinmeyen cihazlardan yapılan giriş denemelerinde uyarılın.
                      </p>
                    </div>
                    <Switch checked={securityAlerts} onCheckedChange={setSecurityAlerts} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 3: GÜVENLİK AYARLARI */}
            <TabsContent value="security">
              <Card className="border shadow-sm">
                <form onSubmit={handleSavePassword}>
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-xl">Şifre Değiştir</CardTitle>
                    <CardDescription>
                      Hesap güvenliğiniz için şifrenizi düzenli aralıklarla güncelleyin.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="curr-pass">Mevcut Şifre</Label>
                      <Input
                        id="curr-pass"
                        type="password"
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-pass">Yeni Şifre</Label>
                      <Input
                        id="new-pass"
                        type="password"
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="conf-pass">Yeni Şifre (Tekrar)</Label>
                      <Input
                        id="conf-pass"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="h-10"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t px-6 py-4 bg-muted/20 rounded-b-xl">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Lock className="h-3.5 w-3.5" /> En az 8 karakter kullanın.
                    </span>
                    <Button type="submit" size="sm" className="h-9 px-4 font-medium flex items-center gap-2">
                      {isPassSaved ? (
                        <>
                          <Check className="h-4 w-4 text-emerald-400" /> Şifre Güncellendi
                        </>
                      ) : (
                        "Şifreyi Güncelle"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* TAB 4: GÖRÜNÜM AYARLARI */}
            <TabsContent value="appearance">
              <Card className="border shadow-sm">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl">Tema Seçimi</CardTitle>
                  <CardDescription>
                    Paneli kullanmak istediğiniz renk modunu belirleyin.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-3 pt-4">
                  <div
                    onClick={() => setTheme("light")}
                    className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-3 transition-all ${
                      theme === "light" ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="h-14 w-full bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center text-slate-800 font-semibold text-xs shadow-inner">
                      Açık Mod
                    </div>
                    <span className="text-xs font-semibold">Açık (Light)</span>
                  </div>

                  <div
                    onClick={() => setTheme("dark")}
                    className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-3 transition-all ${
                      theme === "dark" ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="h-14 w-full bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center text-slate-100 font-semibold text-xs shadow-inner">
                      Koyu Mod
                    </div>
                    <span className="text-xs font-semibold">Koyu (Dark)</span>
                  </div>

                  <div
                    onClick={() => setTheme("system")}
                    className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-3 transition-all ${
                      theme === "system" ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="h-14 w-full bg-gradient-to-r from-slate-100 to-slate-900 rounded-lg border border-slate-400 flex items-center justify-center text-xs font-semibold text-slate-500 shadow-inner">
                      Sistem
                    </div>
                    <span className="text-xs font-semibold">Sistem Varsayılanı</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}