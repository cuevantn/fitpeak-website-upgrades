import Image from "next/image"
import { AspectRatio } from "components/ui/aspect-ratio"

interface ProductQuickViewProps {
  id?: string
  color?: string
  size?: string
  quantity?: number
  past_price?: number
  price?: number
  name?: string
  shortDescription?: string
  max_weight?: number
  image1: string
  image2?: string
}

const ProductQuickView: React.FunctionComponent<ProductQuickViewProps> = ({
  id,
  image1,
  color,
  size,
  quantity,
  past_price,
  price,
  name,
  shortDescription,
  max_weight,
}) => {
  return (
    <div className="rounded-md border p-2">
      <div className="">
        <AspectRatio ratio={1 / 1}>
          <Image
            src={image1}
            alt="Photo by Alvaro Pinot"
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs">
          Hasta <span className="text-lg font-bold">{max_weight}</span> kg
        </span>
        <div className="flex flex-col justify-center items-end">
          <span className="font-mono line-through text-xs text-red-600">
            {past_price}
          </span>
          <span className="font-mono">S/ {price}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductQuickView
