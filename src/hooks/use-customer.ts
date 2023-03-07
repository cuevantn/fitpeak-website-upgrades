"use client"

import useSWR from "swr"

import { CustomerRecord } from "@/lib/xata/codegen/shop"

export const useCustomer = () => {
  const { data, mutate } = useSWR("/api/customer")

  const error = data?.error

  const loading = !data && !error

  const customer = data?.customer as CustomerRecord

  const updatecustomer = async (customer: CustomerRecord) => {
    try {
      await fetch("/api/customer", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      })

      await mutate()
      return true
    } catch {
      return false
    }
  }

  return { customer, loading, updatecustomer, error }
}
