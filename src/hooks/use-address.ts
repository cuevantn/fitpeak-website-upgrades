"use client"

import useSWR from "swr"

import { AddressRecord } from "@/lib/xata/codegen/shop"

export const useAddress = () => {
  const { data, mutate } = useSWR("/api/address")

  const error = data?.error

  const addresses = data?.addresses as AddressRecord[]

  const noAddress = addresses?.length === 0

  const loading = !data && !error

  const createAddress = async (address: AddressRecord) => {
    try {
      await fetch("/api/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      })

      await mutate()
      return true
    } catch {
      return false
    }
  }

  const updateAddress = async (address: AddressRecord) => {
    try {
      await fetch("/api/address", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      })

      await mutate()
      return true
    } catch {
      return false
    }
  }

  const deleteAddress = async (address: AddressRecord) => {
    try {
      await fetch("/api/address", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
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
