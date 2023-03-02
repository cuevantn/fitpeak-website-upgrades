"use client"

import useSWR from "swr"

import { ClientRecord } from "@/lib/xata/codegen/shop"

export const useClientInfo = () => {
  const { data, mutate } = useSWR("/api/clientinfo")

  const error = data?.error

  const clientInfo = data?.client as ClientRecord

  const updateClientInfo = async (clientInfo: ClientRecord) => {
    try {
      await fetch("/api/clientinfo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientInfo),
      })

      await mutate()
      return true
    } catch {
      return false
    }
  }

  return { clientInfo, updateClientInfo, error }
}
