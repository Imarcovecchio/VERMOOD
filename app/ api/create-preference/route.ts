import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, email, phone, plan } = body

    // Precios según el plan
    const prices: Record<string, number> = {
      clasica: 8500,
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
        success: `${process.env.NEXT_PUBLIC_SITE_URL || "https://vermood.vercel.app"}/pago/exito`,
        failure: `${process.env.NEXT_PUBLIC_SITE_URL || "https://vermood.vercel.app"}/pago/fallo`,
        pending: `${process.env.NEXT_PUBLIC_SITE_URL || "https://vermood.vercel.app"}/pago/pendiente`,
      },
      auto_return: "approved",
      external_reference: JSON.stringify({ nombre, email, phone, plan }),
      notification_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://vermood.vercel.app"}/api/webhooks/mercadopago`,
    }

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preference),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[v0] Error de Mercado Pago:", errorData)
      throw new Error("Error al crear la preferencia de pago")
    }

    const data = await response.json()
    console.log("[v0] Preferencia creada:", data.id)

    return NextResponse.json({
      id: data.id,
      init_point: data.init_point,
    })
  } catch (error) {
    console.error("[v0] Error al crear preferencia:", error)
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 })
  }
}
