"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import TransitionLink from "./transition-link";

const links = [
  { name: "About", href: "/about" },
  { name: "Menu", href: "/menu" },
  { name: "Order", href: "/order" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  // Get the current URL path
  const currentPath = usePathname();
  console.log(currentPath);
  return (
    <>
      <nav className="flex h-16 w-screen items-center justify-between overflow-hidden bg-[#1c0230] p-4 text-white">
        <div className="items-center justify-center">
          <TransitionLink href={"/"} className="ml-2 flex">
            <div className="flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Las Patronas UCF"
                width={50}
                height={50}
              />
              <div className="text-xl">Las Patronas UCF</div>
            </div>
          </TransitionLink>
        </div>
        <div className="flex items-center space-x-8 pr-8">
          {links.map((link) => (
            <TransitionLink
              href={link.href}
              key={link.href}
              className={`${link.href == currentPath ? "text-2xl text-purple-200 underline" : ""}text-xl transition-all duration-300 hover:text-2xl hover:text-purple-100`}
            >
              {link.name}
            </TransitionLink>
          ))}
        </div>
      </nav>
    </>
  );
}
