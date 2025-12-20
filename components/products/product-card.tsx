"use client"

import { useState } from "react"
import { CheckCircle } from "lucide-react"

interface Product {
  id: string
  title: string
  description: string
  image: string
  features: string[]
}

export function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      id={product.id}
      className="group bg-card rounded-lg border border-border overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />
        <div
          className={`absolute inset-0 bg-foreground/60 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-white font-medium">View Details</span>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <h3 className="font-serif text-xl font-semibold">{product.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
        <ul className="space-y-2">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-center text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
