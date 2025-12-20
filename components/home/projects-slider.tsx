"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    id: 1,
    title: "Soulace by Modern Spaces",
    location: "Off Sarjapur Road, Bangalore",
    category: "Residential",
    image: "/projects/1.jpg",
  },
]

export function ProjectsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <section className="py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Featured Work</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-balance">Our Projects</h2>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={prevSlide} aria-label="Previous project">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextSlide} aria-label="Next project">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {projects.map((project) => (
              <div key={project.id} className="w-full flex-shrink-0 px-2">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="aspect-[4/3] overflow-hidden rounded-lg">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-4 lg:pl-8">
                    <span className="text-sm text-muted-foreground uppercase tracking-wider">{project.category}</span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-semibold">{project.title}</h3>
                    <p className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {project.location}
                    </p>
                    <Link
                      href="/projects"
                      className="inline-flex items-center text-sm font-medium hover:text-accent transition-colors group"
                    >
                      View Project Details
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-primary" : "bg-border"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" asChild>
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
