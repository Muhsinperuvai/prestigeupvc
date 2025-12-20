import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { AboutPreview } from "@/components/home/about-preview"
import { ProductsOverview } from "@/components/home/products-overview"
import { FeaturesSection } from "@/components/home/features-section"
import { ProjectsSlider } from "@/components/home/projects-slider"
import { CTASection } from "@/components/home/cta-section"
import { MapSection } from "@/components/home/map-section"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutPreview />
        <ProductsOverview />
        <FeaturesSection />
        <ProjectsSlider />
        <MapSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
