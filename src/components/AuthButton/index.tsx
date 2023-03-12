"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCustomer } from "@/hooks/use-customer"
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar"
import { Button } from "@/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu"
import { Icons } from "@/ui/icons"
import { signIn, signOut } from "next-auth/react"
import { useTheme } from "next-themes"

export default function DropdownMenuDemo() {
  const router = useRouter()

  const { customer, error } = useCustomer()
  const { theme, setTheme } = useTheme()

  if (!customer && !error) return null

  if (error === "Unauthenticated")
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-10 w-10 rounded-full">
            <Icons.menu className="absolute h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Fitpeak</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                {theme === "dark" ? (
                  <Icons.moon className="mr-2 h-4 w-4" />
                ) : theme === "light" ? (
                  <Icons.sun className="mr-2 h-4 w-4" />
                ) : (
                  <Icons.laptop className="mr-2 h-4 w-4" />
                )}
                <span>Tema</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Icons.sun className="mr-2 h-4 w-4" />
                    <span>Claro</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Icons.moon className="mr-2 h-4 w-4" />
                    <span>Oscuro</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Icons.laptop className="mr-2 h-4 w-4" />
                    <span>Sistema</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Icons.facebook className="mr-2 h-4 w-4" />
            <span>Facebook</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icons.instagram className="mr-2 h-4 w-4" />
            <span>Instagram</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => signIn()}>
            <Icons.logout className="mr-2 h-4 w-4" />
            <span>Iniciar sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage
              src={customer?.image ?? "/assets/unknown_customer_picture.jpg"}
              alt={customer?.first_name}
            />
            <AvatarFallback>
              <Icons.loader className="h-4 w-4 animate-spin" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{customer.first_name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/contact">
            <DropdownMenuItem>
              <Icons.contact className="mr-2 h-4 w-4" />
              <span>Contacto</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/addresses">
            <DropdownMenuItem>
              <Icons.truck className="mr-2 h-4 w-4" />
              <span>Direcciones</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => router.push("/orders")}>
            <Icons.package className="mr-2 h-4 w-4" />
            <span>Pedidos</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/discounts")}>
            <Icons.gift className="mr-2 h-4 w-4" />
            <span>Descuentos</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              {theme === "dark" ? (
                <Icons.moon className="mr-2 h-4 w-4" />
              ) : theme === "light" ? (
                <Icons.sun className="mr-2 h-4 w-4" />
              ) : (
                <Icons.laptop className="mr-2 h-4 w-4" />
              )}
              <span>Tema</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Icons.sun className="mr-2 h-4 w-4" />
                  <span>Claro</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Icons.moon className="mr-2 h-4 w-4" />
                  <span>Oscuro</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Icons.laptop className="mr-2 h-4 w-4" />
                  <span>Sistema</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icons.facebook className="mr-2 h-4 w-4" />
          <span>Facebook</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icons.instagram className="mr-2 h-4 w-4" />
          <span>Instagram</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <Icons.logout className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
