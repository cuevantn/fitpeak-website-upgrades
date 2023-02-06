import Link from "next/link"

import CustomLink from "./CustomLink"
import { Icons } from "./icons"

interface MainNavbarProps {}

const MainNavbar: React.FunctionComponent<MainNavbarProps> = () => {
  return (
    <>
      <div className="bg-black">
        <div className="container h-16 flex items-center text-white justify-between">
          <div className="flex space-x-2">
            <Link href="https://www.facebook.com/fitpeak.shop">
              <Icons.facebook className="w-5 h-5 fill-current" />
            </Link>
            <Link href="https://www.instagram.com/fitpeak.shop">
              <Icons.instagram className="w-5 h-5" />
            </Link>
            <Link href="https://twitter.com/fitpeak.shop">
              <Icons.twitter className="w-5 h-5 fill-current" />
            </Link>
          </div>
          <h1 className="text-sm font-normal">
            ¡Envío gratis en compras mayores a S/ 149.9!
          </h1>
        </div>
      </div>
      <nav className="bg-white sticky top-0 z-50 border-b">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="w-8 h-8 fill-current" />
            <h1 className="font-bold">fitpeak</h1>
          </Link>

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
