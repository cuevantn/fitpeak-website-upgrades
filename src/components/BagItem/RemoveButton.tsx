"use client"

import React from "react"
import { useToast } from "@/hooks/ui/use-toast"
import { Button } from "@/ui/button"

import { Icons } from "@/ui/icons"

const RemoveButton = ({
  handleRemove,
}: {
  handleRemove: () => Promise<boolean>
}) => {
  const [removing, setRemoving] = React.useState(false)
  const { toast } = useToast()
  return (
    <Button
      size="sm"
      variant="ghost"
      disabled={removing}
      onClick={async () => {
        setRemoving(true)
        const removed = await handleRemove()
        if (!removed) {
          toast({
            variant: "destructive",
            title: "Ups! Algo salió mal",
            description: "No se pudo eliminar el producto de tu bolsa",
          })
        } else {
          toast({
            description: "El producto ha sido eliminado de tu bolsa",
          })
        }
        setRemoving(false)
      }}
    >
      <Icons.remove className="w-4 h-4" />
    </Button>
  )
}

export default RemoveButton
