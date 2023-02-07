import Link from "next/link"

import CustomLink from "./CustomLink"
import PromoBanner from "./PromoBanner"
import { Icons } from "./icons"

const MainNavbar = () => {
  return (
    <>
      <PromoBanner>¡Envío gratis en compras mayores a S/ 99.9!</PromoBanner>
      <PromoBanner>¡15% OFF en TODA la tienda!</PromoBanner>
      <nav className="bg-white sticky top-0 z-50 border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Icons.logo className="w-8 h-8 fill-current" />
              <h1 className="font-bold ml-2 mr-8">fitpeak</h1>
            </Link>

            <Link href="https://www.instagram.com/fitpeak.shop">
              <Icons.instagram className="w-5 h-5 mr-2" />
            </Link>
            <Link href="https://www.facebook.com/fitpeak.shop">
              <Icons.facebook className="w-5 h-5 mr-2 fill-current" />
            </Link>
            <Link href="https://twitter.com/fitpeakdotshop">
              <Icons.twitter className="w-5 h-5 fill-current" />
            </Link>
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
            <Icons.search className="w-5 h-5" />
            <Icons.cart className="w-5 h-5" />
          </div>
        </div>
      </nav>
    </>
  )
}

export default MainNavbar
