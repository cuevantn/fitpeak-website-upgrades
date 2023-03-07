"use client"

import { useToast } from "@/hooks/ui/use-toast"
import { useShoppingBag } from "@/hooks/use-shopping-bag"
import { Button } from "@/ui/button"
import { ToastAction } from "@/ui/toast"
import { signIn } from "next-auth/react"

const AddToBagButton = ({ productId }: { productId: string }) => {
  const { toast } = useToast()

  const { loading, addProduct, checkProductIsInBag, error } = useShoppingBag()
  const isInBag = checkProductIsInBag(productId)

  const handleClick = async () => {
    if (error === "Unauthenticated") {
      toast({
        variant: "destructive",
        title: "Ups! No estás logueado",
        description: "Inicia sesión para poder agregar productos a tu bolsa",
        action: (
          <ToastAction altText="Iniciar sesión" onClick={() => signIn()}>
            Iniciar sesión
          </ToastAction>
        ),
      })
    } else {
      const added = await addProduct(productId)
      if (!added) {
        toast({
          variant: "destructive",
          title: "Ups! Algo salió mal",
          description: "No se pudo agregar el producto a tu bolsa",
        })
      } else {
        toast({
          description: isInBag
            ? "Se ha agregado una unidad más a tu bolsa"
            : "El producto ha sido agregado a tu bolsa",
        })
      }
    }
  }

  return (
    <Button
      disabled={loading}
      size="lg"
      className="w-full"
      onClick={handleClick}
    >
      {isInBag ? "Agregar uno más" : "Comprar"}
    </Button>
  )
}

export default AddToBagButton
