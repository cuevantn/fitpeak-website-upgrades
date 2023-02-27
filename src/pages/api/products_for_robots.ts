import type { NextApiRequest, NextApiResponse } from "next"
import Xata from "@/lib/xata"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const products = await Xata.shop.db.product.getAll()

  let data = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Fitpeak Products</title>
    <description>A list of products that Fitpeak offers. This feeds Facebook Catalog.</description>
    ${products.map(
      (product) => `
      <item>
        <g:id>${product.id}</g:id>
        <title>${product.title}</title>
        <g:description>${product.description}</g:description>
        <link>https://www.fitpeak.shop/products/${product.id}</link>
        <g:image_link>${product.image}</g:image_link>
        ${product.additional_images?.map(
          (image) =>
            `<g:additional_image_link>${image}</g:additional_image_link>`
        )}
        <g:availability>in stock</g:availability>
        <g:price>${product.price?.toFixed(2)} PEN</g:price>
        <g:sale_price>${product.sale_price?.toFixed(2)} PEN</g:sale_price>
        <g:product_type>${product.google_category}</g:product_type>
        <g:condition>new</g:condition>
        <g:google_product_category>${
          product.google_category
        }</g:google_product_category>
        <g:shipping>
          <g:country>PE</g:country>
          <g:service>Standard</g:service>
          <g:price>15.00 PEN</g:price>
        </g:shipping>
        <g:brand>Fitpeak</g:brand>
      </item>
      `
    )}
  </channel>
</rss>`

  // PARSE '&' to '&amp;'
  data = data.replace(/&/g, "&amp;")

  return res.status(200).send(data)
}
