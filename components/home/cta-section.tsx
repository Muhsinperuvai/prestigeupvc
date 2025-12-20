import Link from "next/link"
import { ArrowRight, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { contactData } from "@/lib/contact-data"

export function CTASection() {
  const primaryPhone = contactData.phones[0] || ""
  const whatsappLink = `https://wa.me/${primaryPhone.replace(/\s/g, "")}`

  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 text-balance">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Get in touch with our experts for a free consultation and quote. We are here to help you find the perfect
            windows and door solution.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-white text-foreground hover:bg-white/90 min-w-[180px]" asChild>
              <Link href="/contact">
                Get a Free Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 min-w-[180px] bg-transparent"
              asChild
            >
              <a href={`tel:${primaryPhone}`}>
                <Phone className="mr-2 h-4 w-4" />
                Call Us Now
              </a>
            </Button>
          </div>
          <div className="mt-8">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Or chat with us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
