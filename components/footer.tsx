import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {/* Navigation */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#A71930]">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-[#A71930] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/cld" className="text-gray-600 hover:text-[#A71930] transition-colors">
                  CLD
                </Link>
              </li>
              <li>
                <Link href="/bot" className="text-gray-600 hover:text-[#A71930] transition-colors">
                  BOT
                </Link>
              </li>
              <li>
                <Link href="/sfd" className="text-gray-600 hover:text-[#A71930] transition-colors">
                  SFD
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-600 hover:text-[#A71930] transition-colors">
                  Live Transport Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#A71930]">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span>team107@rishihood.edu.in</span>
              </li>
              <li className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span>+91 123 456 7890</span>
              </li>
            </ul>
          </div>

          {/* Acknowledgments */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#A71930]">Acknowledgments</h3>
            <p className="text-gray-600">
              Special thanks to Rishihood University for supporting this Systems Thinking Hackathon project.
            </p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#A71930]">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-[#A71930] transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-[#A71930] transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-[#A71930] transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Team 107 - Rishihood University. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
