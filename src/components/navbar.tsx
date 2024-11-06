"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import TransitionLink from "./transition-link";

const enLinks = [
  { name: "About", href: "/en/about" },
  { name: "Menu", href: "/en/menu" },
  { name: "Order", href: "/en/order" },
  { name: "Contact", href: "/en/contact" },
];

const esLinks = [
  { name: "Acerca", href: "/es/about" },
  { name: "Menú", href: "/es/menu" },
  { name: "Orden", href: "/es/order" },
  { name: "Contacto", href: "/es/contact" },
];

export default function Navbar({ language }: { language: string }) {
  // Get the current URL path
  const currentPath = usePathname();
  const links = language.includes("en") ? enLinks : esLinks;
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
