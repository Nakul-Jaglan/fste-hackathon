// API utilities for fetching flight and train data

// Flight API endpoints

// const AVIATION_API_KEY = process.env.NEXT_PUBLIC_AVIATION_API_KEY || "demo_key"
// const FLIGHT_API_BASE_URL = "https://api.aviationstack.com/v1"

// // Train API endpoints
// const RAILWAY_API_KEY = process.env.NEXT_PUBLIC_RAILWAY_API_KEY || "demo_key"
// const TRAIN_API_BASE_URL = "https://indianrailapi.com/api/v2/TrainBetweenStation"

// Fetch flight data for a specific city

export async function fetchFlightData(city = "all") {
  try {
    // For now, we'll simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Sample data structure that would come from the API
    return {
      flights: {
        total: 138,
        onTime: 118,
        delayed: 20,
        cancelled: 0,
      },
      trend: {
        weeklyChange: 5, // percentage
        monthlyChange: 8,
      },
      airports: [
        { name: "Jaipur", code: "JAI", flights: 45, passengers: 5400 },
        { name: "Lucknow", code: "LKO", flights: 38, passengers: 4560 },
        { name: "Varanasi", code: "VNS", flights: 32, passengers: 3840 },
        { name: "Bhopal", code: "BHO", flights: 28, passengers: 3360 },
        { name: "Indore", code: "IDR", flights: 35, passengers: 4200 },
        { name: "Ranchi", code: "IXR", flights: 25, passengers: 3000 },
      ],
      dailyData: [
        { date: "2023-05-01", flights: 120, onTime: 102, delayed: 18 },
        { date: "2023-05-02", flights: 135, onTime: 115, delayed: 20 },
        { date: "2023-05-03", flights: 128, onTime: 110, delayed: 18 },
        { date: "2023-05-04", flights: 142, onTime: 120, delayed: 22 },
        { date: "2023-05-05", flights: 150, onTime: 125, delayed: 25 },
        { date: "2023-05-06", flights: 138, onTime: 118, delayed: 20 },
        { date: "2023-05-07", flights: 125, onTime: 110, delayed: 15 },
      ],
    }
  } catch (error) {
    console.error("Error fetching flight data:", error)
    throw new Error("Failed to fetch flight data")
  }
}

// Below is the commented-out code for fetching flight data from the AviationStack API.

// export async function fetchFlightData(city = "all") {
//   // const API_KEY = "YOUR_API_KEY_HERE"
//   const endpoint = `http://api.aviationstack.com/v1/flights?access_key=${AVIATION_API_KEY}`

//   try {
//     const res = await fetch(endpoint)
//     const data = await res.json()

//     if (!data || !data.data) {
//       throw new Error("Invalid API response")
//     }

//     // Filter by city if specified (matching departure or arrival airport)
//     interface Flight {
//       departure?: {
//       airport?: string;
//       iata?: string;
//       delay?: number | null;
//       };
//       arrival?: {
//       airport?: string;
//       };
//       flight_status?: string;
//     }

//     interface FlightDataResponse {
//       data: Flight[];
//     }

//     const flights = city === "all"
//       ? (data as FlightDataResponse).data
//       : (data as FlightDataResponse).data.filter(flight =>
//         flight.departure?.airport?.toLowerCase().includes(city.toLowerCase()) ||
//         flight.arrival?.airport?.toLowerCase().includes(city.toLowerCase())
//       )

//     const total = flights.length
//     const onTime = flights.filter(f => f.departure?.delay === null || (f.departure?.delay ?? Infinity) <= 10).length
//     const delayed = flights.filter(f => (f.departure?.delay ?? 0) > 10).length
//     const cancelled = flights.filter(f => f.flight_status === "cancelled").length

//     // Collect airport stats
//     const airportMap: Record<string, { name: string; code: string; flights: number; passengers: number }> = {}
//     flights.forEach(flight => {
//       const code = flight.departure?.iata
//       if (!code) return

//       if (!airportMap[code]) {
//         airportMap[code] = {
//           name: flight.departure?.airport ?? "Unknown Airport",
//           code: code,
//           flights: 0,
//           passengers: Math.floor(Math.random() * 200 + 100) // dummy passenger data
//         }
//       }
//       airportMap[code].flights += 1
//     })

//     const airports = Object.values(airportMap).slice(0, 6)

//     // Dummy trends
//     const trend = {
//       weeklyChange: Math.floor(Math.random() * 10),
//       monthlyChange: Math.floor(Math.random() * 15),
//     }

//     // Generate dailyData from available dates (dummy format)
//     const dailyData = Array.from({ length: 7 }, (_, i) => {
//       const date = new Date()
//       date.setDate(date.getDate() - i)
//       const flightsToday = Math.floor(Math.random() * 30 + 100)
//       const onTimeToday = flightsToday - Math.floor(Math.random() * 10)
//       return {
//         date: date.toISOString().split("T")[0],
//         flights: flightsToday,
//         onTime: onTimeToday,
//         delayed: flightsToday - onTimeToday,
//       }
//     }).reverse()

//     return {
//       flights: { total, onTime, delayed, cancelled },
//       trend,
//       airports,
//       dailyData,
//     }

//   } catch (error) {
//     console.error("Error fetching flight data:", error)
//     throw new Error("Failed to fetch flight data")
//   }
// }


////////////////////////////////////////////////////////////////////////////

// Fetch train data for a specific city


export async function fetchTrainData(city = "all") {
  try {
    // For now, we'll simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 700))

    // Sample data structure that would come from the API
    return {
      trains: {
        total: 87,
        onTime: 62,
        delayed: 25,
        cancelled: 0,
      },
      trend: {
        weeklyChange: -2, // percentage
        monthlyChange: -1,
      },
      stations: [
        { name: "Jaipur", code: "JP", trains: 32, passengers: 9600 },
        { name: "Lucknow", code: "LKO", trains: 28, passengers: 8400 },
        { name: "Varanasi", code: "BSB", trains: 25, passengers: 7500 },
        { name: "Bhopal", code: "BPL", trains: 22, passengers: 6600 },
        { name: "Indore", code: "INDB", trains: 26, passengers: 7800 },
        { name: "Ranchi", code: "RNC", trains: 20, passengers: 6000 },
      ],
      dailyData: [
        { date: "2023-05-01", trains: 85, onTime: 65, delayed: 20 },
        { date: "2023-05-02", trains: 90, onTime: 68, delayed: 22 },
        { date: "2023-05-03", trains: 88, onTime: 62, delayed: 26 },
        { date: "2023-05-04", trains: 92, onTime: 65, delayed: 27 },
        { date: "2023-05-05", trains: 95, onTime: 68, delayed: 27 },
        { date: "2023-05-06", trains: 87, onTime: 62, delayed: 25 },
        { date: "2023-05-07", trains: 82, onTime: 60, delayed: 22 },
      ],
    }
  } catch (error) {
    console.error("Error fetching train data:", error)
    throw new Error("Failed to fetch train data")
  }
}

// Fetch combined data for dashboard
export async function fetchDashboardData(city = "all") {
  try {
    const [flightData, trainData] = await Promise.all([fetchFlightData(city), fetchTrainData(city)])

    // Process and combine the data
    const combinedData = {
      flightData,
      trainData,
      comparativeData: flightData.dailyData.map((item, index) => ({
        date: item.date,
        flightCount: item.flights,
        trainCount: trainData.dailyData[index].trains,
        flightDelayRate: Math.round((item.delayed / item.flights) * 100),
        trainDelayRate: Math.round((trainData.dailyData[index].delayed / trainData.dailyData[index].trains) * 100),
      })),
      cityComparison: flightData.airports.map((airport, index) => ({
        name: airport.name,
        flights: airport.flights,
        trains: trainData.stations[index].trains,
      })),
      delayData: [
        {
          name: "Flight Delays",
          value: flightData.dailyData.reduce((sum, day) => sum + day.delayed, 0),
          color: "#A71930",
        },
        {
          name: "Train Delays",
          value: trainData.dailyData.reduce((sum, day) => sum + day.delayed, 0),
          color: "#666666",
        },
      ],
    }

    return combinedData
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    throw new Error("Failed to fetch dashboard data")
  }
}
