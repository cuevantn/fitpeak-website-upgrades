"use client"

import {
  BagItem as BagItemProps,
  useShoppingBag,
} from "@/hooks/use-shopping-bag"

import { BagItem, BagItemSkeleton } from "./bag-item"

const BagList = () => {
  const { items, removeProduct, updateProduct, loading } = useShoppingBag()

  if (loading) {
    return <BagListSkeleton />
  }

  return (
    <div className="w-full">
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
    </div>
  )
}

const BagListSkeleton = () => {
  return (
    <div className="w-full">
      {[1, 2, 3, 4, 5].map((item) => (
        <BagItemSkeleton key={item} />
      ))}
    </div>
  )
}

export default BagList
