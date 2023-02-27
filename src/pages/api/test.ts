import Xata from "@/lib/xata"

const transfer = async () => {
  console.log("transfer")
}

const handler = async (req, res) => {
  await transfer()
  res.status(200).json({ success: true })
}

export default handler
