"use client"

import {
  BagItem as BagItemProps,
  useShoppingBag,
} from "@/hooks/use-shopping-bag"
import { Paragraph } from "@/ui/typography"

import { BagItem, BagItemSkeleton } from "./bag-item"

const BagList = () => {
  const { items, removeProduct, updateProduct, loading, empty } =
    useShoppingBag()

  if (loading) {
    return <BagListSkeleton />
  }

  if (empty) {
    return <Paragraph>Agrega algunos productos a tu bolsa :)</Paragraph>
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
