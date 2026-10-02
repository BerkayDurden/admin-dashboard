"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
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
import { Search, Plus, MoreHorizontal, Tag, Image as ImageIcon, Trash2 } from "lucide-react"

interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  stock: number
  status: "Stokta" | "Kritik Stok" | "Stok Yok"
  image: string
}

const initialProducts: Product[] = [
  {
    id: "1",
    name: "AOC 27G50Z 27\" 240Hz Gaming Monitör",
    sku: "MON-AOC-240",
    category: "Elektronik",
    price: 6499.00,
    stock: 24,
    status: "Stokta",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=120&auto=format&fit=crop&q=60",
  },
  {
    id: "2",
    name: "Northbayou F80 Monitör Kolu",
    sku: "ACC-NB-F80",
    category: "Aksesuar",
    price: 1299.00,
    stock: 4,
    status: "Kritik Stok",
    image: "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=120&auto=format&fit=crop&q=60",
  },
  {
    id: "3",
    name: "JBL Tune 520BT Kablosuz Kulaklık",
    sku: "AUD-JBL-520",
    category: "Ses Sistemleri",
    price: 1899.00,
    stock: 0,
    status: "Stok Yok",
    image: "",
  },
  {
    id: "4",
    name: "Mekanik Oyuncu Klavyesi (RGB)",
    sku: "PER-KEY-RGB",
    category: "Elektronik",
    price: 2199.00,
    stock: 18,
    status: "Stokta",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=120&auto=format&fit=crop&q=60",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("Hepsi")

  // Modal Durumları
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  // Form State'leri
  const [name, setName] = useState("")
  const [sku, setSku] = useState("")
  const [category, setCategory] = useState("Elektronik")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [image, setImage] = useState("")

  // Dinamik Kategori Listesi
  const availableCategories = Array.from(
    new Set([
      "Elektronik",
      "Aksesuar",
      "Ses Sistemleri",
      "Giyim",
      ...products.map((p) => p.category),
    ])
  )

  const filterCategories = ["Hepsi", ...availableCategories]

  // Form Sıfırlama
  const resetForm = () => {
    setName("")
    setSku("")
    setCategory("Elektronik")
    setPrice("")
    setStock("")
    setImage("")
  }

  // Yeni Ürün Ekle Modalını Temiz Açma
  const handleOpenAddModal = () => {
    resetForm()
    setIsAddOpen(true)
  }

  // Bilgisayardan Görsel Seçme
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Stok Durumuna Göre Rozet Belirleme
  const calculateStatus = (stockCount: number): "Stokta" | "Kritik Stok" | "Stok Yok" => {
    if (stockCount <= 0) return "Stok Yok"
    if (stockCount <= 5) return "Kritik Stok"
    return "Stokta"
  }

  // Yeni Ürün Ekle
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    const stockNum = Number(stock) || 0
    const priceNum = Number(price) || 0

    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      sku: sku || `PRD-${Math.floor(1000 + Math.random() * 9000)}`,
      category,
      price: priceNum,
      stock: stockNum,
      status: calculateStatus(stockNum),
      image: image,
    }

    setProducts([newProduct, ...products])
    resetForm()
    setIsAddOpen(false)
  }

  // Ürün Sil
  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  // Düzenleme Başlat
  const handleStartEdit = (product: Product) => {
    setEditingProduct(product)
    setName(product.name)
    setSku(product.sku)
    setCategory(product.category)
    setPrice(product.price.toString())
    setStock(product.stock.toString())
    setImage(product.image || "")
    setIsEditOpen(true)
  }

  // Düzenleme Kaydet
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return

    const stockNum = Number(stock) || 0
    const priceNum = Number(price) || 0

    setProducts(
      products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              name,
              sku,
              category,
              price: priceNum,
              stock: stockNum,
              status: calculateStatus(stockNum),
              image: image,
            }
          : p
      )
    )

    setIsEditOpen(false)
    setEditingProduct(null)
    resetForm()
  }

  // Filtreleme
  const filteredProducts = products.filter((product) => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch =
      product.name.toLowerCase().includes(searchLower) ||
      product.sku.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower)

    const matchesCategory =
      categoryFilter === "Hepsi" || product.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  // Para birimi biçimlendirmesi (₺)
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(val)
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="md:pl-64 flex flex-col min-h-screen">
        <Navbar />

        <main className="p-4 md:p-6 space-y-6 flex-1">
          {/* Üst Başlık & Ekle Butonu */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Ürün Yönetimi</h1>
              <p className="text-sm text-muted-foreground">
                Kataloğunuzdaki ürünleri, stok seviyelerini, görsellerini ve fiyatları yönetin.
              </p>
            </div>

            {/* Yeni Ürün Ekle Butonu */}
            <Button onClick={handleOpenAddModal} className="w-full sm:w-auto flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Yeni Ürün Ekle
            </Button>

            {/* Yeni Ürün Ekle Dialog */}
            <Dialog
              open={isAddOpen}
              onOpenChange={(open) => {
                setIsAddOpen(open)
                if (!open) resetForm()
              }}
            >
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleAddProduct}>
                  <DialogHeader>
                    <DialogTitle>Yeni Ürün Ekle</DialogTitle>
                    <DialogDescription>
                      Kataloğa eklemek istediğiniz ürünün ayrıntılarını ve görselini seçin.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                      <Label>Ürün Görseli (Opsiyonel)</Label>
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden bg-secondary border flex items-center justify-center shrink-0">
                          {image ? (
                            <img src={image} alt="Önizleme" className="h-full w-full object-cover" />
                          ) : (
                            <ImageIcon className="h-6 w-6 text-muted-foreground/60" />
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileChange}
                            className="cursor-pointer text-xs file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                          />
                          {image && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setImage("")}
                              className="text-xs text-destructive hover:text-destructive h-6 p-0"
                            >
                              <Trash2 className="h-3 w-3 mr-1" /> Görseli Kaldır
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="p-name">Ürün Adı</Label>
                      <Input
                        id="p-name"
                        placeholder="ör. Gaming Kulaklık"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="p-sku">SKU / Stok Kodu</Label>
                      <Input
                        id="p-sku"
                        placeholder="ör. PRD-1029"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="p-cat">Kategori</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger id="p-cat">
                          <SelectValue placeholder="Kategori seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableCategories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="p-price">Fiyat (₺)</Label>
                        <Input
                          id="p-price"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="p-stock">Stok Adedi</Label>
                        <Input
                          id="p-stock"
                          type="number"
                          placeholder="0"
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsAddOpen(false)
                        resetForm()
                      }}
                    >
                      İptal
                    </Button>
                    <Button type="submit">Ürünü Kaydet</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Ürün Düzenle Dialog */}
          <Dialog
            open={isEditOpen}
            onOpenChange={(open) => {
              setIsEditOpen(open)
              if (!open) resetForm()
            }}
          >
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleSaveEdit}>
                <DialogHeader>
                  <DialogTitle>Ürünü Düzenle</DialogTitle>
                  <DialogDescription>
                    Ürün bilgilerini, görselini ve stok adetlerini güncelleyin.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="flex flex-col gap-2">
                    <Label>Ürün Görseli (Opsiyonel)</Label>
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden bg-secondary border flex items-center justify-center shrink-0">
                        {image ? (
                          <img src={image} alt="Önizleme" className="h-full w-full object-cover" />
                        ) : (
                          <ImageIcon className="h-6 w-6 text-muted-foreground/60" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="cursor-pointer text-xs file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                        />
                        {image && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setImage("")}
                            className="text-xs text-destructive hover:text-destructive h-6 p-0"
                          >
                            <Trash2 className="h-3 w-3 mr-1" /> Görseli Kaldır
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="edit-p-name">Ürün Adı</Label>
                    <Input
                      id="edit-p-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-p-sku">SKU / Stok Kodu</Label>
                    <Input
                      id="edit-p-sku"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-p-cat">Kategori</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger id="edit-p-cat">
                        <SelectValue placeholder="Kategori seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCategories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-p-price">Fiyat (₺)</Label>
                      <Input
                        id="edit-p-price"
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-p-stock">Stok Adedi</Label>
                      <Input
                        id="edit-p-stock"
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditOpen(false)
                      resetForm()
                    }}
                  >
                    İptal
                  </Button>
                  <Button type="submit">Değişiklikleri Kaydet</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Ana Ürün Kartı & Tablosu */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Arama Çubuğu */}
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Ürün adı, SKU veya kategori ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>

                {/* Dinamik Kategori Filtre Butonları */}
                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto py-1 px-0.5">
                  {filterCategories.map((cat) => (
                    <Button
                      key={cat}
                      variant={categoryFilter === cat ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCategoryFilter(cat)}
                      className="text-xs shrink-0 h-8 transition-none"
                    >
                      {cat}
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
                      <TableHead>Ürün</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Fiyat</TableHead>
                      <TableHead>Stok</TableHead>
                      <TableHead>Durum</TableHead>
                      <TableHead className="text-right">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          Aranan kriterlere uygun ürün bulunamadı.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-md bg-secondary border shrink-0 flex items-center justify-center overflow-hidden">
                                {product.image ? (
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <ImageIcon className="h-5 w-5 text-muted-foreground/60" />
                                )}
                              </div>
                              <div>
                                <div className="font-semibold">{product.name}</div>
                                <div className="text-xs text-muted-foreground">{product.sku}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
                              <Tag className="h-3 w-3" />
                              {product.category}
                            </span>
                          </TableCell>
                          <TableCell className="font-semibold">{formatCurrency(product.price)}</TableCell>
                          <TableCell>{product.stock} adet</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                product.status === "Stokta"
                                  ? "default"
                                  : product.status === "Kritik Stok"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {product.status}
                            </Badge>
                          </TableCell>
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
                                <DropdownMenuItem onClick={() => handleStartEdit(product)}>
                                  Düzenle
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive cursor-pointer"
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  Ürünü Sil
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