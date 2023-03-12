import { getUbigeo } from "@/lib/utils/get-olva-shipping-price/get-ubigeo"

const handler = async (req, res) => {
  const departamento_name = "LIMA"
  const provincia_name = "LIMA"
  const distrito_name = "LIMA"

  const ubigeo = getUbigeo(departamento_name, provincia_name, distrito_name)

  if (!ubigeo) {
    return res.status(404).json({ error: ":(" })
  }

  res.status(200).json({ ok: true, ubigeo })
}

export default handler
