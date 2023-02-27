import Link from "next/link"
import { Button } from "@/ui/button"

import AuthButton from "@/components//AuthButton"
import CustomLink from "@/components/CustomLink"
import Icons from "@/components/Icons"
import SocialLinks from "@/components/SocialLinks"
import ThemeToggle from "@/components/ThemeToggle"

const DesktopNavbar = () => {
  return (
    <div className="hidden md:flex items-center justify-between py-4">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Icons.logo className="w-8 h-8 fill-current" />
          <span className="font-bold ml-2 mr-8">fitpeak</span>
        </Link>

        <SocialLinks />
      </div>

      <div className="flex space-x-4 font-bold text-sm">
        <CustomLink href="/">Upper Body Bands</CustomLink>
        <CustomLink href="#" label="Pronto">
          Lower Body Bands
        </CustomLink>
      </div>

      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <Icons.search className="w-5 h-5" />
        <Link href="/bag" className="h-10 w-10">
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Icons.bag className="absolute w-4 h-4" />
          </Button>
        </Link>
        <AuthButton />
      </div>
    </div>
  )
}

export default DesktopNavbar
