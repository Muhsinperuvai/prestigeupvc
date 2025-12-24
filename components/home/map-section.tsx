export function MapSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">Visit Our Factory</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Come experience our premium uPVC windows and doors in person. Our team is ready to help you find the perfect
            solution.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg border border-border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.2847654532394!2d77.7770713!3d12.8074805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae735860374e9f%3A0xb2d5215a19867cb1!2sPrestige%20Windows%20Solution!5e0!3m2!1sen!2sin!4v1702700000000!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Prestige Windows Solution Location"
            className="w-full"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-card rounded-xl border border-border">
            <h3 className="font-semibold text-foreground mb-2">Address</h3>
            <p className="text-sm text-muted-foreground">
              Prestige Windows Solution
              <br />
              Ground Floor, 313/5, Sarjapura - Attibele Rd,
              <br />
              near BRS Global School, Bidaraguppe,
              <br />
              Bangalore, Karnataka - 562107
            </p>
          </div>
          <div className="p-6 bg-card rounded-xl border border-border">
            <h3 className="font-semibold text-foreground mb-2">Working Hours</h3>
            <p className="text-sm text-muted-foreground">
              Mon - Sat: 9:00 AM - 6:00 PM
              <br />
              Sunday: Closed
            </p>
          </div>
          <div className="p-6 bg-card rounded-xl border border-border">
            <h3 className="font-semibold text-foreground mb-2">Contact</h3>
            <p className="text-sm text-muted-foreground">
              <a href="tel:+918971055607" className="hover:text-foreground">
                +91 89710 55607
              </a>
              <br />
              <a href="tel:+917975947402" className="hover:text-foreground">
                +91 79759 47402
              </a>
              <br />
              <a href="mailto:mmiebangalore2023@gmail.com" className="hover:text-foreground">
                mmiebangalore2023@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
