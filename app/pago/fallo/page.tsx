import Link from "next/link"
import { XCircle } from "lucide-react"

export default function PagoFalloPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950">
      <div className="max-w-md w-full bg-card text-card-foreground p-10 rounded-3xl shadow-2xl border border-border text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-red-100 dark:bg-red-900 p-4 rounded-full">
            <XCircle className="text-red-600 dark:text-red-400" size={64} />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">Pago rechazado</h1>
        <p className="text-muted-foreground mb-8">
          No pudimos procesar tu pago. Por favor, intenta nuevamente o utiliza otro método de pago.
        </p>

        <Link
          href="/"
          className="inline-block bg-accent text-accent-foreground px-8 py-4 rounded-xl hover:opacity-90 transition-all duration-300 font-bold"
        >
          Intentar de nuevo
        </Link>
      </div>
    </div>
  )
}
