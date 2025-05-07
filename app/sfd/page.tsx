"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Download, ZoomIn, ZoomOut, RotateCw } from "lucide-react"
import { motion } from "framer-motion"

export default function SFDPage() {
  const [zoomLevel, setZoomLevel] = useState(1)

  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 5))
  }

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5))
  }

  const resetZoom = () => {
    setZoomLevel(1)
  }

  const downloadModel = () => {
    // Create a link to download the MDL file
    const link = document.createElement("a")
    link.href = "/sfd-model-107.mdl"
    link.download = "stock-flow-diagram.mdl"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Stock & Flow Diagram</h1>
        <p className="text-gray-600 text-center mb-8">
          Modeling the system structure of transportation dynamics in Tier 2-3 cities
        </p>

        <Tabs defaultValue="diagram" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="diagram">SFD Diagram</TabsTrigger>
            <TabsTrigger value="explanation">Explanation</TabsTrigger>
            <TabsTrigger value="leverage">Leverage Points</TabsTrigger>
          </TabsList>

          <TabsContent value="diagram" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-end space-x-2 mb-4">
                  <Button variant="outline" size="sm" onClick={zoomIn}>
                    <ZoomIn className="h-4 w-4 mr-1" /> Zoom In
                  </Button>
                  <Button variant="outline" size="sm" onClick={zoomOut}>
                    <ZoomOut className="h-4 w-4 mr-1" /> Zoom Out
                  </Button>
                  <Button variant="outline" size="sm" onClick={resetZoom}>
                    <RotateCw className="h-4 w-4 mr-1" /> Reset
                  </Button>
                </div>

                <div className="relative w-full h-[500px] border rounded-lg overflow-hidden bg-white">
                  <div
                    style={{
                      transform: `scale(${zoomLevel})`,
                      transformOrigin: "center",
                      transition: "transform 0.3s ease",
                    }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src="/sfd.jpeg?height=800&width=800"
                      alt="Stock and Flow Diagram"
                      width={800}
                      height={800}
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <Button onClick={downloadModel} className="bg-[#A71930] hover:bg-[#8a1428] text-white">
                    <Download className="mr-2 h-4 w-4" /> Download Model (.mdl)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="explanation" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Understanding the Stock & Flow Diagram</h3>
                <p className="mb-4">
                  A Stock and Flow Diagram (SFD) is a quantitative model that represents how resources accumulate
                  (stocks) and move (flows) through a system over time. Unlike the CLD, which shows causal
                  relationships, the SFD allows us to simulate and quantify the behavior of the system.
                </p>

                <h4 className="text-lg font-semibold mb-2">Key Components in Our SFD:</h4>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="stocks">
                    <AccordionTrigger className="font-medium">Stocks (Rectangles)</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <strong>Air Passengers:</strong> The number of people traveling by air in Tier 2-3 cities.
                        </li>
                        <li>
                          <strong>Rail Passengers:</strong> The number of people traveling by rail in Tier 2-3 cities.
                        </li>
                        <li>
                          <strong>Air Infrastructure:</strong> The capacity and quality of airports and air services.
                        </li>
                        <li>
                          <strong>Rail Infrastructure:</strong> The capacity and quality of railway stations and train
                          services.
                        </li>
                        <li>
                          <strong>Economic Development:</strong> The level of economic growth in Tier 2-3 cities.
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="flows">
                    <AccordionTrigger className="font-medium">Flows (Pipes with Valves)</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <strong>Air Travel Adoption Rate:</strong> The rate at which people start using air travel.
                        </li>
                        <li>
                          <strong>Rail Travel Adoption Rate:</strong> The rate at which people start using rail travel.
                        </li>
                        <li>
                          <strong>Air Travel Abandonment Rate:</strong> The rate at which people stop using air travel.
                        </li>
                        <li>
                          <strong>Rail Travel Abandonment Rate:</strong> The rate at which people stop using rail
                          travel.
                        </li>
                        <li>
                          <strong>Infrastructure Development Rate:</strong> The rate of building new infrastructure.
                        </li>
                        <li>
                          <strong>Infrastructure Deterioration Rate:</strong> The rate at which infrastructure quality
                          declines.
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="converters">
                    <AccordionTrigger className="font-medium">Converters (Circles)</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <strong>Ticket Prices:</strong> The cost of travel by air and rail.
                        </li>
                        <li>
                          <strong>Travel Time:</strong> The duration of journeys by air and rail.
                        </li>
                        <li>
                          <strong>Service Quality:</strong> The perceived quality of air and rail services.
                        </li>
                        <li>
                          <strong>Government Policies:</strong> Initiatives like UDAN for air travel and railway
                          modernization.
                        </li>
                        <li>
                          <strong>Disposable Income:</strong> The amount of money people have available for travel.
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-2">How to Read the SFD:</h4>
                  <p className="mb-2">
                    The SFD shows how passengers flow between different modes of transport based on various factors. For
                    example:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      As air infrastructure improves, the air travel adoption rate increases, leading to more air
                      passengers.
                    </li>
                    <li>
                      As rail service quality decreases, the rail travel abandonment rate increases, leading to fewer
                      rail passengers.
                    </li>
                    <li>
                      Economic development affects disposable income, which influences ticket price sensitivity and
                      travel mode choice.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leverage" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Leverage Points for Intervention</h3>
                <p className="mb-4">
                  Based on our Stock and Flow model, we've identified several high-impact leverage points where
                  interventions could help create a more balanced transportation ecosystem:
                </p>

                <div className="space-y-6">
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="text-lg font-semibold text-[#A71930] mb-2">1. Rail Service Quality Improvement</h4>
                    <p className="mb-2">
                      Our model shows that rail service quality has a significant impact on passenger retention.
                      Investing in:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Modern train coaches with improved amenities</li>
                      <li>Reducing delays and improving punctuality</li>
                      <li>Streamlining booking and ticketing systems</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-600">
                      <strong>Impact:</strong> A 20% improvement in service quality could reduce rail abandonment rates
                      by up to 35% according to our simulations.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="text-lg font-semibold text-[#A71930] mb-2">2. Integrated Multi-modal Transport</h4>
                    <p className="mb-2">
                      Creating seamless connections between air and rail services can optimize the strengths of both
                      modes:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Rail connections to airports from city centers</li>
                      <li>Integrated ticketing across transport modes</li>
                      <li>Coordinated scheduling between trains and flights</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-600">
                      <strong>Impact:</strong> This approach could increase overall system efficiency by 25% while
                      reducing environmental impact.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="text-lg font-semibold text-[#A71930] mb-2">3. Balanced Infrastructure Investment</h4>
                    <p className="mb-2">
                      Current investment patterns heavily favor air infrastructure. A more balanced approach would
                      include:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>High-speed rail corridors between Tier 2-3 cities</li>
                      <li>Modernization of railway stations</li>
                      <li>Strategic expansion of both air and rail capacity</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-600">
                      <strong>Impact:</strong> Balanced investment could create a 40% more sustainable transport system
                      while still meeting growing mobility needs.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="text-lg font-semibold text-[#A71930] mb-2">4. Dynamic Pricing Strategies</h4>
                    <p className="mb-2">Price sensitivity is a major factor in mode choice. Implementing:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Demand-based pricing for both modes</li>
                      <li>Loyalty programs that work across transport modes</li>
                      <li>Subsidies for environmentally efficient travel choices</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-600">
                      <strong>Impact:</strong> Smart pricing could optimize capacity utilization by up to 30% across
                      both modes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
