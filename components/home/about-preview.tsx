import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function AboutPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src="/modern-factory-manufacturing-upvc-windows-industri.jpg"
                alt="Prestige Windows Solution Factory"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-lg hidden lg:block">
              <p className="text-4xl font-serif font-semibold">10+</p>
              <p className="text-sm text-primary-foreground/80">Years Experience</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">About Us</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-balance">
              Crafting Excellence in Every Frame
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              At Prestige Windows Solution, we combine cutting-edge technology with traditional craftsmanship to deliver
              premium uPVC windows and doors. Our state-of-the-art manufacturing facility ensures every product meets
              the highest standards of quality and durability.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With over 10 years of experience, we have successfully completed thousands of residential and commercial
              projects, earning the trust of homeowners and businesses across the country.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center text-sm font-medium text-foreground hover:text-accent transition-colors group"
            >
              Learn More About Us
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
