"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Sparkles, Award, Users } from "lucide-react"
import About from "@/components/About"
import GalleryCarousel from "@/components/GalleryCarousel"
import SubscriptionForm from "@/components/SubscriptionForm"

export default function App() {
  const [dark, setDark] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Persistencia en localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "dark") {
      setDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    const newValue = !dark
    setDark(newValue)
    if (newValue) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <div className="font-sans bg-background text-foreground transition-colors duration-500 overflow-x-hidden">
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50 px-6 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center h-16">

        {/* Logo chiquito para el NAV */}
        <a href="#" className="flex items-center gap-2">
          <span className="font-brand text-3xl tracking-wider">VERMOOD</span>
        </a>

        <div className="flex items-center gap-6">
          <a href="#about" className="text-foreground/70 hover:text-foreground transition-all duration-300 font-medium hover:scale-105">Sobre</a>
          <a href="#membresias" className="text-foreground/70 hover:text-foreground transition-all duration-300 font-medium hover:scale-105">Membresías</a>
          <a href="#contacto" className="text-foreground/70 hover:text-foreground transition-all duration-300 font-medium hover:scale-105">Contacto</a>

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-accent/20 text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>

        <header className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-background">
{/* Patrón decorativo superior */}
<div className="absolute top-[50px] left-0 right-0 flex flex-col z-20 py-0">
  
  {/* Fila 1 */}
  <div className="flex justify-center gap-1 leading-none h-4">
    {[...Array(80)].map((_, i) => (
      <div
        key={`top-row1-${i}`}
        className={`w-4 h-4 ${i % 2 === 0 ? "bg-foreground" : "bg-transparent"}`}
      />
    ))}
  </div>

  {/* Fila 2 */}
  <div className="flex justify-center gap-1 leading-none h-4 -translate-y-1">
    {[...Array(80)].map((_, i) => (
      <div
        key={`top-row2-${i}`}
        className={`w-4 h-4 ${i % 2 !== 0 ? "bg-foreground" : "bg-transparent"}`}
      />
    ))}
  </div>
</div>

{/* Patrón decorativo inferior */}
<div className="absolute bottom-0 left-0 right-0 flex flex-col z-20 py-2">
  {/* Fila 1 */}
  <div className="flex justify-center gap-1 leading-none h-4">
    {[...Array(80)].map((_, i) => (
      <div
        key={`top-row1-${i}`}
        className={`w-4 h-4 ${i % 2 === 0 ? "bg-foreground" : "bg-transparent"}`}
      />
    ))}
  </div>

  {/* Fila 2 */}
  <div className="flex justify-center gap-1 leading-none h-4 -translate-y-1">
    {[...Array(80)].map((_, i) => (
      <div
        key={`top-row2-${i}`}
        className={`w-4 h-4 ${i % 2 !== 0 ? "bg-foreground" : "bg-transparent"}`}
      />
    ))}
  </div>
</div>



          {/* Contenido central inspirado en el logo */}
          <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-6 max-w-6xl mx-auto">
            {/* Texto del logo */}
            <div className="text-center md:text-left">
              <h1 className="font-brand text-7xl md:text-9xl mb-4 leading-none tracking-wider">
                VER
                <br />
                MOOD
              </h1>
              <p className="font-tagline text-2xl md:text-3xl tracking-wide">
                EL CLUB DEL
                <br />
                VERMÚ
              </p>
            </div>

            {/* Sifón ilustración */}
          <div className="absolute z-0 right-[-40px] md:right-[-25px] top-1/2 -translate-y-1/2 
                w-48 h-64 md:w-64 md:h-80 
                flex items-center justify-center pointer-events-none">
            
            <svg
              viewBox="0 0 572 1473"
              className="w-full h-full drop-shadow-2xl"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))" }}
            >
              <path
                d="M301.234 0L301.385 0.180664L321 23.8193V124.712L384.794 161.593L384.832 161.626L571.206 327.459L550.581 350.661L348.35 212.685L354 232.932V350.164L353.902 350.297L338.547 371.1L353.925 425.168L444.251 477.567L444.334 477.615L444.393 477.69L485.393 529.69L485.438 529.747L485.465 529.814L514.965 603.814L514.035 604.186L484.561 530.251L443.666 478.385L353.074 425.831L353.02 425.637L337.452 370.9L352.51 350.5H177.455L187.502 232.957L187.505 232.921L187.514 232.885L212.801 125.786L0 203.214V154.161L0.314453 154.035L213.046 69.1416L219.505 23.9297L219.532 23.7402L247.818 0H301.234ZM220.468 24.2588L213.954 69.8574L1 154.839V201.786L214.199 124.214L188.494 233.078L178.545 349.5H353V233.067L346.65 210.314L550.418 349.338L569.794 327.541L384.203 162.405L320 125.288V24.1797L300.766 1H248.182L220.468 24.2588Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="22"
                strokeLinejoin="round"
              />
              <path
                d="M203.1 376.397L202.953 376.711L179.453 427.211L179.397 427.331L179.29 427.407L81.8984 496.829L14.9922 643.624L4.50195 784.989L85.4688 1432.22L140.66 1472H408.819L456.531 1432.24L514.503 1025.94L536.498 784.995L526.505 643.591L514.521 604.146L515.479 603.854L527.479 643.354L527.495 643.408L527.499 643.465L537.499 784.965L537.502 785.005L537.498 785.046L515.498 1026.05L515.497 1026.06L515.495 1026.07L457.468 1432.76L409.181 1473H140.339L140.208 1472.91L84.708 1432.91L84.5312 1432.78L84.5039 1432.56L3.50391 785.062L3.49805 785.013L3.50098 784.963L14.001 643.463L14.0078 643.374L14.0449 643.293L81.1006 496.171L178.603 426.669L201.9 376.603L178.643 352.85L179.357 352.15L203.1 376.397Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="22"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Botón CTA */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 animate-fade-in-up">
          <a
            href="#membresias"
            className="inline-block px-10 py-4 bg-accent text-accent-foreground rounded-full hover:opacity-90 transition-all duration-300 shadow-2xl font-semibold text-lg hover:scale-105 hover:shadow-accent/50"
          >
            Explorar Membresías
          </a>
        </div>
      </header>

      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="inline-flex p-4 rounded-2xl bg-accent/10 text-accent mb-4 group-hover:scale-110 transition-transform duration-300">
              <Award size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Selección Premium</h3>
            <p className="text-muted-foreground">Vermuts cuidadosamente seleccionados de las mejores bodegas</p>
          </div>
          <div className="text-center group">
            <div className="inline-flex p-4 rounded-2xl bg-accent/10 text-accent mb-4 group-hover:scale-110 transition-transform duration-300">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Comunidad Exclusiva</h3>
            <p className="text-muted-foreground">Conecta con otros amantes del vermut en eventos únicos</p>
          </div>
          <div className="text-center group">
            <div className="inline-flex p-4 rounded-2xl bg-accent/10 text-accent mb-4 group-hover:scale-110 transition-transform duration-300">
              <Sparkles size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Experiencias Únicas</h3>
            <p className="text-muted-foreground">Catas, visitas a bodegas y contenido exclusivo mensual</p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <About />

      {/* CARRUSEL */}
      <GalleryCarousel />

      <section id="membresias" className="px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-5xl font-serif mb-4 text-foreground font-bold">Membresías</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Elige el plan perfecto para tu viaje sensorial
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Plan Clásico */}
          <div className="group p-8 rounded-3xl border-2 border-border bg-card hover:bg-card/80 text-card-foreground shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-2xl font-serif font-bold">Clásica</h4>
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl">🍷</div>
            </div>
            <p className="text-sm text-muted-foreground mb-6">Para quienes empiezan el ritual.</p>
            <div className="mb-8">
              <p className="text-4xl font-bold mb-1">$8.500</p>
              <p className="text-sm text-muted-foreground">por mes</p>
            </div>
            <ul className="space-y-3 text-sm mb-8">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">✓</span>
                <span>1 botella premium mensual</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">✓</span>
                <span>Recetario digital</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">✓</span>
                <span>Newsletter exclusivo</span>
              </li>
            </ul>
            <a
              href="#suscripcion"
              className="block text-center bg-accent/10 text-accent px-6 py-3 rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-300 font-semibold group-hover:scale-105"
            >
              Unirme
            </a>
          </div>

          <div className="group p-8 rounded-3xl border-2 border-accent bg-gradient-to-br from-card via-card to-accent/5 text-card-foreground shadow-2xl hover:shadow-accent/30 transition-all duration-300 transform md:scale-105 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold">
              POPULAR
            </div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-2xl font-serif font-bold">Premium</h4>
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-2xl">🥂</div>
            </div>
            <p className="text-sm text-muted-foreground mb-6">Ideal para los curiosos del sabor.</p>
            <div className="mb-8">
              <p className="text-4xl font-bold mb-1">$12.500</p>
              <p className="text-sm text-muted-foreground">por mes</p>
            </div>
            <ul className="space-y-3 text-sm mb-8">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">✓</span>
                <span>2 botellas seleccionadas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">✓</span>
                <span>Acceso a catas mensuales</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">✓</span>
                <span>Descuentos exclusivos</span>
              </li>
            </ul>
            <a
              href="#suscripcion"
              className="block text-center bg-accent text-accent-foreground px-6 py-3 rounded-full hover:opacity-90 transition-all duration-300 font-semibold shadow-lg group-hover:scale-105"
            >
              Unirme
            </a>
          </div>

          {/* Plan Elite */}
          <div className="group p-8 rounded-3xl border-2 border-border bg-card hover:bg-card/80 text-card-foreground shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-2xl font-serif font-bold">Elite</h4>
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl">👑</div>
            </div>
            <p className="text-sm text-muted-foreground mb-6">La experiencia más completa.</p>
            <div className="mb-8">
              <p className="text-4xl font-bold mb-1">$22.500</p>
              <p className="text-sm text-muted-foreground">por mes</p>
            </div>
            <ul className="space-y-3 text-sm mb-8">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">✓</span>
                <span>3 botellas ultra premium</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">✓</span>
                <span>Acceso total a eventos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">✓</span>
                <span>Visita a bodegas</span>
              </li>
            </ul>
            <a
              href="#suscripcion"
              className="block text-center bg-accent/10 text-accent px-6 py-3 rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-300 font-semibold group-hover:scale-105"
            >
              Unirme
            </a>
          </div>
        </div>
      </section>

      {/* FORM */}
      <div id="suscripcion" className="pt-10">
        <SubscriptionForm />
      </div>

      <footer className="text-center py-16 text-muted-foreground border-t border-border mt-24">
        <p className="font-brand text-xl mb-1 tracking-wider">VERMOOD</p>
        <p className="text-xs font-tagline mb-3">el club del Vermú</p>
        <p className="text-sm">© {new Date().getFullYear()} • Todos los derechos reservados</p>
      </footer>
    </div>
  )
}
