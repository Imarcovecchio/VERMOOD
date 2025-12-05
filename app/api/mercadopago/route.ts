import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[Webhook] Notificación recibida:", body)

    // Aseguramos que el webhook es de tipo pago
    if (body.type !== "payment") {
      return NextResponse.json({ message: "Evento ignorado" })
    }

    const paymentId = body.data.id
    console.log("[Webhook] paymentId recibido:", paymentId)

    // Obtener información completa del pago desde MercadoPago
    const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      },
    })

    if (!paymentResponse.ok) {
      throw new Error("No se pudo obtener el pago desde MercadoPago")
    }

    const payment = await paymentResponse.json()
    console.log("[Webhook] Datos del pago:", payment)

    // Solo procesamos pagos aprobados
    if (payment.status !== "approved") {
      console.log("[Webhook] Pago no aprobado. Estado:", payment.status)
      return NextResponse.json({ message: "Pago no aprobado" })
    }

    // Extraer datos del formulario enviados en external_reference
    const formData = JSON.parse(payment.external_reference || "{}")
    console.log("[Webhook] Datos del formulario:", formData)

    // Crear objeto FINAL para enviar al backend C#
    const payload = {
      Nombre: formData.Nombre,
      Email: formData.Email,
      Phone: formData.Phone,
      Plan: formData.Plan,
      Adress: formData.Adress,
      EsRegalo: formData.EsRegalo,
      PaymentId: payment.id,
      PaymentStatus: payment.status,
      PaymentAmount: payment.transaction_amount,
    }

    console.log("[Webhook] Payload final para backend:", payload)

    // Enviar al backend C#
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    if (!backendUrl) {
      console.error("FALTA NEXT_PUBLIC_BACKEND_URL en variables de entorno")
    } else {
      const backendResponse = await fetch(`${backendUrl}/api/SubscriptionsApi`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!backendResponse.ok) {
        const errText = await backendResponse.text()
        console.error("[Webhook] ERROR guardando en backend:", errText)
      } else {
        console.log("[Webhook] Suscripción guardada en backend correctamente")
      }
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[Webhook] ERROR:", error)
    return NextResponse.json({ error: "Error procesando webhook" }, { status: 500 })
  }
}
