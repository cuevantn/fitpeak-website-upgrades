import Image from "next/image"
import Link from "next/link"
import { AspectRatio } from "components/ui/aspect-ratio"

import { GLOBAL_DISCOUNT } from "@/lib/constants"

interface ProductQuickViewProps {
  id: string
  price: number
  name?: string | null
  image?: string | null
}

const ProductQuickView: React.FunctionComponent<ProductQuickViewProps> = ({
  id,
  image,
  price,
  name,
}) => {
  const applyDiscount = (price: number, discount: number) => {
    let x = price - price * discount
    return x.toFixed(1)
  }

  const priceWithDiscount = applyDiscount(100, GLOBAL_DISCOUNT)

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
          <p className="font-mono text-md">S/ {price}</p>
          <p className="text-md">{name}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProductQuickView
