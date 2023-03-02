"use client"

import React from "react"
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

import { Icons } from "@/ui/icons"

import { DEPARTAMENTOS } from "@/lib/constants"
import { AddressRecord } from "@/lib/xata/codegen/shop"

export const AddressForm = () => {
  const { toast } = useToast()
  const { createAddress } = useAddress()

  const [departamento, setDepartamento] = React.useState<string>()
  const [provincia, setProvincia] = React.useState<string>()
  const [distrito, setDistrito] = React.useState<string>()
  const [direccion, setDireccion] = React.useState<string>()
  const [referencias, setReferencias] = React.useState<string>()

  const [submitting, setSubmitting] = React.useState(false)

  const departamentosOptions = React.useMemo(() => {
    return Object.keys(DEPARTAMENTOS)
      .map((key) => ({
        value: key,
        label: DEPARTAMENTOS[key].departamento_name,
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [])

  const provinciasOptions = React.useMemo(() => {
    if (!departamento) return []
    return Object.keys(DEPARTAMENTOS[departamento].provincias)
      .map((key) => ({
        value: key,
        label: DEPARTAMENTOS[departamento].provincias[key].provincia_name,
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [departamento])

  const distritosOptions = React.useMemo(() => {
    if (!departamento || !provincia) return []
    return Object.keys(
      DEPARTAMENTOS[departamento].provincias[provincia].distritos
    )
      .map((key) => ({
        value: key,
        label:
          DEPARTAMENTOS[departamento].provincias[provincia].distritos[key]
            .distrito_name,
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [departamento, provincia])

  const departamento_name = React.useMemo(() => {
    if (!departamento) return ""
    return DEPARTAMENTOS[departamento].departamento_name
  }, [departamento])

  const provincia_name = React.useMemo(() => {
    if (!departamento || !provincia) return ""
    return DEPARTAMENTOS[departamento].provincias[provincia].provincia_name
  }, [departamento, provincia])

  const distrito_name = React.useMemo(() => {
    if (!departamento || !provincia || !distrito) return ""
    return DEPARTAMENTOS[departamento].provincias[provincia].distritos[distrito]
      .distrito_name
  }, [departamento, provincia, distrito])

  const allFieldsFilled = React.useMemo(() => {
    return (
      departamento_name &&
      departamento_name.length > 0 &&
      provincia_name &&
      provincia_name.length > 0 &&
      distrito_name &&
      distrito_name.length > 0 &&
      referencias &&
      referencias.length > 0
    )
  }, [departamento, provincia, distrito, direccion, referencias])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!allFieldsFilled) return
    setSubmitting(true)

    const created = await createAddress({
      departamento: departamento_name,
      provincia: provincia_name,
      distrito: distrito_name,
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

    setSubmitting(false)
  }

  return (
    <form className="space-y-4 max-w-sm" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="departamento">Departamento</Label>
        <Select
          name="departamento"
          onValueChange={(value) => {
            setDepartamento(value)
            setProvincia(undefined)
            setDistrito(undefined)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un departamento" />
          </SelectTrigger>
          <SelectContent className="w-[250px]">
            <SelectGroup>
              <SelectLabel>Departamentos del Perú</SelectLabel>
              {departamentosOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
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
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una provincia" />
          </SelectTrigger>
          <SelectContent className="w-[250px]">
            <SelectGroup>
              <SelectLabel>Provincias de {departamento_name}</SelectLabel>
              {provinciasOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="distrito">Distrito</Label>
        <Select name="distrito" onValueChange={setDistrito}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un distrito" />
          </SelectTrigger>
          <SelectContent className="w-[250px]">
            <SelectGroup>
              <SelectLabel>Distritos de {provincia_name}</SelectLabel>
              {distritosOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
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
          onChange={(e) => setDireccion(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="referencias">Referencias</Label>
        <Input
          type="text"
          name="referencias"
          value={referencias}
          onChange={(e) => setReferencias(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <Button disabled={submitting} type="submit">
          Guardar
        </Button>
      </div>
    </form>
  )
}
