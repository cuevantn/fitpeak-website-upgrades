import Image from "next/image"
import Link from "next/link"
import { AspectRatio } from "@/ui/aspect-ratio"
import Balancer from "react-wrap-balancer"

import { ProductRecord } from "@/lib/xata/codegen/shop"
import PriceComponent from "./PriceComponent"

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
          <h3 className="font-bold text-lg">
            <Balancer>{name}</Balancer>
          </h3>
          <PriceComponent
            className="text-left"
            priceA={price}
            priceB={sale_price}
          />
        </div>
      </div>
    </Link>
  )
}

export default ProductQuickView
