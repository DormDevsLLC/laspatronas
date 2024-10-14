import { Heart, Instagram, MapPin } from "lucide-react"; // Import Instagram, MapPin, and Heart icons
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="relative w-full bg-[#1c0230] p-4 text-white md:h-20">
      <div className="flex flex-col items-center justify-between md:h-full md:flex-row">
        {/* Left section: Logo and Address */}
        <div className="flex items-center space-x-2">
          {/* Logo */}
          <Link href="/" passHref>
            <Image
              src="/logo.png" // Replace with the actual logo path
              alt="Las Patronas Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          </Link>

          {/* Address with link to Google Maps */}
          <Link
            href="https://maps.app.goo.gl/vF46A8DedgUCCXeG8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 transition-all duration-200 hover:text-purple-200"
          >
            <MapPin className="h-5 w-5 text-purple-100" />
            <span>10034 University Blvd, Orlando, FL 32817</span>
          </Link>
        </div>

        {/* Middle section: Email and LLC info, centered horizontally */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 transform text-center text-sm text-purple-100 md:block">
          <a
            href="mailto:laspatronasorlando@outlook.com"
            className="hover:underline"
          >
            laspatronasorlando@outlook.com
          </a>
          <p>© 2024 Las Patronas Mexican Restaurant</p>
        </div>

        {/* Right section: Instagram and Review link */}
        <div className="flex items-center space-x-4">
          {/* Instagram link */}
          <Link
            href="https://www.instagram.com/laspatronasmxrestaurant/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-purple-100 hover:text-purple-200"
          >
            <Instagram className="h-6 w-6" />
            <span>Instagram</span>
          </Link>

          {/* Leave a Review link with Heart icon */}
          <Link
            href="https://maps.app.goo.gl/vF46A8DedgUCCXeG8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-purple-100 hover:text-purple-200"
          >
            <Heart className="h-6 w-6" />
            <span>Leave a Review!</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
