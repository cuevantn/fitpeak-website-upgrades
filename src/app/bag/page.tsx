"use client"

import useShoppingBag from "@/hooks/useShoppingBag"
import { useSession } from "next-auth/react"

import BagItem from "@/components/BagItem"

const BagPage = () => {
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
          <div className="flex justify-between mb-2">
            <p className="">Productos</p>
            <p className="font-bold  space-x-2">
              <span className="text-zinc-400 line-through tabular-nums">
                S/ {total_price}
              </span>
              <span className="tabular-nums">S/ {total_sale_price}</span>
            </p>
          </div>
          <div className="flex justify-between">
            <p className="">Envío</p>
            <p className="font-bold ">
              <span className="tabular-nums">S/ 15</span>
            </p>
          </div>
          <div className="flex justify-between pt-4 mt-8 border-t dark:border-t-zinc-700">
            <p className="font-bold ">Total</p>
            <p className="font-bold  space-x-2">
              <span className="tabular-nums">S/ {total_price + 15}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BagPage
