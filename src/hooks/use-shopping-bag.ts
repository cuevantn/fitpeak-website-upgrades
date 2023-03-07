"use client"

import useSWR from "swr"

import { BagRecord, ProductRecord } from "@/lib/xata/codegen/shop"

interface BagItem extends BagRecord {
  product: ProductRecord
}

export const useShoppingBag = () => {
  const { data, mutate } = useSWR("/api/bag")

  const error = data?.error
  const items = (data?.items || []) as BagItem[]

  const loading = !data && !error
  const empty = !loading && items.length === 0

  const total_sale_price = items.reduce(
    (acc, item) => acc + item.product.sale_price * item.quantity,
    0
  )
  const total_price = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )
  const different_items = items.length

  const checkProductIsInBag = (productId: string) => {
    return items.some((bagItem) => bagItem.product.id === productId)
  }

  const addProduct = async (productId: string) => {
    try {
      await fetch("/api/bag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      })

      await mutate()
      return true
    } catch {
      return false
    }
  }

  const removeProduct = async (productId: string) => {
    try {
      await fetch("/api/bag", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      })

      await mutate()
      return true
    } catch {
      return false
    }
  }

  const updateProduct = async (productId: string, quantity: number) => {
    try {
      await fetch("/api/bag", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      })
      await mutate()
      return true
    } catch {
      return false
    }
  }

  const clearBag = async () => {
    await fetch("/api/bag", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    mutate()
  }
  return {
    total_price,
    total_sale_price,
    different_items,
    items,
    addProduct,
    updateProduct,
    removeProduct,
    clearBag,
    checkProductIsInBag,
    error,
    loading,
    empty,
  }
}
