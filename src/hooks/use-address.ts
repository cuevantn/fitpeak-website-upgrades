"use client"

import useSWR from "swr"

import { AddressRecord } from "@/lib/xata/codegen/shop"

export const useAddress = () => {
  const { data, mutate } = useSWR("/api/addresses")

  const error = data?.error

  const addresses = data?.addresses as AddressRecord[]

  const noAddress = addresses?.length === 0

  const loading = !data && !error

  const createAddress = async (data: AddressRecord) => {
    try {
      await fetch("/api/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      await mutate()
      return true
    } catch {
      return false
    }
  }

  const updateAddress = async (id: string, data: AddressRecord) => {
    try {
      await fetch(`/api/addresses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      await mutate()
      return true
    } catch {
      return false
    }
  }

  const deleteAddress = async (id: string) => {
    try {
      await fetch(`/api/addresses/${id}`, {
        method: "DELETE",
      })

      await mutate()
      return true
    } catch {
      return false
    }
  }

  return {
    loading,
    noAddress,
    addresses,
    createAddress,
    updateAddress,
    deleteAddress,
    error,
  }
}
