import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckCircle, Award, Users, Building } from "lucide-react"

const stats = [
  { label: "Years Experience", value: "10+" },
  { label: "Projects Completed", value: "100+" },
  { label: "Customers", value: "150+" },
]

const values = [
  {
    icon: CheckCircle,
    title: "Quality First",
    description:
      "We never compromise on quality. Every product undergoes rigorous testing to meet international standards.",
  },
  {
    icon: Award,
    title: "Innovation",
    description: "Continuously adopting the latest technologies and materials to deliver superior products.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Your satisfaction is our priority. We provide personalized solutions tailored to your needs.",
  },
  {
    icon: Building,
    title: "Sustainability",
    description: "Committed to eco-friendly practices and energy-efficient solutions for a greener future.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-secondary">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">About Us</p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-balance">
                Crafting Premium Windows Solution Since 2016
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Prestige Windows Solution is a leading manufacturer and installer of premium uPVC windows and doors,
                dedicated to transforming spaces with quality craftsmanship.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-3 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-4xl sm:text-5xl font-semibold">{stat.value}</p>
                  <p className="mt-2 text-sm text-primary-foreground/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="space-y-6">
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold">Our Story</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Founded in 2016, Prestige Windows Solution began with a simple mission: to provide homeowners and
                  businesses with high-quality, energy-efficient windows and door solutions that stand the test of time.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  What started as a small workshop has grown into a state-of-the-art manufacturing facility equipped
                  with the latest German technology. Our commitment to excellence has earned us the trust of hundreds of
                  clients across the country.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, we continue to innovate and expand our product range while maintaining the personalized service
                  and attention to detail that has been our hallmark since day one.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
