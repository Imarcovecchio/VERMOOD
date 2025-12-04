import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

export default function PagoExitoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
      <div className="max-w-md w-full bg-card text-card-foreground p-10 rounded-3xl shadow-2xl border border-border text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full">
            <CheckCircle2 className="text-green-600 dark:text-green-400" size={64} />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">¡Pago exitoso!</h1>
        <p className="text-muted-foreground mb-8">
          Tu suscripción ha sido procesada correctamente. Recibirás un correo de confirmación pronto.
        </p>

        <Link
          href="/"
          className="inline-block bg-accent text-accent-foreground px-8 py-4 rounded-xl hover:opacity-90 transition-all duration-300 font-bold"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
