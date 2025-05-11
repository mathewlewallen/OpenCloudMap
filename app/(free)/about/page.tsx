"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Map, Layers, Plane, Users, ExternalLink } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Intro Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <motion.h1
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-4"
        >
          About Open Cloud Map
        </motion.h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Open Cloud Map is the free open-source aviation mapping platform built to empower the global aviation community. Access interactive maps, aviation data layers, flight planning tools, and more — all without hidden fees or restrictive licenses.
        </p>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold mb-8 text-center">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Card>
                <CardHeader className="text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Open Source Philosophy */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-16 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-2xl font-semibold mb-6">Why Open Source?</h2>
        <p className="text-muted-foreground">
          We believe critical aviation tools should be accessible to everyone. Open Cloud Map is fully open source so the global community can improve, contribute, and rely on it without vendor lock-in or paywalls.
        </p>
      </motion.section>

      {/* Who it's for */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mb-16 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-2xl font-semibold mb-6">Who is it for?</h2>
        <p className="text-muted-foreground mb-4">
          Open Cloud Map serves the global aviation community:
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li><span>• Pilots & Flight Planners</span></li>
          <li><span>• Drone & UAS Operators</span></li>
          <li><span>• Aviation Researchers & Educators</span></li>
          <li><span>• Developers & Data Scientists</span></li>
        </ul>
      </motion.section>

      {/* About You (personal brand) */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="mb-16 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-2xl font-semibold mb-6">Who am I?</h2>
        <p className="text-muted-foreground">
          I'm Mathew Lewallen, the creator of Open Cloud Map.{" "}<br/>
          Connect with me on{" "}
          <Link href="https://linkedin.com/in/mathewlewallen" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
            LinkedIn
          </Link>{" "}<ExternalLink className="inline h-4 w-4 mb-1" />{" "}
          or{" "}
          <Link href="https://github.com/mathewlewallen" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
            GitHub
          </Link>{" "}<ExternalLink className="inline h-4 w-4 mb-1" />{" "}
          or visit{" "}
          <Link href="https://mathewlewallen.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
            mathewlewallen.com
          </Link>{" "}<ExternalLink className="inline h-4 w-4 mb-1" />.
        </p>
      </motion.section>
    </div>
  )
}

const features = [
  {
    title: "Interactive Maps",
    description: "Explore dynamic global maps with aviation overlays and geospatial tools.",
    icon: <Map className="w-12 h-12 mx-auto text-primary" />,
  },
  {
    title: "Open Data Layers",
    description: "Access airspaces, airports, waypoints, and aviation datasets.",
    icon: <Layers className="w-12 h-12 mx-auto text-primary" />,
  },
  {
    title: "Flight Planning Tools",
    description: "Create, edit, and manage flight plans with visual routing tools.",
    icon: <Plane className="w-12 h-12 mx-auto text-primary" />,
  },
  {
    title: "Community Driven",
    description: "Open source by design. Contribute improvements and share knowledge.",
    icon: <Users className="w-12 h-12 mx-auto text-primary" />,
  },
]
