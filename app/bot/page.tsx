"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

// Sample data for air travel trends
const airTravelData = [
  { year: 2015, passengers: 20, growth: 5 },
  { year: 2016, passengers: 25, growth: 25 },
  { year: 2017, passengers: 35, growth: 40 },
  { year: 2018, passengers: 45, growth: 28 },
  { year: 2019, passengers: 60, growth: 33 },
  { year: 2020, passengers: 30, growth: -50 }, // COVID impact
  { year: 2021, passengers: 40, growth: 33 },
  { year: 2022, passengers: 65, growth: 62 },
  { year: 2023, passengers: 80, growth: 23 },
]

// Sample data for rail travel trends
const railTravelData = [
  { year: 2015, passengers: 100, growth: 2 },
  { year: 2016, passengers: 105, growth: 5 },
  { year: 2017, passengers: 108, growth: 3 },
  { year: 2018, passengers: 110, growth: 2 },
  { year: 2019, passengers: 112, growth: 2 },
  { year: 2020, passengers: 60, growth: -46 }, // COVID impact
  { year: 2021, passengers: 75, growth: 25 },
  { year: 2022, passengers: 85, growth: 13 },
  { year: 2023, passengers: 90, growth: 6 },
]

// Combined data for comparison
const combinedData = airTravelData.map((item, index) => ({
  year: item.year,
  airPassengers: item.passengers,
  railPassengers: railTravelData[index].passengers,
}))

// Sample data for tier-wise analysis
const tierWiseData = [
  { city: "Tier 1", air2018: 70, air2023: 100, rail2018: 90, rail2023: 95 },
  { city: "Tier 2", air2018: 40, air2023: 80, rail2018: 100, rail2023: 90 },
  { city: "Tier 3", air2018: 20, air2023: 60, rail2018: 110, rail2023: 85 },
]

export default function BOTPage() {
  const [timeRange, setTimeRange] = useState("all")

  // Filter data based on selected time range
  const getFilteredData = () => {
    if (timeRange === "all") return combinedData
    if (timeRange === "recent") return combinedData.slice(-5)
    if (timeRange === "pre-covid") return combinedData.slice(0, 5)
    return combinedData
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Behavior Over Time</h1>
        <p className="text-gray-600 text-center mb-8">
          Analyzing trends in air and rail travel patterns in Tier 2-3 cities over the past decade
        </p>

        <Tabs defaultValue="comparison" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="comparison">Comparative Analysis</TabsTrigger>
            <TabsTrigger value="growth">Growth Rates</TabsTrigger>
            <TabsTrigger value="tier">Tier-wise Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="comparison" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Air vs Rail Travel Trends</h3>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      <SelectItem value="recent">Last 5 Years</SelectItem>
                      <SelectItem value="pre-covid">Pre-COVID</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={getFilteredData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="airPassengers"
                        name="Air Travel (millions)"
                        stroke="#A71930"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="railPassengers"
                        name="Rail Travel (millions)"
                        stroke="#666666"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Key Observations:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Air travel in Tier 2-3 cities has shown a steep upward trend since 2015, with a temporary dip
                      during COVID-19.
                    </li>
                    <li>
                      Rail travel has remained relatively stagnant with minimal growth, and has not fully recovered to
                      pre-pandemic levels.
                    </li>
                    <li>The gap between air and rail travel is narrowing, particularly in the post-pandemic period.</li>
                    <li>
                      By 2023, air travel has reached approximately 80% of rail travel volume in these cities, compared
                      to just 20% in 2015.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="growth" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Year-over-Year Growth Rates</h3>

                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={airTravelData.map((item, index) => ({
                        year: item.year,
                        air: item.growth,
                        rail: railTravelData[index].growth,
                      }))}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis unit="%" />
                      <Tooltip formatter={(value) => [`${value}%`, ""]} />
                      <Legend />
                      <Bar dataKey="air" name="Air Travel Growth" fill="#A71930" />
                      <Bar dataKey="rail" name="Rail Travel Growth" fill="#666666" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Growth Pattern Analysis:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Air travel has consistently shown double-digit growth rates (except during COVID), often exceeding
                      25% year-over-year.
                    </li>
                    <li>Rail travel growth has remained in the single digits, rarely exceeding 5% annual growth.</li>
                    <li>
                      Both modes experienced significant decline during the pandemic, but air travel has rebounded more
                      strongly.
                    </li>
                    <li>The post-pandemic recovery shows air travel growing at 3-4 times the rate of rail travel.</li>
                    <li>
                      Government initiatives like UDAN (Ude Desh ka Aam Nagrik) have contributed to the accelerated
                      growth in air travel.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tier" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Tier-wise Comparison (2018 vs 2023)</h3>

                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={tierWiseData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      barGap={0}
                      barCategoryGap="15%"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="city" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="air2018" name="Air Travel 2018" fill="#D88A9A" />
                      <Bar dataKey="air2023" name="Air Travel 2023" fill="#A71930" />
                      <Bar dataKey="rail2018" name="Rail Travel 2018" fill="#AAAAAA" />
                      <Bar dataKey="rail2023" name="Rail Travel 2023" fill="#666666" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Tier-wise Insights:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>The most dramatic shift is observed in Tier 3 cities, where air travel has tripled between 2018 and 2023.</li>
                    <li>Tier 2 cities show a doubling of air travel, while rail travel has declined by 10%.</li>
                    <li>Even in Tier 1 cities, air travel growth outpaces rail travel growth significantly.</li>
                    <li>Rail travel has seen an actual decline in Tier 2 and Tier 3 cities, contrary to the modest growth in Tier 1 cities.</li>
                    <li>The data suggests that smaller cities are experiencing the most dramatic shift from rail to air travel.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
