"use client"

import React, { FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/ui/use-toast"
import { useAddress } from "@/hooks/use-address"
import { useCustomer } from "@/hooks/use-customer"
import { Button } from "@/ui/button"
import { Icons } from "@/ui/icons"
import { Label } from "@/ui/label"
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group"
import { Heading, Paragraph } from "@/ui/typography"

const AddressPage = () => {
  const router = useRouter()
  const { toast } = useToast()
  const { addresses, noAddress, loading, error, setPreferredAddress } =
    useAddress()
  const {
    customer,
    loading: loadingCustomer,
    error: customerError,
  } = useCustomer()

  const [selectedAddress, setSelectedAddress] = React.useState<string | null>(
    null
  )
  const [loadingSave, setLoadingSave] = React.useState(false)

  if (loading || loadingCustomer) {
    return <div>Loading...</div>
  }

  if (error === "Unauthenticated") {
    return <div>Unauthenticated</div>
  }

  if (noAddress) {
    return (
      <div className="container">
        <h1>Sin direcciones</h1>
        <Link href="/addresses/add">
          <Button className="mt-4" type="button">
            Agregar nueva dirección
          </Button>
        </Link>
      </div>
    )
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoadingSave(true)
    if (selectedAddress) {
      const updated = await setPreferredAddress(selectedAddress)
      if (updated) {
        toast({
          title: "Dirección actualizada",
          description: "Tu dirección de envío preferida ha sido actualizada",
        })
      } else {
        toast({
          title: "Error al actualizar",
          description: "No se pudo actualizar tu dirección de envío preferida",
          variant: "destructive",
        })
      }

      router.push("/bag")
    }
  }

  return (
    <div className="container">
      <Heading>Tus direcciones de envío</Heading>
      <Paragraph>
        Selecciona la dirección de envío que deseas utilizar para tu siguiente
        pedido.
      </Paragraph>
      <form className="my-4" onSubmit={handleSubmit}>
        <RadioGroup
          defaultValue={customer?.preferred_address?.id}
          onValueChange={(value) => setSelectedAddress(value)}
          className="space-y-2"
        >
          {addresses.map((address) => (
            <div className="flex items-center space-x-1.5" key={address.id}>
              <RadioGroupItem
                className="shrink-0"
                value={address.id}
                id={address.id}
              />
              <Label htmlFor={address.id}>
                <div className="space-y-2">
                  <div className="flex items-center font-bold">
                    {address.direccion}
                    <Button
                      size="sm"
                      variant="outline"
                      type="button"
                      className="relative ml-2 h-6 w-6 rounded-full"
                      onClick={() =>
                        router.push(`/addresses/update?id=${address.id}`)
                      }
                    >
                      <Icons.pencil className="absolute h-3 w-3" />
                    </Button>
                  </div>
                  <div className="text-gray-500">
                    {[
                      address.distrito,
                      address.provincia,
                      address.departamento,
                    ].join(", ")}
                  </div>
                  <div className="text-gray-500">{address.referencias}</div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>

        <Link href="/addresses/add">
          <Button
            className="mt-4 block"
            size="sm"
            variant="outline"
            type="button"
          >
            Agregar nueva dirección
          </Button>
        </Link>

        <Button className="mt-4" type="submit">
          Guardar
        </Button>
      </form>
    </div>
  )
}

export default AddressPage
