import { Heading, Paragraph } from "@/ui/typography"

import ContactForm from "@/components/ContactForm"

const ContactPage = () => {
  return (
    <div className="container">
      <Heading>Tu información de contacto</Heading>

      <Paragraph>
        Esta información sirve para que Fitpeak y Olva Courier puedan
        contactarse contigo.
      </Paragraph>
      <ContactForm />
    </div>
  )
}

export default ContactPage
