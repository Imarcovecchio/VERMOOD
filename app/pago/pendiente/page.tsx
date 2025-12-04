import Link from "next/link"
import { Clock } from "lucide-react"

export default function PagoPendientePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950">
      <div className="max-w-md w-full bg-card text-card-foreground p-10 rounded-3xl shadow-2xl border border-border text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-full">
            <Clock className="text-yellow-600 dark:text-yellow-400" size={64} />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">Pago pendiente</h1>
        <p className="text-muted-foreground mb-8">
          Tu pago está siendo procesado. Te notificaremos cuando se complete la transacción.
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
