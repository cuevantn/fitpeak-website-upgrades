"use client"

import useShoppingBag from "@/hooks/useShoppingBag"
import { Button } from "@/ui/button"
import { signIn, useSession } from "next-auth/react"

const AddToBagButton = ({ productId }: { productId: string }) => {
  const { data: session, status } = useSession()

  const { addProduct, checkProductIsInBag } = useShoppingBag()
  const isInBag = checkProductIsInBag(productId)

  const handleClick = () => {
    if (status === "unauthenticated") {
      signIn()
    } else {
      addProduct(productId)
    }
  }

  return (
    <Button
      disabled={status === "loading" || isInBag}
      size="lg"
      className="w-full"
      onClick={handleClick}
    >
      {isInBag ? "Ya está en la bolsa ;)" : "Comprar"}
    </Button>
  )
}

export default AddToBagButton
