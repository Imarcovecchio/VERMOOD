import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Webhook recibido de Mercado Pago:", body)

    // Verificar que sea una notificación de pago
    if (body.type === "payment") {
      const paymentId = body.data.id

      // Obtener información del pago
      const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        },
      })

      if (!paymentResponse.ok) {
        throw new Error("Error al obtener información del pago")
      }

      const payment = await paymentResponse.json()
      console.log("[v0] Estado del pago:", payment.status)

      // Si el pago fue aprobado, enviar datos al backend
      if (payment.status === "approved") {
        const externalReference = JSON.parse(payment.external_reference || "{}")
        console.log("[v0] Pago aprobado, datos del usuario:", externalReference)

        // Aquí puedes agregar lógica para guardar en tu base de datos
        // O enviar al backend de C# si lo tienes configurado
        if (process.env.NEXT_PUBLIC_BACKEND_URL) {
          const backendResponse = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/SubscriptionsApi", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(externalReference),
          })

          if (!backendResponse.ok) {
            console.error("[v0] Error al guardar en backend")
          } else {
            console.log("[v0] Suscripción guardada exitosamente en backend")
          }
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[v0] Error en webhook:", error)
    return NextResponse.json({ error: "Error al procesar webhook" }, { status: 500 })
  }
}
