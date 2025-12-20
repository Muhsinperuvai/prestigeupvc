import { Shield, Droplets, Volume2, Thermometer } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Superior Quality",
    description: "Built with premium grade uPVC materials that resist warping, fading, and corrosion for decades.",
  },
  {
    icon: Thermometer,
    title: "Energy Efficient",
    description: "Multi-chamber profiles and advanced sealing technology provide excellent thermal insulation.",
  },
  {
    icon: Droplets,
    title: "Weather Resistant",
    description: "Engineered to withstand extreme weather conditions while maintaining peak performance.",
  },
  {
    icon: Volume2,
    title: "Noise Reduction",
    description: "Double-glazed options reduce external noise by up to 35dB for a peaceful environment.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Why Choose Us</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-balance">
            Built for Excellence
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 rounded-lg border border-border bg-card hover:bg-secondary transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
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
