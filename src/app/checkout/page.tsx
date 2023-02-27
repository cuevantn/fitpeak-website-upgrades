"use client"

import Image from "next/image"
import useShoppingBag from "@/hooks/useShoppingBag"
import { useSession } from "next-auth/react"

const CheckoutPage = () => {
  const { total_price, total_sale_price } = useShoppingBag()

  const { status } = useSession()

  if (status === "loading") {
    return <div className="container my-4">Loading...</div>
  }

  if (status === "unauthenticated") {
    return <div className="container my-4">Unauthenticated</div>
  }

  const total = total_sale_price ? total_sale_price : total_price

  return (
    <div className="container my-4">
      <h1 className="font-bold text-2xl mb-4">Checkout</h1>
      <p className="text-xl font-bold">Total: S/ {total + 15}</p>

      <p>Medios de pago:</p>
      <p>Yape 959132247:</p>
      <Image
        alt="QR de Yape"
        src="/assets/yape_qr.png"
        width={304}
        height={215}
        sizes="(max-width: 608px) 100vw, 304px"
        className="rounded-lg"
      />

      <p>Transferencia Bancaria BCP al: 19202427542061</p>
      <p>Transferencia Bancaria Interbancaria al: 00219210242754206139</p>
    </div>
  )
}

export default CheckoutPage
