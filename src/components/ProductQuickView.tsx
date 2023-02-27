import Image from "next/image"
import Link from "next/link"
import { AspectRatio } from "@/ui/aspect-ratio"

import { ProductRecord } from "@/lib/xata/codegen/shop"

const ProductQuickView: React.FunctionComponent<ProductRecord> = ({
  id,
  image,
  price,
  sale_price,
  name,
}) => {
  return (
    <Link href={`/products/${id}`}>
      <div className="rounded-md border dark:border-zinc-800 hover:dark:border-zinc-700 p-2">
        <div className="">
          <AspectRatio ratio={1 / 1}>
            <Image
              src={image || "/assets/UpperBody-3.jpg"}
              alt="Photo by Alvaro Pinot"
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
        <div className="mt-2">
          <div className="flex items-center space-x-2">
            <p className="font-mono text-md">S/ {sale_price}</p>
            <p className="text-xs text-red-500 font-mono text-md line-through">
              S/ {price}
            </p>
          </div>
          <p className="text-md">{name}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProductQuickView
