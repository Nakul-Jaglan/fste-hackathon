"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const downloadReport = () => {
    // Create a link to download the PDF
    const link = document.createElement("a")
    link.href = "/reports/systems-thinking-hackathon-report.pdf"
    link.download = "Systems-Thinking-Hackathon-Report.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white",
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo/Title */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          <h1 className="text-xl font-bold text-[#A71930]">
            <span className="hidden sm:inline">Systems Thinking</span>
            <span className="sm:hidden">ST</span> Hackathon
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-[#A71930] font-medium transition-colors">
            Home
          </Link>
          <Link href="/cld" className="text-gray-700 hover:text-[#A71930] font-medium transition-colors">
            CLD
          </Link>
          <Link href="/bot" className="text-gray-700 hover:text-[#A71930] font-medium transition-colors">
            BOT
          </Link>
          <Link href="/sfd" className="text-gray-700 hover:text-[#A71930] font-medium transition-colors">
            SFD
          </Link>
          <Link href="/dashboard" className="text-gray-700 hover:text-[#A71930] font-medium transition-colors">
            Live Transport Dashboard
          </Link>
        </nav>

        {/* Download Report Button */}
        <Button onClick={downloadReport} className="hidden md:flex bg-[#A71930] hover:bg-[#8a1428] text-white">
          <Download className="mr-2 h-4 w-4" /> Download Report
        </Button>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={toggleMobileMenu} aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <Link
              href="/"
              className="text-gray-700 hover:text-[#A71930] font-medium py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/cld"
              className="text-gray-700 hover:text-[#A71930] font-medium py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              CLD
            </Link>
            <Link
              href="/bot"
              className="text-gray-700 hover:text-[#A71930] font-medium py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              BOT
            </Link>
            <Link
              href="/sfd"
              className="text-gray-700 hover:text-[#A71930] font-medium py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              SFD
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-[#A71930] font-medium py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Live Transport Dashboard
            </Link>
            <Button onClick={downloadReport} className="w-full bg-[#A71930] hover:bg-[#8a1428] text-white">
              <Download className="mr-2 h-4 w-4" /> Download Report
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
