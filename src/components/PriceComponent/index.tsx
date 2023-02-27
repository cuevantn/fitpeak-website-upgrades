const PriceComponent = ({
  priceA,
  priceB,
}: {
  priceA: number
  priceB?: number
}) => {
  if (priceA && priceB) {
    const lowestPrice = Math.min(priceA, priceB)
    const highestPrice = Math.max(priceA, priceB)

    return (
      <p className="font-bold space-x-2 text-right">
        <span>S/</span>
        <span className="mr-2 ml-1 line-through tabular-nums text-zinc-400"> {highestPrice}</span>
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
