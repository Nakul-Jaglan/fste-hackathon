"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, ZoomIn, ZoomOut, RotateCw } from "lucide-react"
import { motion } from "framer-motion"

export default function CLDPage() {
  const [zoomLevel, setZoomLevel] = useState(1)

  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.1, 2))
  }

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.5))
  }

  const resetZoom = () => {
    setZoomLevel(1)
  }

  const downloadModel = () => {
    // Create a link to download the MDL file
    const link = document.createElement("a")
    link.href = "/models/causal-loop-diagram.mdl"
    link.download = "causal-loop-diagram.mdl"
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
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Causal Loop Diagram</h1>
        <p className="text-gray-600 text-center mb-8">
          Visualizing the interconnected factors affecting air and rail travel in Tier 2-3 cities
        </p>

        <Tabs defaultValue="diagram" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="diagram">CLD Diagram</TabsTrigger>
            <TabsTrigger value="explanation">Explanation</TabsTrigger>
            <TabsTrigger value="feedback">Feedback Loops</TabsTrigger>
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
                      src="/placeholder.svg?height=800&width=800"
                      alt="Causal Loop Diagram"
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
                <h3 className="text-xl font-bold mb-4">Understanding the CLD</h3>
                <p className="mb-4">
                  A Causal Loop Diagram (CLD) is a visual representation of how different variables in a system are
                  interrelated. The arrows between variables indicate causal relationships, while the signs (+ or -)
                  show whether the relationships are positive or negative.
                </p>

                <h4 className="text-lg font-semibold mb-2">Key Components in Our CLD:</h4>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>
                    <strong>Air Travel Infrastructure:</strong> Airports, flight frequency, and connectivity in Tier 2-3
                    cities.
                  </li>
                  <li>
                    <strong>Rail Infrastructure:</strong> Railway stations, train frequency, and connectivity.
                  </li>
                  <li>
                    <strong>Economic Factors:</strong> Ticket pricing, disposable income, and economic development.
                  </li>
                  <li>
                    <strong>Time Factors:</strong> Travel duration, waiting times, and scheduling.
                  </li>
                  <li>
                    <strong>Policy Decisions:</strong> Government initiatives like UDAN scheme for air travel and
                    railway modernization.
                  </li>
                </ul>

                <p>
                  Our CLD reveals how these factors interact to create the current trend of increasing air travel and
                  decreasing rail usage in Tier 2-3 cities. By understanding these relationships, we can identify
                  leverage points for intervention.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Key Feedback Loops</h3>

                <div className="space-y-6">
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="text-lg font-semibold text-[#A71930] mb-2">Reinforcing Loop 1: Air Travel Growth</h4>
                    <p className="mb-2">
                      Increased air travel demand → More flights and routes → Improved accessibility → Lower prices
                      through competition → Further increased demand
                    </p>
                    <p className="text-sm text-gray-600">
                      This loop explains how the initial boost in air travel (through schemes like UDAN) creates a
                      self-reinforcing cycle of growth.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="text-lg font-semibold text-[#A71930] mb-2">
                      Balancing Loop 1: Rail Capacity Constraints
                    </h4>
                    <p className="mb-2">
                      Increased rail travel demand → Overcrowding → Reduced service quality → Shift to alternative
                      transport → Decreased rail travel demand
                    </p>
                    <p className="text-sm text-gray-600">
                      This loop shows how capacity constraints in the railway system create a balancing effect that
                      limits growth.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="text-lg font-semibold text-[#A71930] mb-2">Reinforcing Loop 2: Rail Decline</h4>
                    <p className="mb-2">
                      Decreased rail usage → Reduced revenue → Less investment in improvements → Deteriorating service →
                      Further decreased usage
                    </p>
                    <p className="text-sm text-gray-600">
                      This loop illustrates how initial declines in rail travel can accelerate through reduced
                      investment and maintenance.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="text-lg font-semibold text-[#A71930] mb-2">
                      Balancing Loop 2: Air Travel Constraints
                    </h4>
                    <p className="mb-2">
                      Increased air travel → Airport congestion → Delays and service issues → Reduced attractiveness →
                      Stabilized demand
                    </p>
                    <p className="text-sm text-gray-600">
                      This loop demonstrates how growth in air travel eventually faces constraints that limit
                      exponential growth.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="text-lg font-semibold text-[#A71930] mb-2">
                      Balancing Loop 2: Air Travel Constraints
                    </h4>
                    <p className="mb-2">
                      Increased air travel → Airport congestion → Delays and service issues → Reduced attractiveness →
                      Stabilized demand
                    </p>
                    <p className="text-sm text-gray-600">
                      This loop demonstrates how growth in air travel eventually faces constraints that limit
                      exponential growth.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="text-lg font-semibold text-[#A71930] mb-2">
                      Balancing Loop 2: Air Travel Constraints
                    </h4>
                    <p className="mb-2">
                      Increased air travel → Airport congestion → Delays and service issues → Reduced attractiveness →
                      Stabilized demand
                    </p>
                    <p className="text-sm text-gray-600">
                      This loop demonstrates how growth in air travel eventually faces constraints that limit
                      exponential growth.
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
