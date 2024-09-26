export default defineEventHandler(async (event) => {
  const db = event.context.cloudflare.env.DB

  const res = await db.prepare('SELECT province FROM ahh where gender = "man"').all()

  const provinces = res.results.map((row) => row.province)

  return provinces
})
