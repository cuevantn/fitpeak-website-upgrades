"use client"

import React from "react"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"

import { Icons } from "@/ui/icons"
import RemoveButton from "./RemoveButton"

interface QuantityInputProps {
  quantity: number
  handleUpdate: (quantity: number) => Promise<boolean>
  handleRemove: () => Promise<boolean>
}

const QuantityInput = ({
  quantity,
  handleUpdate,
  handleRemove,
}: QuantityInputProps) => {
  const [value, setValue] = React.useState(quantity)
  const [updating, setUpdating] = React.useState(false)

  // Update the quantity in the bag when the user clicks the update button

  const handleSubmission = async (event: React.FormEvent) => {
    event.preventDefault()
    setUpdating(true)
    const updated = await handleUpdate(value)
    if (!updated) {
      console.error("Failed to update product quantity")
    }
    setUpdating(false)
  }

  return (
    <form
      onReset={() => setValue(quantity)}
      onSubmit={handleSubmission}
      className="flex flex-col items-center space-y-2"
    >
      <Input
        type="number"
        value={value}
        className="w-min"
        min={1}
        max={10}
        disabled={updating}
        onChange={(event) => setValue(parseInt(event.target.value))}
      />
      <div className="flex space-x-2">
        <Button
          disabled={updating || value === quantity}
          type="reset"
          size="sm"
          variant="ghost"
        >
          <Icons.undo className="w-4 h-4" />
        </Button>

        <Button
          disabled={updating || value === quantity || !value}
          type="submit"
          size="sm"
          variant="ghost"
        >
          <Icons.check className="w-4 h-4" />
        </Button>
        <RemoveButton handleRemove={handleRemove} />
      </div>
    </form>
  )
}

export default QuantityInput
