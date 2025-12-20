import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { ArrowRight } from "lucide-react"

const productCategories = [
  {
    title: "Windows",
    description:
      "Explore our comprehensive range of uPVC windows designed for optimal performance, durability, and aesthetic appeal.",
    image: "/upvc-windows-collection-various-styles-modern-arch.jpg",
    href: "/products/windows",
    products: ["Sliding Windows", "Casement Windows", "Fixed Windows", "Z-Type Louvers"],
  },
  {
    title: "Doors",
    description:
      "Premium uPVC doors that combine security, insulation, and elegant design for residential and commercial applications.",
    image: "/upvc-doors-collection-various-styles-elegant-entran.jpg",
    href: "/products/doors",
    products: ["Sliding Doors", "French Doors", "Entry Doors", "Patio Doors"],
  },
]

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-secondary">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Our Products</p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-balance">
                Premium uPVC Solutions for Every Space
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Discover our extensive range of high-quality uPVC windows and doors, engineered for performance and
                designed for beauty.
              </p>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="space-y-24">
              {productCategories.map((category, index) => (
                <div
                  key={category.title}
                  className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="aspect-[4/3] overflow-hidden rounded-lg">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <h2 className="font-serif text-3xl sm:text-4xl font-semibold">{category.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{category.description}</p>
                    <ul className="grid grid-cols-2 gap-3">
                      {category.products.map((product) => (
                        <li key={product} className="flex items-center text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                          {product}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={category.href}
                      className="inline-flex items-center text-sm font-medium hover:text-accent transition-colors group"
                    >
                      Explore {category.title}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-24 bg-secondary">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold">Why Choose uPVC?</h2>
              <p className="mt-4 text-muted-foreground">
                uPVC offers numerous advantages over traditional materials, making it the smart choice for modern homes
                and buildings.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Low Maintenance",
                  description: "Unlike wood, uPVC never needs painting and is easy to clean with just soap and water.",
                },
                {
                  title: "Energy Efficient",
                  description:
                    "Multi-chamber profiles provide excellent insulation, reducing heating and cooling costs.",
                },
                {
                  title: "Weather Resistant",
                  description: "Withstands extreme temperatures, UV rays, and heavy rainfall without degrading.",
                },
                {
                  title: "Sound Insulation",
                  description: "Double-glazed options significantly reduce external noise for a peaceful interior.",
                },
                {
                  title: "Security Features",
                  description: "Multi-point locking systems and reinforced frames provide enhanced security.",
                },
                {
                  title: "Eco-Friendly",
                  description: "100% recyclable material with a lower carbon footprint than aluminum or wood.",
                },
              ].map((benefit) => (
                <div key={benefit.title} className="p-6 bg-card rounded-lg border border-border">
                  <h3 className="font-semibold text-lg mb-3">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  )
}
