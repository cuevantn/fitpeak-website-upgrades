import Image from "next/image"
import Link from "next/link"
import { AspectRatio } from "@/ui/aspect-ratio"

import { BagRecord, ProductRecord } from "@/lib/xata/codegen/shop"
import QuantityInput from "./QuantityInput"
import RemoveButton from "./RemoveButton"

interface BagItemProps extends BagRecord {
  product: ProductRecord
  handleRemove: () => Promise<boolean>
  handleUpdate: (quantity: number) => Promise<boolean>
}

const BagItem = ({
  id,
  product,
  quantity,
  handleRemove,
  handleUpdate,
}: BagItemProps) => {
  return (
    <div
      key={id}
      className="py-4 border-t dark:border-t-zinc-700 w-full grid grid-cols-4 sm:grid-cols-5 gap-4 items-center text-center"
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
          sale_price={product.sale_price}
          quantity={quantity}
        />
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

  if (sale_price) {
    return (
      <p className="font-bold space-x-2 text-right">
        <span className="text-zinc-400 line-through">S/ {subtotal}</span>
        <span>S/ {sale_subtotal}</span>
      </p>
    )
  }

  return <span className="font-bold">S/ {subtotal}</span>
}

export default BagItem
