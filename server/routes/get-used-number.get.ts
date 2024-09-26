export default defineEventHandler(async (event) => {
  const kv = event.context.cloudflare.env.ahh

  const usedNumber = await kv.get('usedNumber')

  if (usedNumber) {
    console.log(usedNumber)
    return usedNumber
  }

  return "0"
})
