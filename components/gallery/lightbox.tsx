"use client"

import { useEffect } from "react"
import { X, MapPin, ChevronLeft, ChevronRight } from "lucide-react"

interface LightboxProps {
  image: {
    id: number
    title: string
    location: string
    image: string
  }
  onClose: () => void
  onPrevious?: () => void
  onNext?: () => void
  hasPrevious?: boolean
  hasNext?: boolean
}

export function Lightbox({ image, onClose, onPrevious, onNext, hasPrevious, hasNext }: LightboxProps) {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft" && hasPrevious && onPrevious) onPrevious()
      if (e.key === "ArrowRight" && hasNext && onNext) onNext()
    }
    document.addEventListener("keydown", handleKeydown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeydown)
      document.body.style.overflow = ""
    }
  }, [onClose, onPrevious, onNext, hasPrevious, hasNext])

  return (
    <div className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4" onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors"
        aria-label="Close lightbox"
      >
        <X className="h-8 w-8" />
      </button>

      {hasPrevious && onPrevious && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPrevious()
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors bg-black/30 hover:bg-black/50 rounded-full p-2"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
      )}

      {hasNext && onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors bg-black/30 hover:bg-black/50 rounded-full p-2"
          aria-label="Next image"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      )}

      <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
        <img
          src={image.image || "/placeholder.svg"}
          alt={image.title}
          className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
        />
        <div className="mt-4 text-white text-center">
          <h3 className="font-serif text-xl font-semibold">{image.title}</h3>
          <p className="flex items-center justify-center text-sm text-white/80 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            {image.location}
          </p>
        </div>
      </div>
    </div>
  )
}
