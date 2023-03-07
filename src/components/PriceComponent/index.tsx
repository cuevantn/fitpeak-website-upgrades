import { cn } from "@/lib/utils"

const PriceComponent = ({
  priceA,
  priceB,
  className,
}: {
  priceA: number
  priceB?: number
  className?: string
}) => {
  if (priceA && priceB) {
    const lowestPrice = Math.min(priceA, priceB)
    const highestPrice = Math.max(priceA, priceB)

    return (
      <p className={cn("space-x-2 text-right font-bold", className)}>
        <span>S/</span>
        <span className="mr-2 ml-1 tabular-nums text-zinc-400 line-through">
          {" "}
          {highestPrice}
        </span>
        <span className="tabular-nums">{lowestPrice}</span>
      </p>
    )
  }

  return (
    <p className="font-bold">
      S/ <span className="tabular-nums">{priceA || priceB}</span>
    </p>
  )
}

export default PriceComponent
