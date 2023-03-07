import Link from "next/link"
import { Button } from "@/ui/button"
import { Icons } from "@/ui/icons"

import AuthButton from "@/components/AuthButton"
import CustomLink from "@/components/CustomLink"

const Navbar = () => {
  return (
    <nav className="container sticky top-0 z-50 flex items-center justify-between bg-white py-4 dark:bg-zinc-900">
      <Link href="/" className="flex items-center sm:w-48">
        <Icons.logo className="h-8 w-8 fill-current" />
        <span className="ml-2 mr-8 font-bold">fitpeak</span>
      </Link>

      <div className="hidden space-x-4 text-sm font-bold md:flex">
        <CustomLink href="/">Upper Body Bands</CustomLink>
        <CustomLink href="#" label="Pronto">
          Lower Body Bands
        </CustomLink>
      </div>

      <div className="flex items-center justify-end space-x-4 sm:w-48">
        <Link href="/bag" className="h-10 w-10">
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Icons.bag className="absolute h-5 w-5" />
          </Button>
        </Link>
        <AuthButton />
      </div>
    </nav>
  )
}

export default Navbar
