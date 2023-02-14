import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import CustomLink from "./CustomLink"
import ThemeToggle from "./ThemeToggle"
import SocialLinks from "./SocialLinks"

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
        <CustomLink href="/collections/upper-body-bands">
          Upper Body Bands
        </CustomLink>
        <CustomLink href="/collections/lower-body-bands" label="Pronto">
          Lower Body Bands
        </CustomLink>
      </div>

      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <Icons.search className="w-5 h-5" />
        <Icons.cart className="w-5 h-5" />
      </div>
    </div>
  )
}

export default DesktopNavbar
