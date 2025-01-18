import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    (<footer className="bg-gray-100 text-gray-600">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="space-y-4">
            <a href="/" className="text-2xl font-bold text-gray-900 flex items-center">
              Horizone
            </a>
            <p className="text-sm">
              Our mission is to equip modern explorers with cutting-edge, functional, and stylish
              bags that elevate every adventure.
            </p>
          </div>

          {/* About as */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">About</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-gray-900 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-gray-900 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/career" className="hover:text-gray-900 transition-colors">
                  Career
                </a>
              </li>
            </ul>
          </div>

          {/* Support as */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="/contact" className="hover:text-gray-900 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/return" className="hover:text-gray-900 transition-colors">
                  Return
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-gray-900 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter and Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Get Updates</h3>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400" />
              <Button type="submit" variant="default">
                Subscribe
              </Button>
            </form>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors">
                <Instagram className="w-5 h-5 text-gray-600" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://twitter.com"
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors">
                <Twitter className="w-5 h-5 text-gray-600" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://facebook.com"
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors">
                <Facebook className="w-5 h-5 text-gray-600" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://discord.com"
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors">
                <MessageCircle className="w-5 h-5 text-gray-600" />
                <span className="sr-only">Discord</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col md:flex-row justify-between items-center pt-8 mt-8 border-t border-gray-200">
          <p className="text-sm">©2024 Horizone. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="/privacy" className="text-sm hover:text-gray-900 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-sm hover:text-gray-900 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>)
  );
}