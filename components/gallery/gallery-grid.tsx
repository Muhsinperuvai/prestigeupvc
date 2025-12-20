"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"
import { Lightbox } from "./lightbox"

// Declare GalleryGridProps and GalleryImage types
interface GalleryGridProps {
  images: GalleryImage[]
}

interface GalleryImage {
  id: string
  image: string
  title: string
  location: string
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const currentIndex = selectedImage ? images.findIndex((img) => img.id === selectedImage.id) : -1

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSelectedImage(images[currentIndex - 1])
    }
  }

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setSelectedImage(images[currentIndex + 1])
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="group cursor-pointer overflow-hidden rounded-lg bg-muted"
            onClick={() => setSelectedImage(image)}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={image.image || "/placeholder.svg"}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="font-serif text-lg font-semibold text-foreground">{image.title}</h3>
              <p className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {image.location}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <Lightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={currentIndex > 0}
          hasNext={currentIndex < images.length - 1}
        />
      )}
    </>
  )
}
