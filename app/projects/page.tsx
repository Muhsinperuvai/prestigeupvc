"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/home/cta-section"
import { MapPin, Home, Maximize2, Building2, Calendar, CheckCircle2 } from "lucide-react"

const videoProjects = [
  {
    id: "video-1",
    title: "SG Palya, Taverekere Main Road",
    location: "Bangalore",
    description: "Complete uPVC window installation for a residential project in SG Palya, Taverekere Main Road.",
    videoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SG%20Palya%2CTaverekere%20Main%20Road%20-%20project-tJ6DMrWS8mK1aqPARaJnz5DnsbwqEs.mp4",
  },
  {
    id: "video-2",
    title: "Kadubeesanahalli Project",
    location: "Bangalore",
    description: "Premium uPVC windows and doors installation at Kadubeesanahalli residential project.",
    videoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kadubeesanahalli%20-project-1nJoXI6uo2OEH7E5h8wJvfMsP64F8a.mp4",
  },
]

interface Project {
  id: number
  title: string
  location: string
  category: string
  description: string
  image: string
  featured?: boolean
  details?: {
    configuration?: string
    plotArea?: string
    unitSizes?: string
    totalUnits?: string
    floors?: string
  }
  windowSpecs?: {
    type?: string
    features?: string[]
  }
  gallery?: string[]
}

const projects: Project[] = [
  {
    "id": 1,
    "title": "Soulace by Modern Spaaces",
    "location": "Off Sarjapur Road, Bangalore",
    "category": "Residential",
    "description": "Premium 266 Independent Villas featuring exquisitely crafted homes with world-class amenities, private elevators, and UPVC sliding windows throughout.",
    "image": "/projects/1.jpg",
    "featured": true,
    "details": {
      "configuration": "4 & 5 BHK Villas",
      "plotArea": "26.5 Acres",
      "unitSizes": "3387 to 4235 Sq.ft",
      "totalUnits": "266 Villas",
      "floors": "G + 2"
    },
    "windowSpecs": {
      "type": "UPVC Sliding Windows",
      "features": [
        "Provision for mosquito mesh shutter",
        "Peripheral windows with 750mm sill height",
        "Cross ventilation windows",
        "Kitchen sliding UPVC without mesh",
        "Fixed ventilator windows in toilets",
        "UPVC sliding doors for balcony access"
      ]
    },
    "gallery": [
      "/projects/2.jpg",
      "/projects/3.jpg",
      "/projects/4.jpg",
      "/projects/5.jpg",
      "/projects/6.png"
    ]
  }
];

export default function ProjectsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const featuredProject = projects.find((p) => p.featured)
  const regularProjects = projects.filter((p) => !p.featured)

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-secondary">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Our Work</p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-balance">
                Featured Projects
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Explore our portfolio of completed projects showcasing premium uPVC windows and door installations across
                residential and commercial spaces.
              </p>
            </div>
          </div>
        </section>

        {featuredProject && (
          <section className="py-16 bg-background border-b border-border">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mb-8">
                <span className="inline-block px-3 py-1 text-xs uppercase tracking-wider bg-primary text-primary-foreground rounded-full mb-4">
                  Featured Project
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold">{featuredProject.title}</h2>
                <p className="mt-2 text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {featuredProject.location}
                </p>
              </div>

              {/* Main Image & Gallery */}
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <img
                    src={featuredProject.image || "/placeholder.svg"}
                    alt={featuredProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {featuredProject.gallery?.slice(1, 5).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className="aspect-[4/3] rounded-lg overflow-hidden group"
                    >
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`${featuredProject.title} gallery ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Details Grid */}
              

              {/* Window Specifications */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="font-serif text-2xl font-semibold mb-6">Window & Door Specifications</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm uppercase tracking-wider text-muted-foreground mb-3">Window Type</p>
                    <p className="text-xl font-semibold text-primary mb-6">{featuredProject.windowSpecs?.type}</p>
                    <p className="text-muted-foreground leading-relaxed">
                      All 266 villas feature premium UPVC sliding windows with superior thermal insulation, sound
                      reduction, and weather resistance - perfect for Bangalore&apos;s climate.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wider text-muted-foreground mb-3">Key Features</p>
                    <ul className="space-y-3">
                      {featuredProject.windowSpecs?.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              
            </div>
          </section>
        )}

        {videoProjects.length > 0 && (
          <section className="py-16 bg-secondary">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h2 className="font-serif text-2xl font-semibold mb-8">Project Videos</h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {videoProjects.map((video) => (
                  <article key={video.id} className="group bg-card rounded-lg border border-border overflow-hidden">
                    <div className="aspect-[8/11] relative overflow-hidden bg-muted">
                      <video
                        src={video.videoUrl}
                        controls
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {video.location}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-semibold">{video.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{video.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Projects Grid */}
        {regularProjects.length > 0 && (
          <section className="py-16 bg-background">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <h2 className="font-serif text-2xl font-semibold mb-8">More Projects</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularProjects.map((project) => (
                  <article key={project.id} className="group bg-card rounded-lg border border-border overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {project.location}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-semibold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTASection />
      </main>
      <Footer />

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-white/80 text-4xl"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
          <img
            src={selectedImage || "/placeholder.svg"}
            alt="Gallery image"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </>
  )
}
