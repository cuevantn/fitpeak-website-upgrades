import Image from "next/image"
import Link from "next/link"
import { AspectRatio } from "@/ui/aspect-ratio"

import { BagRecord, ProductRecord } from "@/lib/xata/codegen/shop"
import { PriceComponent } from "@/components/price-component"
import QuantityInput from "./quantity-input"

interface BagItemProps extends BagRecord {
  product: ProductRecord
  handleRemove: () => Promise<boolean>
  handleUpdate: (quantity: number) => Promise<boolean>
}

export const BagItem = ({
  id,
  product,
  quantity,
  handleRemove,
  handleUpdate,
}: BagItemProps) => {
  return (
    <div
      key={id}
      className="grid w-full grid-cols-4 items-center gap-4 py-4 text-center sm:grid-cols-5"
    >
      <div className="hidden sm:col-span-1 sm:flex">
        <AspectRatio ratio={1 / 1}>
          <Image
            src={product.image || "/assets/UpperBody-3.jpg"}
            alt="Photo by Alvaro Pinot"
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </div>
      <div className="col-span-2 text-left">
        <p className="font-bold">{product.name}</p>
        <Link href={`/products/${product.id}`}>
          <p className="font-medium">SKU: {product.id}</p>
        </Link>
      </div>
      <QuantityInput
        quantity={quantity}
        handleUpdate={handleUpdate}
        handleRemove={handleRemove}
      />
      <div className="col-span-1">
        <SubtotalBag
          price={product.price}
          sale_price={product.sale_price ?? undefined}
          quantity={quantity}
        />
      </div>
    </div>
  )
}

export const BagItemSkeleton = () => {
  return (
    <div className="grid w-full grid-cols-4 items-center gap-4 py-4 text-center text-zinc-200 dark:text-zinc-800 sm:grid-cols-5">
      <div className="hidden sm:col-span-1 sm:flex">
        <div className="aspect-square w-full animate-pulse rounded-md bg-current" />
      </div>
      <div className="col-span-2 text-left">
        <div className="h-4 w-1/2 animate-pulse bg-current font-bold" />
        <div className="mt-2 h-4 w-1/4 animate-pulse bg-current font-medium" />
      </div>
      <div className="col-span-1 space-y-2">
        <div className="mx-auto h-6 w-1/4 animate-pulse bg-current font-bold" />
        <div className="mx-auto h-4 w-1/4 animate-pulse bg-current font-bold" />
      </div>
      <div className="col-span-1">
        <div className="ml-auto h-6 w-1/4 animate-pulse bg-current font-bold" />
      </div>
    </div>
  )
}

const SubtotalBag = ({
  price,
  sale_price,
  quantity,
}: {
  price: number
  sale_price?: number
  quantity: number
}) => {
  // subtotal & sale_subtotal
  const subtotal = price * quantity
  const sale_subtotal = sale_price && sale_price * quantity

  return <PriceComponent priceA={subtotal} priceB={sale_subtotal} />
}
