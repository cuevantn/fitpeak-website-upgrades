import Navbar from "./Navbar"
import PromoBanner from "./PromoBanner"

const Header = () => {
  return (
    <>
      <PromoBanner>¡Envío gratis en compras mayores a S/ 99.9!</PromoBanner>
      <PromoBanner>¡15% OFF en TODA la tienda!</PromoBanner>
      <Navbar />
    </>
  )
}

export default Header
