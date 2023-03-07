"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { usePreferredAddress } from "@/hooks/use-preferred-address"
import { useShoppingBag } from "@/hooks/use-shopping-bag"
import { Button } from "@/ui/button"
import { Heading, Paragraph } from "@/ui/typography"

import BagItem from "@/components/BagItem"
import PriceComponent from "@/components/PriceComponent"

const BagPage = () => {
  const router = useRouter()
  const {
    items,
    loading: loadingShoppingBag,
    updateProduct,
    removeProduct,
    total_price,
    total_sale_price,
    empty,
    error: shoppingBagError,
  } = useShoppingBag()

  const {
    preferredAddress,
    loading: loadingPreferredAddress,
    error: preferredAddressError,
  } = usePreferredAddress()
  if (loadingShoppingBag || loadingPreferredAddress) {
    return <div className="container">Loading...</div>
  }

  if (shoppingBagError || preferredAddressError) {
    return <div className="container">Algo salió mal...</div>
  }

  if (empty) {
    return (
      <div className="container">Tu bolsa está vacía. Agrega productos!</div>
    )
  }

  return (
    <div className="container">
      <Heading>Bag</Heading>
      <div className="sm:text-md text-sm md:text-lg">
        {items?.map((item) => (
          <BagItem
            key={item.id}
            handleRemove={() => removeProduct(item.product.id)}
            handleUpdate={(quantity: number) =>
              updateProduct(item.product.id, quantity)
            }
            {...item}
          />
        ))}

        <div className="mt-4 w-full border-t py-4 dark:border-t-zinc-700">
          <div className="mb-2 flex items-center justify-between">
            <p className="">Productos</p>
            <PriceComponent
              priceA={total_sale_price && total_sale_price}
              priceB={total_price}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              Envío a{" "}
              <Link href="/addresses">
                <Button variant="link">{preferredAddress.direccion}</Button>
              </Link>
            </div>
            <PriceComponent priceA={15} />
          </div>
          <div className="mt-8 flex items-center justify-between border-t pt-4 dark:border-t-zinc-700">
            <p className="font-bold ">Total</p>
            <PriceComponent
              priceA={total_sale_price && total_sale_price + 15}
              priceB={total_price + 15}
            />
          </div>
        </div>
      </div>

      <Button
        size="lg"
        type="submit"
        className="mt-4 w-full"
        onClick={() => router.push("/checkout")}
      >
        Finalizar compra
      </Button>
    </div>
  )
}

export default BagPage
