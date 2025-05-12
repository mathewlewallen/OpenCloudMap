import { Metadata } from "next"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { Contact } from "@/components/forms/contact"
import { Button } from "@/components/ui/button"
import { MailIcon } from "lucide-react"

export const metadata: Metadata = {
  title: `Contact | ${siteConfig.name}`,
  description:
    "Have questions or feedback? Reach out to the Open Cloud Map team via our contact form or other channels.",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      {/* Header */}
      <header className="max-w-2xl mx-auto text-center space-y-4">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-primary"
        >
          <Icons.logo className="h-8 w-8" />
          <span className="text-2xl font-bold">{siteConfig.name}</span>
        </Link>
        <h1 className="text-4xl font-extrabold">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          Questions, feedback or want to say hi? Fill out the form or use one
          of our direct channels below.
        </p>
      </header>

      {/* Main content */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
        {/* Contact form */}
        <section aria-labelledby="contact-form-heading">
          <h2 id="contact-form-heading" className="sr-only">
            Contact Form
          </h2>
          <Contact />
        </section>

        {/* Contact info */}
        <aside className="space-y-10">
          {/* Email */}
          <div className="flex items-start space-x-4">
            <MailIcon className="h-6 w-6 text-primary" />
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p>
                <a
                  href="mailto:mathewlewallen@gmail.com"
                  className="text-primary hover:underline"
                >
                  mathewlewallen@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Follow Me</h3>
            <div className="flex space-x-4">
              <Button asChild variant="ghost" size="icon">
                <Link href={siteConfig.links.github}>
                  <Icons.github className="h-10 w-10" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <Link href={siteConfig.links.linkedin}>
                  <Icons.linkedin className="h-10 w-10" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
