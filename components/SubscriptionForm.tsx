"use client"

import type React from "react"
import { useState } from "react"
import { Mail, User, CreditCard, CheckCircle2, Phone } from "lucide-react"

export default function SubscriptionForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    phone: "",
    plan: "clasica",
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/subscriptions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      )

      if (!response.ok) throw new Error("Error al procesar la suscripción")

      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)

      setFormData({
        nombre: "",
        email: "",
        phone: "",
        plan: "clasica",
      })
    } catch (err) {
      setError("Ocurrió un error. Intenta nuevamente.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contacto" className="px-6 py-24 max-w-3xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 rounded-3xl blur-3xl -z-10" />

        <div className="bg-card text-card-foreground p-10 md:p-12 rounded-3xl shadow-2xl border border-border backdrop-blur-sm">
          <div className="text-center mb-10">
            <h3 className="text-4xl font-serif mb-3 font-bold">Únete al Club</h3>
            <p className="text-muted-foreground text-lg">Comienza tu viaje sensorial hoy</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block mb-2 font-semibold text-sm">
                Nombre completo
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-input border-2 border-border text-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                  placeholder="Juan Pérez"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 font-semibold text-sm">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-input border-2 border-border text-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                  placeholder="juan@ejemplo.com"
                  required
                />
              </div>
            </div>

            {/* Teléfono */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-card-foreground">
                Teléfono
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-input border-2 border-border text-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
                  placeholder="+54 011 1234 5678"
                  required
                />
              </div>
            </div>

            {/* Plan */}
            <div>
              <label htmlFor="plan" className="block mb-2 font-semibold text-sm">
                Selecciona tu membresía
              </label>
              <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10" size={20} />
                <select
                  id="plan"
                  value={formData.plan}
                  onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-input border-2 border-border text-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="clasica">Clásica - $8.500/mes</option>
                  <option value="premium">Premium - $12.500/mes</option>
                  <option value="elite">Elite - $22.500/mes</option>
                </select>
              </div>
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={loading || submitted}
              className="w-full bg-accent text-accent-foreground px-8 py-5 rounded-xl hover:opacity-90 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] disabled:opacity-100 disabled:cursor-not-allowed mt-8 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Enviando...</span>
              ) : submitted ? (
                <>
                  <CheckCircle2 size={24} />
                  <span>¡Enviado correctamente!</span>
                </>
              ) : (
                <span>Suscribirme ahora</span>
              )}
            </button>
          </form>

          {error && (
            <p className="text-center text-red-500 font-semibold mt-4">{error}</p>
          )}

          <p className="text-center text-sm text-muted-foreground mt-6">
            🔒 Tus datos están seguros y protegidos
          </p>
        </div>
      </div>
    </section>
  )
}
