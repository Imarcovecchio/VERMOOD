import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    console.log("[v0] Datos recibidos:", body)

    const preference = {
      items: [
        {
          title: body.plan,
          quantity: 1,
          currency_id: "ARS",
          unit_price: 1000,
        },
      ],
      back_urls: {
        success: "http://localhost:3000/pago/exito",
        failure: "http://localhost:3000/pago/fallo",
        pending: "http://localhost:3000/pago/pendiente",
      },
      auto_return: "approved",
    }

    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preference),
      }
    )

    const data = await response.json()

    console.log("[v0] Respuesta MP:", data)

    if (!response.ok) {
      throw new Error("Error en Mercado Pago: " + JSON.stringify(data))
    }

    return NextResponse.json({
      id: data.id,
      init_point: data.init_point,
    })

  } catch (error: any) {
    console.error("[v0] Error crear preferencia:", error)

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
