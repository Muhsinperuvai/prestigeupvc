"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { Lightbox } from "@/components/gallery/lightbox"

const galleryImages = [
  {
    id: 1,
    image: "/gallery/WhatsApp Image 2025-12-11 at 9.21.43 PM.jpeg",
  },
  {
    id: 2,
    image: "/gallery/WhatsApp Image 2025-12-11 at 9.21.45 PM.jpeg",
  },
  {
    id: 3,
    image: "/gallery/WhatsApp Image 2025-12-11 at 9.21.50 PM.jpeg",
  },
  {
    id: 4,
    image: "/gallery/WhatsApp Image 2025-12-11 at 9.21.52 PM.jpeg",
  },
  {
    id: 5,
    image: "/gallery/WhatsApp Image 2025-12-12 at 8.33.08 AM.jpeg",
  },
  {
    id: 6,
    image: "/gallery/PREMIUM_uPVC WINDOWS & DOORS_page-0007.jpg",
  },
  {
    id: 7,
    image: "/gallery/PREMIUM_uPVC WINDOWS & DOORS_page-0008.jpg",
  },
  {
    id: 9,
    image: "/gallery/PREMIUM_uPVC WINDOWS & DOORS_page-0010.jpg",
  },
  {
    id: 10,
    image: "/gallery/PREMIUM_uPVC WINDOWS & DOORS_page-0011.jpg",
  },
  {
    id: 11,
    image: "/gallery/WhatsApp Image 2025-12-18 at 8.29.45 PM.jpeg",
  },
  {
    id: 12,
    image: "/gallery/WhatsApp Image 2025-12-18 at 8.29.45 PM (1).jpeg",
  },
  {
    id: 13,
    image: "/gallery/431607756_1094988434980015_542272474209615699_n.jpg",
  },
  {
    id: 14,
    image: "/gallery/431659884_1524305801746885_7258048315484806945_n.jpg",
  },
  {
    id: 15,
    image: "/gallery/431781135_1094438675203051_459644770756897414_n.jpg",
  },
  {
    id: 16,
    image: "/gallery/431830505_1090622442238244_8911881021551523771_n.jpg",
  },
  {
    id: 17,
    image: "/gallery/470899536_1126936005775538_8271675307820227924_n.jpg",
  },
  {
    id: 18,
    image: "/gallery/470899580_1334418090919626_3247074714589598748_n.jpg",
  },
  {
    id: 20,
    image: "/gallery/470937437_1797027417731122_8922666282614541397_n.jpg",
  },
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null)

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-secondary">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Gallery</p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-balance">
                Our Work in Pictures
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Browse through our gallery of completed installations. Each image showcases our commitment to quality
                and craftsmanship.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Grid - Removed location filter section */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className={`group relative overflow-hidden rounded-lg ${
                    index % 5 === 0 ? "col-span-2 row-span-2" : ""
                  }`}
                >
                  <div className={`${index % 5 === 0 ? "aspect-square" : "aspect-[4/3]"}`}>
                    <img
                      src={image.image || "/placeholder.svg"}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-end justify-start p-4">
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {selectedImage && <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />}

        <CTASection />
      </main>
      <Footer />
    </>
  )
}
