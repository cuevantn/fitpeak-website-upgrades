"use client"

import { useRouter } from "next/navigation"
import { useOrders } from "@/hooks/use-orders"
import { Button } from "@/ui/button"

export const BagActions = () => {
  const router = useRouter()
  const { createOrder } = useOrders()

  const handleCheckout = async () => {
    const { ok, order_id, error } = await createOrder()

    if (ok) {
      router.push(`/orders/${order_id}`)
    }

    if (error) {
      console.log(error)
    }
  }

  return (
    <Button
      size="lg"
      type="submit"
      className="mt-4 w-full"
      onClick={handleCheckout}
    >
      Finalizar compra
    </Button>
  )
}
