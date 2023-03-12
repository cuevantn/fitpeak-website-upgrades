"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/ui/use-toast"
import { useAddress } from "@/hooks/use-address"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/ui/select"

import { DEPARTAMENTOS } from "@/lib/constants/departamentos"
import { AddressRecord } from "@/lib/xata/codegen/shop"

interface AddressFormProps {
  initialValues?: AddressRecord
}

export const AddressForm = ({ initialValues }: AddressFormProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const { createAddress, updateAddress, deleteAddress } = useAddress()

  const [departamento, setDepartamento] = React.useState(
    initialValues?.departamento
  )
  const [provincia, setProvincia] = React.useState(initialValues?.provincia)
  const [distrito, setDistrito] = React.useState(initialValues?.distrito)
  const [direccion, setDireccion] = React.useState(initialValues?.direccion)
  const [referencias, setReferencias] = React.useState(
    initialValues?.referencias
  )

  const [submitting, setSubmitting] = React.useState(false)

  const departamentosOptions = React.useMemo(() => {
    return Object.keys(DEPARTAMENTOS).sort((a, b) => a.localeCompare(b))
  }, [])

  const provinciasOptions = React.useMemo(() => {
    if (!departamento) return []
    return Object.keys(DEPARTAMENTOS[departamento]).sort((a, b) =>
      a.localeCompare(b)
    )
  }, [departamento])

  const distritosOptions = React.useMemo(() => {
    if (!departamento || !provincia) return []
    return DEPARTAMENTOS[departamento][provincia].sort((a: string, b: string) =>
      a.localeCompare(b)
    )
  }, [departamento, provincia])

  const allFieldsFilled = departamento && provincia && distrito && referencias

  const disabled =
    submitting || initialValues
      ? departamento === initialValues?.departamento &&
        provincia === initialValues?.provincia &&
        distrito === initialValues?.distrito &&
        direccion === initialValues?.direccion &&
        referencias === initialValues?.referencias
      : !allFieldsFilled

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!allFieldsFilled) return
    setSubmitting(true)

    if (initialValues) {
      const updated = await updateAddress(initialValues.id, {
        departamento,
        provincia,
        distrito,
        direccion,
        referencias,
      } as AddressRecord)

      if (!updated) {
        toast({
          variant: "destructive",
          title: "Ups! Algo salió mal",
          description: "No se pudo actualizar esta dirección",
        })
      } else {
        toast({
          title: "Dirección actualizada",
          description: "Tu dirección ha sido actualizada con éxito",
        })
      }
    } else {
      const created = await createAddress({
        departamento,
        provincia,
        distrito,
        direccion,
        referencias,
      } as AddressRecord)

      if (!created) {
        toast({
          variant: "destructive",
          title: "Ups! Algo salió mal",
          description: "No se pudo guardar esta dirección",
        })
      } else {
        toast({
          title: "Dirección creada",
          description: "Tu dirección ha sido creada con éxito",
        })
      }
    }
    setSubmitting(false)
    router.push("/addresses")
  }

  const handleDelete = async () => {
    if (!initialValues) return
    setSubmitting(true)

    const deleted = await deleteAddress(initialValues.id)

    if (!deleted) {
      toast({
        variant: "destructive",
        title: "Ups! Algo salió mal",
        description: "No se pudo eliminar esta dirección",
      })
    } else {
      toast({
        title: "Dirección eliminada",
        description: "Tu dirección ha sido eliminada con éxito",
      })
    }
    setSubmitting(false)
    router.push("/addresses")
  }

  return (
    <form className="max-w-sm space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="departamento">Departamento</Label>
        <Select
          name="departamento"
          onValueChange={(value) => {
            setDepartamento(value)
            setProvincia(undefined)
            setDistrito(undefined)
          }}
          defaultValue={departamento}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un departamento" />
          </SelectTrigger>
          <SelectContent className="w-[250px]">
            <SelectGroup>
              <SelectLabel>Departamentos del Perú</SelectLabel>
              {departamentosOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="provincia">Provincia</Label>
        <Select
          name="provincia"
          onValueChange={(value) => {
            setProvincia(value)
            setDistrito(undefined)
          }}
          defaultValue={provincia}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una provincia" />
          </SelectTrigger>
          <SelectContent className="w-[250px]">
            <SelectGroup>
              <SelectLabel>Provincias de {departamento}</SelectLabel>
              {provinciasOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="distrito">Distrito</Label>
        <Select
          name="distrito"
          onValueChange={setDistrito}
          defaultValue={distrito}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un distrito" />
          </SelectTrigger>
          <SelectContent className="w-[250px]">
            <SelectGroup>
              <SelectLabel>Distritos de {provincia}</SelectLabel>
              {distritosOptions.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="direccion">Dirección</Label>
        <Input
          type="text"
          name="direccion"
          value={direccion}
          onChange={(event) => setDireccion(event.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="referencias">Referencias</Label>
        <Input
          type="text"
          name="referencias"
          value={referencias}
          onChange={(event) => setReferencias(event.target.value)}
        />
      </div>

      <div className="flex justify-between">
        {initialValues ? (
          <Button
            variant="destructive"
            type="button"
            onClick={handleDelete}
            disabled={submitting}
          >
            Eliminar
          </Button>
        ) : (
          <Button
            variant="outline"
            type="button"
            disabled={submitting}
            onClick={() => {
              router.back()
            }}
          >
            Cancelar
          </Button>
        )}

        {initialValues ? (
          disabled ? (
            <Button
              variant="outline"
              type="button"
              disabled={submitting}
              onClick={() => {
                router.back()
              }}
            >
              Cancelar
            </Button>
          ) : (
            <Button type="submit" disabled={disabled}>
              Guardar
            </Button>
          )
        ) : (
          <Button type="submit" disabled={disabled}>
            Guardar
          </Button>
        )}
      </div>
    </form>
  )
}
