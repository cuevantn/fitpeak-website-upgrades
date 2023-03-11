"use client"

import useSWR from "swr"

import { OrderRecord } from "@/lib/xata/codegen/shop"

export const useOrders = () => {
  const { data, mutate } = useSWR("/api/orders")

  const error = data?.error

  const loading = !data && !error

  const orders = data?.orders as OrderRecord

  const createOrder = async () => {
    const res = await fetch("/api/orders", {
      method: "POST",
    })
    const data = (await res.json()) as {
      ok?: true
      error?: string
      order_id?: string
    }
    if (data.ok) {
      await mutate()
    }

    return data
  }

  return {
    orders,
    createOrder,
    loading,
    error,
  }
}
