"use client"

import Link from "next/link"
import { useAddress } from "@/hooks/use-address"
import { Button } from "@/ui/button"
import { Label } from "@/ui/label"
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group"
import { Heading, Paragraph } from "@/ui/typography"

const AddressPage = () => {
  const { addresses, noAddress, loading, error } = useAddress()

  if (loading) {
    return <div>Loading...</div>
  }

  if (error === "Unauthenticated") {
    return <div>Unauthenticated</div>
  }

  if (noAddress) {
    return (
      <div className="container">
        <h1>Sin direcciones</h1>
        <Link href="/address/add">
          <Button className="mt-4" type="button">
            Agregar nueva dirección
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container">
      <Heading>Tus direcciones de envío</Heading>
      <Paragraph>
        Selecciona la dirección de envío que deseas utilizar para tu siguiente
        pedido.
      </Paragraph>
      <form
        className="my-4"
        onSubmit={(event) => {
          event.preventDefault()
          console.log(event)
        }}
      >
        <RadioGroup defaultValue="comfortable" className="space-y-2">
          <div className="flex items-center space-x-1.5">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">
              <div className="space-y-2">
                <div className="font-bold">
                  Av. 190, Mz. N, Lote 8, Pachacutec
                </div>
                <div className="text-gray-500">Ventanilla, Callao, Callao</div>
                <div className="text-gray-500">Al frente del colegio 5128</div>
              </div>
            </Label>
          </div>
          {addresses.map((address) => (
            <div className="flex items-center space-x-1.5" key={address.id}>
              <RadioGroupItem
                className="shrink-0"
                value={address.id}
                id={address.id}
              />
              <Label htmlFor={address.id}>
                <div className="space-y-2">
                  <div className="font-bold">{address.direccion}</div>
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

        <Link href="/address/add">
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
