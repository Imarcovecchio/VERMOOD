export async function GET() {
  return new Response(
    JSON.stringify({
      backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || "NO VAR FOUND"
    }),
    { status: 200 }
  )
}
