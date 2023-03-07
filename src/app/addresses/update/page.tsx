"use client"

import { useSearchParams } from "next/navigation"
import { Heading, Paragraph } from "@/ui/typography"
import useSWR from "swr"

import { AddressRecord } from "@/lib/xata/codegen/shop"
import { AddressForm } from "@/components/address-form"

const AddAddressPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams?.get("id")

  const { data, error } = useSWR(id ? `/api/addresses/${id}` : null)

  if (error) {
    return <div>Error</div>
  }

  if (!data?.success && !error) {
    return <div>Loading...</div>
  }

  const { address } = data

  return (
    <div className="container">
      <Heading>Actualiza tu dirección</Heading>
      <Paragraph className="mb-4">
        La información que solicitamos solo será compartida con los proveedores
        de servicios de envío para que puedan entregar tu pedido.
      </Paragraph>
      <AddressForm initialValues={address} />
    </div>
  )
}

export default AddAddressPage
