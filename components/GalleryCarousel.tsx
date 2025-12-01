"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const images = [
  "/vermouth-glasses-elegant-setup.jpg",
  "/vermouth-bottles-collection.jpg",
  "/vermouth-tasting-event.jpg",
]

export default function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <section className="px-6 py-24 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-5xl font-serif mb-4 text-foreground font-bold">Nuestros Vermuts</h3>
          <p className="text-lg text-muted-foreground">Momentos únicos de nuestra comunidad</p>
        </div>

        <div className="relative group">
          <div className="overflow-hidden rounded-3xl shadow-2xl">
            <img
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`Gallery image ${currentIndex + 1}`}
              className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm text-foreground p-3 rounded-full shadow-xl hover:bg-accent hover:text-accent-foreground transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm text-foreground p-3 rounded-full shadow-xl hover:bg-accent hover:text-accent-foreground transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
            aria-label="Siguiente imagen"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-accent w-8" : "bg-border w-2 hover:bg-accent/50"
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
