import Image from "next/image"
import Link from "next/link"
import { AspectRatio } from "@/ui/aspect-ratio"
import Balancer from "react-wrap-balancer"

import { ProductRecord } from "@/lib/xata/codegen/shop"
import { PriceComponent } from "./price-component"

const ProductQuickView: React.FunctionComponent<ProductRecord> = ({
  id,
  image,
  price,
  sale_price,
  name,
}) => {
  return (
    <Link href={`/products/${id}`}>
      <div className="rounded-md border p-2 dark:border-zinc-800 hover:dark:border-zinc-700">
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
          <h3 className="text-lg font-bold">
            <Balancer>{name}</Balancer>
          </h3>
          <PriceComponent
            className="text-left"
            priceA={price}
            priceB={sale_price ?? undefined}
          />
        </div>
      </div>
    </Link>
  )
}

export default ProductQuickView
