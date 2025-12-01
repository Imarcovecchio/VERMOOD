export default function About() {
  return (
    <section id="about" className="px-6 py-24 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-5xl font-serif mb-6 text-foreground font-bold leading-tight">Sobre VermutClub</h3>
          <div className="w-20 h-1 bg-accent rounded-full mb-8" />
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
          <p>
            VermutClub es una comunidad selecta dedicada a los amantes del vermut. Exploramos las mejores bodegas,
            descubrimos sabores únicos y creamos experiencias memorables alrededor de esta bebida ancestral.
          </p>
          <p>
            Cada mes, nuestros miembros reciben una selección cuidadosamente curada de vermuts premium, junto con acceso
            exclusivo a catas, eventos y contenido educativo sobre el arte de esta bebida milenaria.
          </p>
        </div>
      </div>
    </section>
  )
}
