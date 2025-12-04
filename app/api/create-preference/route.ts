import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, email, phone, plan } = body

    console.log("[v0] Datos recibidos:", { nombre, email, phone, plan })

    // Precios según el plan
    const prices: Record<string, number> = {
      clasica: 250,
      premium: 12500,
      elite: 22500,
    }

    const planNames: Record<string, string> = {
      clasica: "Membresía Clásica",
      premium: "Membresía Premium",
      elite: "Membresía Elite",
    }

    const price = prices[plan] || 8500
    const planName = planNames[plan] || "Membresía Clásica"

    console.log("[v0] Plan seleccionado:", planName, "- Precio:", price)

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.BASE_URL

    // Crear la preferencia de pago en Mercado Pago
    const preference = {
      items: [
        {
          title: planName,
          quantity: 1,
          unit_price: price,
          currency_id: "ARS",
        },
      ],
      payer: {
        name: nombre,
        email: email,
        phone: {
          number: phone,
        },
      },
      back_urls: {
        success: `${baseUrl}${process.env.SUCCESS_PATH || "/pago/exito"}`,
        failure: `${baseUrl}${process.env.FAILURE_PATH || "/pago/fallo"}`,
        pending: `${baseUrl}${process.env.PENDING_PATH || "/pago/pendiente"}`,
      },
      auto_return: "approved",
      external_reference: JSON.stringify({ nombre, email, phone, plan }),
      notification_url: `${baseUrl}/api/webhooks/mercadopago`,
    }

    console.log("[v0] Enviando preferencia a Mercado Pago...")

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preference),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error("Error en Mercado Pago: " + JSON.stringify(data))
    }

    console.log("[v0] Preferencia creada exitosamente:", data.id)

    return NextResponse.json({
      id: data.id,
      init_point: data.init_point,
    })
  } catch (error: any) {
    console.error("[v0] Error crear preferencia:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
