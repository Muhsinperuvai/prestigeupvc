import Link from "next/link"
import { Facebook, Instagram, Youtube, MessageCircle } from "lucide-react"
import { contactData } from "@/lib/contact-data"

const footerLinks = {
  products: [
    { name: "Sliding Windows", href: "/products/windows#sliding" },
    { name: "Casement Windows", href: "/products/windows#casement" },
    { name: "Fixed Windows", href: "/products/windows#fixed" },
    { name: "uPVC Doors", href: "/products/doors" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Projects", href: "/projects" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ],
  contact: [
    { name: "Get a Quote", href: "/contact" },
    ...contactData.phones.map((phone) => ({
      name: phone,
      href: `https://wa.me/${phone.replace(/\s/g, "")}`,
    })),
  ],
}

const socialLinks = [
  ...contactData.phones.map((phone) => ({
    name: phone,
    icon: MessageCircle,
    href: `https://wa.me/${phone.replace(/\s/g, "")}`,
  })),
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/share/14LKEfjNok1/" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/m_minteriors_exteriors_2023/" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/@mereenaandmanuelinteriorsandex?si=QH-Toj2SOUrXG_Dw" },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-3xl font-bold">PWS</span>
              <span className="text-xs uppercase tracking-[0.15em] text-primary-foreground/70">
                Prestige Windows Solution
              </span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Premium uPVC windows and door solutions for homes and commercial spaces. Quality craftsmanship since 2016.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact - Updated all contact details */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              {footerLinks.contact.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <p className="text-center text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Prestige Windows Solution. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
