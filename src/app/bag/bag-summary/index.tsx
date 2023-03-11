"use client"

import Link from "next/link"
import { useToast } from "@/hooks/ui/use-toast"
import { usePreferredAddress } from "@/hooks/use-preferred-address"
import { useShoppingBag } from "@/hooks/use-shopping-bag"
import { Button } from "@/ui/button"

import { PriceComponent } from "@/components/price-component"

export const BagSummary = () => {
  const {
    total_price,
    total_sale_price,
    loading: loadingBag,
  } = useShoppingBag()
  const { preferredAddress, loading: loadingAddress } = usePreferredAddress()
  const { toast } = useToast()

  if (loadingBag || loadingAddress) {
    return <BagSummarySkeleton />
  }

  return (
    <div className="mt-4 w-full border-t py-4 dark:border-t-zinc-700">
      <div className="mb-2 flex items-center justify-between">
        <p className="">Productos</p>
        <PriceComponent
          priceA={total_sale_price && total_sale_price}
          priceB={total_price}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm">
          Envío a{" "}
          <Link href="/addresses">
            <Button variant="link">
              {preferredAddress?.direccion || "Seleccionar Dirección"}
            </Button>
          </Link>
        </div>
        <PriceComponent priceA={15} />
      </div>
      <div className="mt-8 flex items-center justify-between border-t pt-4 dark:border-t-zinc-700">
        <p className="font-bold ">Total</p>
        <PriceComponent
          priceA={total_sale_price && total_sale_price + 15}
          priceB={total_price + 15}
        />
      </div>
    </div>
  )
}

const BagSummarySkeleton = () => {
  return (
    <div className="mt-4 w-full border-t py-4 text-zinc-200 dark:border-t-zinc-700 dark:text-zinc-800">
      <div className="mb-2 flex items-center justify-between">
        <div className="h-4 w-1/4 animate-pulse bg-current" />
        <div className="h-4 w-1/4 animate-pulse bg-current" />
      </div>
      <div className="flex items-center justify-between">
        <div className="h-4 w-1/4 animate-pulse bg-current" />
        <div className="h-4 w-1/4 animate-pulse bg-current" />
      </div>
      <div className="mt-8 flex items-center justify-between border-t pt-4 dark:border-t-zinc-700">
        <div className="h-4 w-1/4 animate-pulse bg-current font-bold" />
        <div className="h-4 w-1/4 animate-pulse bg-current" />
      </div>
    </div>
  )
}
