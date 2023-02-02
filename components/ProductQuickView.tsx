import Image from "next/image"
import { AspectRatio } from "components/ui/aspect-ratio"

interface ProductQuickViewProps {
  id?: string
  color?: string
  size?: string
  quantity?: number
  price?: number
  name?: string
  shortDescription?: string
  max_weight?: number
}

const ProductQuickView: React.FunctionComponent<ProductQuickViewProps> = ({
  id,
  color,
  size,
  quantity,
  price,
  name,
  shortDescription,
  max_weight
}) => {
  return (
    <div className="rounded-md border p-2">
      <div className="">
        <AspectRatio ratio={1 / 1}>
          <Image
            src="/assets/green-band.jpg"
            alt="Photo by Alvaro Pinot"
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs">
          Hasta{" "}<span className="text-lg font-bold">{max_weight}</span>{" "}kg
        </span>
        <div className="flex flex-col justify-center items-center">
          <span className="font-mono line-through text-xs text-red-600">
            S/ 19.90
          </span>
          <span className="font-mono">S/ {price}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductQuickView
