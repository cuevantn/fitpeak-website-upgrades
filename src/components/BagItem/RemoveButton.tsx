"use client"

import React from "react"
import { Button } from "@/ui/button"

import Icons from "@/components/Icons"

const RemoveButton = ({
  handleRemove,
}: {
  handleRemove: () => Promise<boolean>
}) => {
  const [removing, setRemoving] = React.useState(false)
  return (
    <Button
      size="sm"
      variant="ghost"
      disabled={removing}
      onClick={async (e) => {
        setRemoving(true)
        const removed = await handleRemove()
        if (!removed) {
          console.error("Failed to remove product from bag")
        }
        setRemoving(false)
      }}
    >
      <Icons.remove className="w-4 h-4" />
    </Button>
  )
}

export default RemoveButton
