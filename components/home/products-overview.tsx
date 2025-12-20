import Link from "next/link"
import { ArrowRight } from "lucide-react"

const products = [
  {
    title: "Windows",
    description: "Sliding, casement, fixed, and louver windows designed for optimal performance and aesthetics.",
    image: "/modern-upvc-sliding-window-white-frame-minimalist.jpg",
    href: "/products/windows",
  },
  {
    title: "Doors",
    description: "Premium uPVC doors combining security, insulation, and elegant design for every space.",
    image: "/modern-upvc-door-white-frame-elegant-entrance.jpg",
    href: "/products/doors",
  },
]

export function ProductsOverview() {
  return (
    <section className="py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Our Products</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-balance">
            Premium Solutions for Every Need
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product) => (
            <Link key={product.title} href={product.href} className="group relative overflow-hidden rounded-lg bg-card">
              <div className="aspect-[6/5] overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white mb-2">{product.title}</h3>
                <p className="text-white/80 text-sm mb-4 max-w-md">{product.description}</p>
                <span className="inline-flex items-center text-sm font-medium text-white group-hover:gap-2 transition-all">
                  Explore {product.title}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
