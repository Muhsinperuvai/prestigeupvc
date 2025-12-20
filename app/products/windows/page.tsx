import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { ProductCard } from "@/components/products/product-card"
import { ProductFeatures } from "@/components/products/product-features"

const windowProducts = [
  {
    id: "sliding",
    title: "Sliding Windows",
    description: "Space-saving design with smooth horizontal operation. Perfect for modern homes with limited space.",
    image: "/upvc-sliding-window-modern-design-white-frame-mini.jpg",
    features: ["Smooth gliding mechanism", "Multi-track options", "Fly mesh compatible", "Easy maintenance"],
  },
  {
    id: "casement",
    title: "Casement Windows",
    description: "Classic hinged design offering maximum ventilation and unobstructed views with superior sealing.",
    image: "/upvc-casement-window-modern-design-white-frame-ope.jpg",
    features: ["180° opening capability", "Multi-point locking", "Excellent ventilation", "Weather-tight sealing"],
  },
  {
    id: "fixed",
    title: "Fixed Windows",
    description: "Non-operable windows designed to maximize natural light and provide stunning views.",
    image: "/upvc-fixed-window-modern-design-white-frame-large-.jpg",
    features: ["Maximum glass area", "Superior insulation", "Custom shapes available", "Structural glazing option"],
  },
  {
    id: "louvers",
    title: "Z-Type Louvers",
    description:
      "Adjustable louver windows for controlled ventilation while maintaining privacy and weather protection.",
    image: "/upvc-louver-window-z-type-modern-design-white-fram.jpg",
    features: ["Adjustable angle control", "Rain protection", "Privacy maintained", "Optimal airflow"],
  },
  {
    id: "wooden-upvc-windows",
    title: "Wooden uPVC Windows",
    description: "Elegant wooden finish combined with the durability of uPVC for a classic look.",
    image: "windows/wooden.jpg",
    features: ["Wood grain finish", "Durable uPVC core", "Energy efficient", "Low maintenance"],
  },
  {
    id: "colored-upvc-windows",
    title: "Colored uPVC Windows",
    description: "Vibrant color options to match your style while maintaining the benefits of uPVC.",
    image: "windows/colored.jpg",
    features: ["Wide color range", "UV resistant finish", "Durable and low maintenance", "Customizable"],
  }
]

export default function WindowsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-secondary">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Products / Windows</p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-balance">
                Premium uPVC Windows
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Our windows combine cutting-edge technology with elegant design to deliver superior performance,
                durability, and aesthetic appeal for any space.
              </p>
            </div>
          </div>
        </section>

        {/* Product Gallery */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {windowProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <ProductFeatures />

        {/* Specifications */}
        <section className="py-24 bg-secondary">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold">Technical Specifications</h2>
              <p className="mt-4 text-muted-foreground">
                All our windows are manufactured to meet international quality standards.
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
                    { spec: "Frame Material", value: "Multi-chamber uPVC profile" },
                    { spec: "Glass Options", value: "Single, Double, Triple glazed (5mm-24mm)" },
                    { spec: "Hardware", value: "Premium European fittings" },
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
