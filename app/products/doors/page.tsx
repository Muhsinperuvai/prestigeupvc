import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { ProductCard } from "@/components/products/product-card"
import { ProductFeatures } from "@/components/products/product-features"

const doorProducts = [
  {
    id: "sliding-doors",
    title: "Sliding Doors",
    description: "Elegant sliding doors that maximize space and provide seamless indoor-outdoor connection.",
    image: "/upvc-sliding-door-modern-design-white-frame-large-.jpg",
    features: ["Smooth operation", "Large glass panels", "Space efficient", "Multi-track options"],
  },
  {
    id: "french-doors",
    title: "French Doors",
    description: "Classic double doors with timeless appeal, perfect for patios, balconies, and garden entrances.",
    image: "/upvc-french-door-modern-design-white-frame-elegant.jpg",
    features: ["Wide opening", "Elegant design", "Dual leaf operation", "Enhanced ventilation"],
  },
  
  {
    id: "patio-doors",
    title: "Patio Doors",
    description: "Transform your outdoor living space with our premium patio doors designed for durability and style.",
    image: "/upvc-patio-door-modern-design-white-frame-outdoor-.jpg",
    features: ["Large glass area", "Low threshold", "Easy access", "Weather resistant"],
  },
]

export default function DoorsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-secondary">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Products / Doors</p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-balance">
                Premium uPVC Doors
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Our doors combine security, energy efficiency, and elegant design to create the perfect entrance for
                your home or commercial space.
              </p>
            </div>
          </div>
        </section>

        {/* Product Gallery */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {doorProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <ProductFeatures isDoors />

        {/* Specifications */}
        <section className="py-24 bg-secondary">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold">Technical Specifications</h2>
              <p className="mt-4 text-muted-foreground">
                All our doors are manufactured to meet international quality and security standards.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full bg-card rounded-lg border border-border">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-4 font-semibold">Specification</th>
                    <th className="text-left px-6 py-4 font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { spec: "Frame Material", value: "Reinforced multi-chamber uPVC profile" },
                    { spec: "Glass Options", value: "Single, Double, Triple glazed with toughened glass" },
                    { spec: "Locking System", value: "Multi-point European locking mechanism" },
                    { spec: "Color Options", value: "White, Wood grain, Custom colors" },
                    { spec: "Warranty", value: "15 years on profile, 1 years on hardware" },
          
                  ].map((row, index) => (
                    <tr key={row.spec} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                      <td className="px-6 py-4 text-sm font-medium">{row.spec}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  )
}
