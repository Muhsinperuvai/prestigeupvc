import { Shield, Thermometer, Palette, Wrench } from "lucide-react"

const windowFeatures = [
  {
    icon: Shield,
    title: "Premium Quality",
    description: "Manufactured using top-grade uPVC profiles from leading European suppliers.",
  },
  {
    icon: Thermometer,
    title: "Thermal Efficiency",
    description: "Multi-chamber design provides excellent insulation, keeping interiors comfortable year-round.",
  },
  {
    icon: Palette,
    title: "Custom Finishes",
    description: "Available in a wide range of colors and wood-grain finishes to match any architectural style.",
  },
  {
    icon: Wrench,
    title: "Easy Maintenance",
    description: "Simple cleaning with soap and water keeps your windows looking new for decades.",
  },
]

const doorFeatures = [
  {
    icon: Shield,
    title: "Enhanced Security",
    description: "Multi-point locking systems and reinforced frames for maximum protection.",
  },
  {
    icon: Thermometer,
    title: "Superior Insulation",
    description: "Advanced sealing technology keeps your space comfortable while reducing energy costs.",
  },
  {
    icon: Palette,
    title: "Elegant Designs",
    description: "Wide range of styles and finishes to complement your home aesthetic.",
  },
  {
    icon: Wrench,
    title: "Low Maintenance",
    description: "Durable construction requires minimal upkeep, saving you time and money.",
  },
]

export function ProductFeatures({ isDoors = false }: { isDoors?: boolean }) {
  const features = isDoors ? doorFeatures : windowFeatures

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold">Key Features</h2>
          <p className="mt-4 text-muted-foreground">
            Every {isDoors ? "door" : "window"} is engineered for performance and built to last.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-3">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
