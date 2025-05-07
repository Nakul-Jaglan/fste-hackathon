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
    link.href = "/cld-model-107.mdl"
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
                      src="/cld.png?height=800&width=800"
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
                    <p className="mb-2">Air travel → customer satisfaction → air travel perception → airways popularity → airline revenues → airline investments → air infrastructure → increased air travel.</p>
                    <p className="text-sm text-gray-600">Strength: Strong, as it captures the self-perpetuating growth of air travel.</p>
                  </div>

                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="text-lg font-semibold text-[#A71930] mb-2">
                      Balancing Loop 1: Rail System Balance
                    </h4>
                    <p className="mb-2">Rail usage → rail revenue → railway investments → rail infrastructure → accessibility → increased rail usage.</p>
                    <p className="text-sm text-gray-600">
                    Strength: Moderate, as it shows constraints on rail growth but lacks external pressures that could weaken it further.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="text-lg font-semibold text-[#A71930] mb-2">Reinforcing Loop 2: Policy Driven Aviation</h4>
                    <p className="mb-2">
                    Infrastructure → policy support → airline investments → air infrastructure → Infrastructure.
                    </p>
                    <p className="text-sm text-gray-600">
                    Strength: Moderate, as it shows how policy support amplifies air infrastructure growth
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="text-lg font-semibold text-[#A71930] mb-2">
                      Balancing Loop 2: Eco Conscious Shift
                    </h4>
                    <p className="mb-2">
                    Carbon footprint awareness → (S) rail usage → (O) air travel → (S) carbon footprint awareness.
                    </p>
                    <p className="text-sm text-gray-600">
                    Increased carbon footprint awareness boosts rail usage ("S"), which reduces air travel ("O"), potentially increasing awareness further as emissions drop.
                    </p>
                    <p className="text-sm text-gray-600">
                    Strength: Moderate, as environmental awareness is growing but currently outweighed by air travel’s convenience                    
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="text-lg font-semibold text-[#A71930] mb-2">
                    Reinforcing Loop 3: Model Competition
                    </h4>
                    <p className="mb-2">
                    Air travel → (O) rail usage → (S) rail revenue → (S) railway investments → (S) rail infrastructure → (S) accessibility → (S) rail usage.
                    </p>
                    <p className="text-sm text-gray-600">
                    As air travel increases, rail usage decreases ("O" link), which reduces rail revenue, investments, and infrastructure, further decreasing rail usage. This reinforces air travel dominance.
                    </p>
                    <p className="text-sm text-gray-600">Strength: Strong, as it captures the competitive dynamic directly.</p>
                  </div>


                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="text-lg font-semibold text-[#A71930] mb-2">
                      Reinforcing Loop 4: Cost Feedback
                    </h4>
                    <p className="mb-2">
                    Air travel → (O) travel cost (air) → (S) air travel.
                    </p>
                    <p className="mb-2">
                    Rail usage → (S) travel cost (rail) → (O) rail usage.
                    </p>
                    <p className="text-sm text-gray-600">
                    Increased air travel reduces air travel costs due to competition ("O"), further boosting air travel ("S"). Conversely, low rail usage increases rail travel costs ("S") due to lack of economies of scale, reducing rail usage ("O").
                    </p>
                    <p className="text-sm text-gray-600">Strength: Strong, as cost dynamics significantly influence travel mode choice.</p>
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
