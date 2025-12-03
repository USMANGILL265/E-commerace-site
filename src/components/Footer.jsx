import { Facebook, Instagram, Twitter, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-theme text-black font-bold pt-8 pb-6">
      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
            <ShoppingBag className="w-7 h-7 text-[#6B8E23]" />
            <h2 className="text-2xl font-bold text-black">GillMart</h2>
          </div>
          <p className="text-md leading-relaxed">
            Your one-stop shop for fashion, <br />
            electronics, and more. Shop smart, <br />
            shop with GillMart!
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-black mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-[#6B8E23]">Home</Link></li>
            <li><Link href="/shop" className="hover:text-[#6B8E23]">Shop</Link></li>
            <li><Link href="/about" className="hover:text-[#6B8E23]">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-[#6B8E23]">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-black mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li><Link href="/faq" className="hover:text-[#6B8E23]">FAQ</Link></li>
            <li><Link href="/returns" className="hover:text-[#6B8E23]">Returns</Link></li>
            <li><Link href="/shipping" className="hover:text-[#6B8E23]">Shipping Info</Link></li>
            <li><Link href="/support" className="hover:text-[#6B8E23]">Support</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-black mb-4">Subscribe</h3>
          <p className="text-sm mb-4">
            Get the latest deals and updates straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row items-center sm:items-stretch">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none focus:outline-none text-gray-900"
            />
            <button className="bg-[#6B8E23] hover:bg-[#7FA935] px-4 py-2 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none text-white w-full sm:w-auto mt-2 sm:mt-0 cursor-pointer">
              Subscribe
            </button>
          </div>
          <div className="flex justify-center md:justify-start space-x-4 mt-6">
            <a
              href="https://www.facebook.com/profile.php?id=100072081116545"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#6B8E23]"
            >
              <Facebook />
            </a>

            <a
              href="https://x.com/usmangill2655?t=8Q6O5skehV4-rZO3dUoQtg&s=09"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#6B8E23]"
            >
              <Twitter />
            </a>

            <a
              href="https://www.instagram.com/usman.gill.265/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#6B8E23]"
            >
              <Instagram />
            </a>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-md text-black">
        © {new Date().getFullYear()} GillMart. All rights reserved.
      </div>
    </footer>
  )
}
