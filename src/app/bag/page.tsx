"use client"

import { useRouter } from "next/navigation"
import useShoppingBag from "@/hooks/useShoppingBag"
import { Button } from "@/ui/button"
import { useSession } from "next-auth/react"

import BagItem from "@/components/BagItem"
import PriceComponent from "@/components/PriceComponent"

const BagPage = () => {
  const router = useRouter()
  const { status } = useSession()
  const { items, updateProduct, removeProduct, total_price, total_sale_price } =
    useShoppingBag()

  if (status === "loading") {
    return <div className="container my-4">Loading...</div>
  }

  if (status === "unauthenticated") {
    return <div className="container my-4">Unauthenticated</div>
  }

  if (items?.length === 0) {
    return <div className="container my-4">No items in bag</div>
  }

  return (
    <div className="container my-4">
      <h1 className="font-bold text-3xl mb-4">Bag</h1>
      <div className="text-sm sm:text-md md:text-lg">
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

        <div className="border-t dark:border-t-zinc-700 mt-4 py-4 w-full">
          <div className="flex justify-between items-center mb-2">
            <p className="">Productos</p>
            <PriceComponent
              priceA={total_sale_price && total_sale_price}
              priceB={total_price}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="">
              Envío a <Button variant="link">Av.190 Mz. N Lote 8 ...</Button>
            </div>
            <PriceComponent priceA={15} />
          </div>
          <div className="flex justify-between items-center pt-4 mt-8 border-t dark:border-t-zinc-700">
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
        className="w-full mt-4"
        onClick={() => router.push("/checkout")}
      >
        Finalizar compra
      </Button>
    </div>
  )
}

export default BagPage
