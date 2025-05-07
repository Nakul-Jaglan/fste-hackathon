"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight, Plane, Train } from "lucide-react"
import { motion } from "framer-motion"

// Team member data
const teamMembers = [
  {
    name: "Nakul",
    role: "TBD",
    enrollmentNo: "2401010289",
    email: "nakul.2024@nst.rishihood.edu.in",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Aaryan Yadav",
    role: "TBD",
    enrollmentNo: "2401010011",
    email: "aaryan.yadav2024@nst.rishihood.edu.in",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Harshita Panwar",
    role: "TBD",
    enrollmentNo: "2403210006",
    email: "harshita.panwar2024@design.rishihood.edu.in",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Divyanshi Gupta",
    role: "TBD",
    enrollmentNo: "2404310005",
    email: "divyanshi.gupta2024@psy.rishihood.edu.in",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Shagun",
    role: "TBD",
    enrollmentNo: "4202130018",
    email: "shagun.2024@makers.rishihood.edu.in",
    image: "/placeholder.svg?height=200&width=200",
  },
]

// Feature grid data
const features = [
  {
    title: "CLD",
    description: "Causal Loop Diagram",
    icon: (
      <div className="w-12 h-12 rounded-full bg-[#A71930]/10 flex items-center justify-center text-[#A71930]">CLD</div>
    ),
    link: "/cld",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    title: "BOT",
    description: "Behavior Over Time",
    icon: (
      <div className="w-12 h-12 rounded-full bg-[#A71930]/10 flex items-center justify-center text-[#A71930]">BOT</div>
    ),
    link: "/bot",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    title: "SFD",
    description: "Stock & Flow Diagram",
    icon: (
      <div className="w-12 h-12 rounded-full bg-[#A71930]/10 flex items-center justify-center text-[#A71930]">SFD</div>
    ),
    link: "/sfd",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    title: "Real-Time Pulse",
    description: "Live Transport Dashboard",
    icon: (
      <div className="w-12 h-12 rounded-full bg-[#A71930]/10 flex items-center justify-center text-[#A71930]">RT</div>
    ),
    link: "/dashboard",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-gray-50 py-20 md:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Boom in Air, Bust in Rail
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              A systems thinking approach to understanding transport dynamics in Tier 2-3 cities
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button asChild size="lg" className="bg-[#A71930] hover:bg-[#8a1428] text-white">
                <Link href="#features">
                  Explore the System <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Background SVG */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2">
            <Plane className="w-32 h-32 text-[#A71930]" />
          </div>
          <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2">
            <Train className="w-32 h-32 text-gray-400" />
          </div>
        </div>
      </section>

      {/* About the Project Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding the Shift in Tier 2-3 Transport</h2>
            <p className="text-lg text-gray-600 mb-6">
              India's transportation landscape is undergoing a significant transformation. While domestic air travel is
              booming in Tier 2-3 cities, rail travel is experiencing a decline. This shift has profound implications
              for connectivity, economic development, and environmental sustainability.
            </p>
            <p className="text-lg text-gray-600">
              Using systems thinking methodologies, our team has analyzed the complex interrelationships between various
              factors driving this change. By mapping causal loops, behavior over time, and stock and flow dynamics,
              we've identified key leverage points and potential interventions to create a more balanced transportation
              ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Explore Our Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Link
                href={feature.link}
                key={index}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                scroll={true}
              >
                <motion.div
                  className="relative overflow-hidden rounded-xl shadow-md h-64 group cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-white/80 mb-4">{feature.description}</p>
                    <div className="flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Explore <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Team 107</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative h-48 w-full">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-[#A71930] text-sm mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-1">ID: {member.enrollmentNo}</p>
                  <p className="text-gray-600 text-sm truncate">{member.email}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
