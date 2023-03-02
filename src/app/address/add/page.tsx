import { Heading, Paragraph } from "@/ui/typography"

import { AddressForm } from "@/components/address-form"

const AddAddressPage = () => {
  return (
    <div className="container">
      <Heading>Agregar una dirección</Heading>
      <Paragraph className="mb-4">
        La información que solicitamos solo será compartida con los proveedores
        de servicios de envío para que puedan entregar tu pedido.
      </Paragraph>
      <AddressForm />
    </div>
  )
}

export default AddAddressPage
