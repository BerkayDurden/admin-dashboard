import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kenji" alt="Avatar" />
          <AvatarFallback>KS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Kenji Satoru</p>
          <p className="text-sm text-muted-foreground">kenji@example.com</p>
        </div>
        <div className="ml-auto font-medium">+₺1,999.00</div>
      </div>

      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kadir" alt="Avatar" />
          <AvatarFallback>KD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Kadir Yılmaz</p>
          <p className="text-sm text-muted-foreground">kadir@example.com</p>
        </div>
        <div className="ml-auto font-medium">+₺39.00</div>
      </div>

      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mustafa" alt="Avatar" />
          <AvatarFallback>MS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Mustafa Kaya</p>
          <p className="text-sm text-muted-foreground">mustafa@example.com</p>
        </div>
        <div className="ml-auto font-medium">+₺299.00</div>
      </div>

      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay" alt="Avatar" />
          <AvatarFallback>BK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Berkay Kök</p>
          <p className="text-sm text-muted-foreground">berkay@example.com</p>
        </div>
        <div className="ml-auto font-medium">+₺99.00</div>
      </div>
    </div>
  )
}