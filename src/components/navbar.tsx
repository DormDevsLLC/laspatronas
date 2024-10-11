import Image from "next/image";
import Link from "next/link";

const links = [
  { name: "About", href: "/about" },
  { name: "Menu", href: "/menu" },
  { name: "Order", href: "/order" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <nav className="flex h-16 w-full items-center justify-between bg-slate-800 p-4 text-white">
      <div className="flex items-center">
        <Link href={"/"} className="ml-2">
          <div className="flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Las Patronas UCF"
              width={50}
              height={50}
            />
            <div className="text-xl">Las Patronas UCF</div>
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {links.map((link) => (
          <Link
            href={link.href}
            className="transition-all duration-300 hover:text-lg hover:underline"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
