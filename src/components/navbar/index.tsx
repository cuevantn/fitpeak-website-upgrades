import Link from "next/link"
import { Button } from "@/ui/button"

import AuthButton from "@/components/AuthButton"
import CustomLink from "@/components/CustomLink"
import { Icons } from "@/ui/icons"

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 container flex items-center justify-between py-4 bg-white dark:bg-zinc-900">
      <Link href="/" className="flex items-center sm:w-48">
        <Icons.logo className="w-8 h-8 fill-current" />
        <span className="font-bold ml-2 mr-8">fitpeak</span>
      </Link>

      <div className="hidden md:flex space-x-4 font-bold text-sm">
        <CustomLink href="/">Upper Body Bands</CustomLink>
        <CustomLink href="#" label="Pronto">
          Lower Body Bands
        </CustomLink>
      </div>

      <div className="flex items-center space-x-4 sm:w-48 justify-end">
        <Link href="/bag" className="h-10 w-10">
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Icons.bag className="absolute w-5 h-5" />
          </Button>
        </Link>
        <AuthButton />
      </div>
    </nav>
  )
}

export default Navbar
