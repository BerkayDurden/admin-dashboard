"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "Aktif" | "Beklemede" | "Pasif"
  createdAt: string
  avatar: string
}

const initialUsers: User[] = [
  {
    id: "1",
    name: "Kenji Satoru",
    email: "kenji@example.com",
    role: "Yönetici",
    status: "Aktif",
    createdAt: "12 Oca 2026",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kenji",
  },
  {
    id: "2",
    name: "Kadir Yılmaz",
    email: "kadir@example.com",
    role: "Geliştirici",
    status: "Aktif",
    createdAt: "18 Şub 2026",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kadir",
  },
  {
    id: "3",
    name: "Mustafa Kaya",
    email: "mustafa@example.com",
    role: "Tasarımcı",
    status: "Beklemede",
    createdAt: "05 Mar 2026",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mustafa",
  },
  {
    id: "4",
    name: "Berkay Kök",
    email: "berkay@example.com",
    role: "Süper Admin",
    status: "Aktif",
    createdAt: "01 Oca 2026",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay",
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("Hepsi")

  // Modal Durumları
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  // Form State'leri
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("Kullanıcı")
  const [status, setStatus] = useState<"Aktif" | "Beklemede" | "Pasif">("Aktif")

  const resetForm = () => {
    setName("")
    setEmail("")
    setRole("Kullanıcı")
    setStatus("Aktif")
  }

  const handleOpenAddModal = () => {
    resetForm()
    setIsAddOpen(true)
  }

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role,
      status: "Aktif",
      createdAt: new Date().toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
    }

    setUsers([newUser, ...users])
    resetForm()
    setIsAddOpen(false)
  }

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const handleStartEdit = (user: User) => {
    setEditingUser(user)
    setName(user.name)
    setEmail(user.email)
    setRole(user.role)
    setStatus(user.status)
    setIsEditOpen(true)
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUser) return

    setUsers(
      users.map((user) =>
        user.id === editingUser.id
          ? { ...user, name, email, role, status }
          : user
      )
    )
    setIsEditOpen(false)
    setEditingUser(null)
    resetForm()
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "Hepsi" || user.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="md:pl-64 flex flex-col min-h-screen">
        <Navbar />

        <main className="p-4 md:p-6 space-y-6 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Kullanıcı Yönetimi</h1>
              <p className="text-sm text-muted-foreground">
                Sistemdeki tüm kullanıcıları görüntüleyin, filtreleyin ve yönetin.
              </p>
            </div>

            <Button onClick={handleOpenAddModal} className="w-full sm:w-auto flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Yeni Kullanıcı Ekle
            </Button>

            {/* Yeni Kullanıcı Modal */}
            <Dialog open={isAddOpen} onOpenChange={(open) => { setIsAddOpen(open); if (!open) resetForm(); }}>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleAddUser}>
                  <DialogHeader>
                    <DialogTitle>Yeni Kullanıcı Ekle</DialogTitle>
                    <DialogDescription>
                      Sisteme yeni bir kullanıcı eklemek için bilgileri doldurun.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Ad Soyad</Label>
                      <Input
                        id="name"
                        placeholder="ör. Kenji Satoru"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">E-posta</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="kenji@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="role">Rol</Label>
                      <Select value={role} onValueChange={setRole}>
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Rol seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yönetici">Yönetici</SelectItem>
                          <SelectItem value="Geliştirici">Geliştirici</SelectItem>
                          <SelectItem value="Tasarımcı">Tasarımcı</SelectItem>
                          <SelectItem value="Editör">Editör</SelectItem>
                          <SelectItem value="Kullanıcı">Kullanıcı</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => { setIsAddOpen(false); resetForm(); }}>
                      İptal
                    </Button>
                    <Button type="submit">Kullanıcıyı Kaydet</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Düzenleme Modal */}
          <Dialog open={isEditOpen} onOpenChange={(open) => { setIsEditOpen(open); if (!open) resetForm(); }}>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleSaveEdit}>
                <DialogHeader>
                  <DialogTitle>Kullanıcıyı Düzenle</DialogTitle>
                  <DialogDescription>Kullanıcı bilgilerini ve durumunu güncelleyin.</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-name">Ad Soyad</Label>
                    <Input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-email">E-posta</Label>
                    <Input id="edit-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-role">Rol</Label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger id="edit-role">
                        <SelectValue placeholder="Rol seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Süper Admin">Süper Admin</SelectItem>
                        <SelectItem value="Yönetici">Yönetici</SelectItem>
                        <SelectItem value="Geliştirici">Geliştirici</SelectItem>
                        <SelectItem value="Tasarımcı">Tasarımcı</SelectItem>
                        <SelectItem value="Editör">Editör</SelectItem>
                        <SelectItem value="Kullanıcı">Kullanıcı</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-status">Durum</Label>
                    <Select value={status} onValueChange={(val) => setStatus(val as "Aktif" | "Beklemede" | "Pasif")}>
                      <SelectTrigger id="edit-status">
                        <SelectValue placeholder="Durum seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Aktif">Aktif</SelectItem>
                        <SelectItem value="Beklemede">Beklemede</SelectItem>
                        <SelectItem value="Pasif">Pasif</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => { setIsEditOpen(false); resetForm(); }}>
                    İptal
                  </Button>
                  <Button type="submit">Değişiklikleri Kaydet</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="İsim, e-posta veya rol ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>

                {/* Titreme Yapmayan Sabit Filtre Butonları */}
                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto py-1 px-0.5">
                  {["Hepsi", "Aktif", "Beklemede", "Pasif"].map((s) => (
                    <Button
                      key={s}
                      variant={statusFilter === s ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStatusFilter(s)}
                      className="text-xs shrink-0 h-8 transition-none"
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0 sm:p-6 pt-0 sm:pt-0">
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kullanıcı</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Durum</TableHead>
                      <TableHead>Kayıt Tarihi</TableHead>
                      <TableHead className="text-right">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          Kullanıcı bulunamadı.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-semibold">{user.name}</div>
                                <div className="text-xs text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.status === "Aktif"
                                  ? "default"
                                  : user.status === "Beklemede"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{user.createdAt}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Aksiyonlar</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleStartEdit(user)}>
                                  Düzenle
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive cursor-pointer"
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  Kullanıcıyı Sil
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}