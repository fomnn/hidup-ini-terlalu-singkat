export default defineEventHandler(async (event) => {
  const db = event.context.cloudflare.env.DB
  const kv = event.context.cloudflare.env.ahh

  const usedNumber = await kv.get('usedNumber')

  if (usedNumber) {
    console.log(usedNumber)
    await kv.put('usedNumber', (Number.parseInt(usedNumber) + 1).toString())
  } else {
    await kv.put('usedNumber', "1")
  }

  const query = getQuery(event)
  const province = query['province']
  const gender = query['gender']

  const res = await db.prepare("SELECT age FROM ahh where province = ? and gender = ?").bind(province, gender).first()

  return res as {
    age: number
  }
})
