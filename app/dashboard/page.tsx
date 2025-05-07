"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
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
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Plane, Train, RefreshCw, AlertTriangle } from "lucide-react"
import { fetchDashboardData } from "./api"

// Sample data for flights
const flightData = {
  daily: [
    { date: "2023-05-01", flights: 120, onTime: 102, delayed: 18 },
    { date: "2023-05-02", flights: 135, onTime: 115, delayed: 20 },
    { date: "2023-05-03", flights: 128, onTime: 110, delayed: 18 },
    { date: "2023-05-04", flights: 142, onTime: 120, delayed: 22 },
    { date: "2023-05-05", flights: 150, onTime: 125, delayed: 25 },
    { date: "2023-05-06", flights: 138, onTime: 118, delayed: 20 },
    { date: "2023-05-07", flights: 125, onTime: 110, delayed: 15 },
  ],
  airports: [
    { name: "Jaipur", flights: 45, passengers: 5400 },
    { name: "Lucknow", flights: 38, passengers: 4560 },
    { name: "Varanasi", flights: 32, passengers: 3840 },
    { name: "Bhopal", flights: 28, passengers: 3360 },
    { name: "Indore", flights: 35, passengers: 4200 },
    { name: "Ranchi", flights: 25, passengers: 3000 },
  ],
}

// Sample data for trains
const trainData = {
  daily: [
    { date: "2023-05-01", trains: 85, onTime: 65, delayed: 20 },
    { date: "2023-05-02", trains: 90, onTime: 68, delayed: 22 },
    { date: "2023-05-03", trains: 88, onTime: 62, delayed: 26 },
    { date: "2023-05-04", trains: 92, onTime: 65, delayed: 27 },
    { date: "2023-05-05", trains: 95, onTime: 68, delayed: 27 },
    { date: "2023-05-06", trains: 87, onTime: 62, delayed: 25 },
    { date: "2023-05-07", trains: 82, onTime: 60, delayed: 22 },
  ],
  stations: [
    { name: "Jaipur", trains: 32, passengers: 9600 },
    { name: "Lucknow", trains: 28, passengers: 8400 },
    { name: "Varanasi", trains: 25, passengers: 7500 },
    { name: "Bhopal", trains: 22, passengers: 6600 },
    { name: "Indore", trains: 26, passengers: 7800 },
    { name: "Ranchi", trains: 20, passengers: 6000 },
  ],
}

// Combined data for comparison
const combinedData = flightData.daily.map((item, index) => ({
  date: item.date,
  flightCount: item.flights,
  trainCount: trainData.daily[index].trains,
  flightDelayRate: Math.round((item.delayed / item.flights) * 100),
  trainDelayRate: Math.round((trainData.daily[index].delayed / trainData.daily[index].trains) * 100),
}))

// Delay data for pie chart
const delayData = [
  { name: "Flight Delays", value: 138, color: "#A71930" },
  { name: "Train Delays", value: 169, color: "#666666" },
]

// COLORS for pie chart
const COLORS = ["#A71930", "#666666"]

// Type definition for delay data entries
type DelayDataEntry = {
  name: string
  value: number
  color: string
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [selectedCity, setSelectedCity] = useState("all")
  const [refreshing, setRefreshing] = useState(false)
  const [dashboardData, setDashboardData] = useState<any>(null)

  // Fetch data on initial load and when city changes
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const data = await fetchDashboardData(selectedCity)
        setDashboardData(data)
      } catch (error) {
        console.error("Failed to load dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [selectedCity])

  // Refresh data
  const refreshData = async () => {
    setRefreshing(true)
    try {
      const data = await fetchDashboardData(selectedCity)
      setDashboardData(data)
    } catch (error) {
      console.error("Failed to refresh dashboard data:", error)
    } finally {
      setRefreshing(false)
    }
  }

  // Get data for charts
  const getFilteredData = () => {
    if (!dashboardData) return []
    return dashboardData.comparativeData
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Live Transport Dashboard</h1>
            <p className="text-gray-600">Real-time insights into air and rail transport in Tier 2-3 cities</p>
          </div>

          <div className="flex items-center mt-4 md:mt-0 space-x-4">
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                <SelectItem value="jaipur">Jaipur</SelectItem>
                <SelectItem value="lucknow">Lucknow</SelectItem>
                <SelectItem value="varanasi">Varanasi</SelectItem>
                <SelectItem value="bhopal">Bhopal</SelectItem>
                <SelectItem value="indore">Indore</SelectItem>
                <SelectItem value="ranchi">Ranchi</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" onClick={refreshData} disabled={refreshing}>
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              <span className="sr-only">Refresh data</span>
            </Button>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Daily Flights</CardTitle>
              <Plane className="h-4 w-4 text-[#A71930]" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-2xl font-bold">{dashboardData?.flightData.flights.total}</div>
              )}
              <p className="text-xs text-muted-foreground">
                {dashboardData?.flightData.trend.weeklyChange > 0 ? "+" : ""}
                {dashboardData?.flightData.trend.weeklyChange}% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Daily Trains</CardTitle>
              <Train className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-2xl font-bold">{dashboardData?.trainData.trains.total}</div>
              )}
              <p className="text-xs text-muted-foreground">
                {dashboardData?.trainData.trend.weeklyChange > 0 ? "+" : ""}
                {dashboardData?.trainData.trend.weeklyChange}% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Flight Delay Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-2xl font-bold">
                  {Math.round(
                    (dashboardData?.flightData.flights.delayed / dashboardData?.flightData.flights.total) * 100,
                  )}
                  %
                </div>
              )}
              <p className="text-xs text-muted-foreground">-0.8% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Train Delay Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-2xl font-bold">
                  {Math.round((dashboardData?.trainData.trains.delayed / dashboardData?.trainData.trains.total) * 100)}%
                </div>
              )}
              <p className="text-xs text-muted-foreground">+1.2% from last week</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="traffic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="traffic">Traffic Trends</TabsTrigger>
            <TabsTrigger value="comparison">Mode Comparison</TabsTrigger>
            <TabsTrigger value="delays">Delay Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="traffic" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Traffic Trends</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="w-full h-[400px] flex items-center justify-center">
                    <Skeleton className="h-[300px] w-full" />
                  </div>
                ) : (
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getFilteredData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          tickFormatter={(value) => {
                            const date = new Date(value)
                            return `${date.getDate()}/${date.getMonth() + 1}`
                          }}
                        />
                        <YAxis />
                        <Tooltip
                          labelFormatter={(value) => {
                            const date = new Date(value)
                            return `Date: ${date.toLocaleDateString()}`
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="flightCount"
                          name="Flights"
                          stroke="#A71930"
                          activeDot={{ r: 8 }}
                          strokeWidth={2}
                        />
                        <Line type="monotone" dataKey="trainCount" name="Trains" stroke="#666666" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>City-wise Transport Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="w-full h-[400px] flex items-center justify-center">
                    <Skeleton className="h-[300px] w-full" />
                  </div>
                ) : (
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={dashboardData?.cityComparison || []}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="flights" name="Daily Flights" fill="#A71930" />
                        <Bar dataKey="trains" name="Daily Trains" fill="#666666" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delays" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Delay Rates by Mode</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="w-full h-[300px] flex items-center justify-center">
                      <Skeleton className="h-[250px] w-full" />
                    </div>
                  ) : (
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={getFilteredData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(value) => {
                              const date = new Date(value)
                              return `${date.getDate()}/${date.getMonth() + 1}`
                            }}
                          />
                          <YAxis unit="%" />
                          <Tooltip
                            labelFormatter={(value) => {
                              const date = new Date(value)
                              return `Date: ${date.toLocaleDateString()}`
                            }}
                            formatter={(value) => [`${value}%`, ""]}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="flightDelayRate"
                            name="Flight Delay Rate"
                            stroke="#A71930"
                            strokeWidth={2}
                          />
                          <Line
                            type="monotone"
                            dataKey="trainDelayRate"
                            name="Train Delay Rate"
                            stroke="#666666"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Total Delays This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="w-full h-[300px] flex items-center justify-center">
                      <Skeleton className="h-[250px] w-full" />
                    </div>
                  ) : (
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={dashboardData?.delayData || []}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {(dashboardData?.delayData || []).map((entry: DelayDataEntry, index: number) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} delays`, ""]} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Data refreshed: {new Date().toLocaleString()}</p>
          <p className="mt-1">
            Note: This dashboard uses simulated data for demonstration purposes. In a production environment, it would
            connect to real-time APIs for flight and train information.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
