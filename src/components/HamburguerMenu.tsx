import Link from "next/link"
import { Button } from "@/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu"
import { Icons } from "@/ui/icons"

import { siteConfig } from "@/lib/site"

const HamburguerMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Icons.menu className="hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100" />
          <span className="sr-only">Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <Link href="/" className="flex items-center">
            <Icons.logo className="mr-2 h-4 w-4 fill-current" />
            {siteConfig.name}
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icons.search className="mr-2 h-4 w-4" />
          <span>Buscar</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/bag" className="flex">
            <Icons.bag className="mr-2 h-4 w-4" />
            <span>Bolsa</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/">Upper Body Bands</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/">Lower Body Bands</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel asChild>
          <div className="flex space-x-1">
            <a
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.instagram}
            >
              <Icons.instagram className="mr-2 h-5 w-5" />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.facebook}
            >
              <Icons.facebook className="mr-2 h-5 w-5 fill-current" />
            </a>
          </div>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default HamburguerMenu
