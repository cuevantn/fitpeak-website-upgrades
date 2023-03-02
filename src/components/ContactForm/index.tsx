"use client"

import React from "react"
import { useToast } from "@/hooks/ui/use-toast"
import { useClientInfo } from "@/hooks/use-client-info"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { useSession } from "next-auth/react"

import { ClientRecord } from "@/lib/xata/codegen/shop"

interface ContactFormProps {
  initialInfo: ClientRecord
  updateClientInfo: (info: ClientRecord) => Promise<boolean>
}

const ContactForm = ({ initialInfo, updateClientInfo }: ContactFormProps) => {
  const { toast } = useToast()

  const [first_name, setFirstName] = React.useState(initialInfo.first_name)
  const [last_name, setLastName] = React.useState(initialInfo.last_name)
  const [DNI, setDNI] = React.useState(initialInfo.DNI)
  const [email, setEmail] = React.useState(initialInfo.email)
  const [phone_prefix, setPhonePrefix] = React.useState(
    initialInfo.phone_prefix
  )
  const [phone_number, setPhoneNumber] = React.useState(
    initialInfo.phone_number
  )

  const [updating, setUpdating] = React.useState(false)

  const withoutChanges = React.useMemo(
    () =>
      first_name === initialInfo.first_name &&
      last_name === initialInfo.last_name &&
      DNI === initialInfo.DNI &&
      email === initialInfo.email &&
      phone_prefix === initialInfo.phone_prefix &&
      phone_number === initialInfo.phone_number,
    [first_name, last_name, DNI, email, phone_prefix, phone_number, initialInfo]
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUpdating(true)
    const updated = await updateClientInfo({
      first_name,
      last_name,
      DNI,
      email,
      phone_prefix,
      phone_number,
    } as ClientRecord)
    if (!updated) {
      toast({
        variant: "destructive",
        title: "Ups! Algo salió mal",
        description: "No se pudo actualizar tu información",
      })
    } else {
      toast({
        description: "Se actualizó tu información correctamente",
      })
    }
    setUpdating(false)
  }

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFirstName(initialInfo.first_name)
    setLastName(initialInfo.last_name)
    setDNI(initialInfo.DNI)
    setEmail(initialInfo.email)
    setPhonePrefix(initialInfo.phone_prefix)
    setPhoneNumber(initialInfo.phone_number)
  }

  return (
    <form
      className="space-y-4 max-w-md"
      onReset={handleReset}
      onSubmit={handleSubmit}
    >
      <div>
        <Label htmlFor="name">Nombre</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="lastname">Apellidos</Label>
        <Input
          type="text"
          id="lastname"
          name="lastname"
          required
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="dni">DNI</Label>
        <Input
          type="number"
          id="dni"
          name="dni"
          min={10000000}
          max={99999999}
          required
          value={DNI}
          onChange={(e) => setDNI(parseInt(e.target.value))}
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex space-x-4">
        <div className="w-1/3">
          <Label htmlFor="phone_prefix">Prefijo</Label>
          <Input
            type="number"
            id="phone_prefix"
            name="phone_prefix"
            required
            value={phone_prefix}
            onChange={(e) => setPhonePrefix(parseInt(e.target.value))}
          />
        </div>
        <div className="w-2/3">
          <Label htmlFor="phone_number">Número</Label>
          <Input
            type="number"
            id="phone_number"
            name="phone_number"
            required
            value={phone_number}
            onChange={(e) => setPhoneNumber(parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          type="reset"
          variant="outline"
          disabled={withoutChanges || updating}
        >
          Deshacer
        </Button>
        <Button type="submit" disabled={withoutChanges || updating}>
          Guardar
        </Button>
      </div>
    </form>
  )
}

export default function ContactHandler() {
  const { clientInfo, updateClientInfo, error } = useClientInfo()

  if (!clientInfo && !error) {
    return <div className="container my-4">Loading...</div>
  }

  if (error === "Unauthenticated") {
    return <div className="container my-4">Unauthenticated</div>
  }

  return (
    <ContactForm initialInfo={clientInfo} updateClientInfo={updateClientInfo} />
  )
}
