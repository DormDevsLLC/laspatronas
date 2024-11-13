"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import TransitionLink from "./transition-link";
import { Button } from "./ui/button";

const enLinks = [
  { name: "About", href: "/en/about" },
  { name: "Contact", href: "/en/contact" },
  { name: "Order", href: "/en/order" },
];

const esLinks = [
  { name: "Acerca", href: "/es/about" },
  { name: "Contacto", href: "/es/contact" },
  { name: "Orden", href: "/es/order" },
];

export default function Navbar({
  language,
  setParentLanguage,
}: {
  language: string;
  setParentLanguage?: (lang: string) => void;
}) {
  // Stateful data
  const [lang, setLang] = useState(language);
  const [links, setLinks] = useState(
    language.includes("en") ? enLinks : esLinks,
  );

  const router = useRouter();

  // Get the current URL path
  const currentPath = usePathname();

  function changeLanguage() {
    // Check if this is the root page
    if (currentPath === "/") {
      // Change the language
      if (lang.includes("en")) {
        setLang("es");
        setParentLanguage?.("es");
        setLinks(esLinks);
      } else {
        setLang("en");
        setParentLanguage?.("en");
        setLinks(enLinks);
      }
    } else {
      // Grab the current url and swap
      if (lang.includes("en")) {
        const path = currentPath;
        const newPath = currentPath.replace("/en", "/es");
        router.push(newPath);
      } else {
        const newPath = currentPath.replace("/es", "/en");
        router.push(newPath);
      }

      // Change the language
      if (lang.includes("en")) {
        setLang("es");
        setParentLanguage?.("es");
        setLinks(esLinks);
      } else {
        setLang("en");
        setParentLanguage?.("en");
        setLinks(enLinks);
      }
    }
  }
  return (
    <>
      <nav className="flex h-16 w-screen items-center justify-between overflow-hidden bg-[#1c0230] p-4 text-white transition-all duration-300">
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
        <div className="flex items-center space-x-8 pr-8 transition-all duration-300">
          <div
            onClick={() => changeLanguage()}
            className="text-xl transition-all duration-300 hover:cursor-pointer hover:text-purple-100"
          >
            {lang.includes("en") ? "Español" : "English"}
          </div>
          {links.map((link) => (
            <TransitionLink href={link.href} key={link.href}>
              {link.href === "/es/order" || link.href === "/en/order" ? (
                <Button
                  className="bg-[#a40c96] text-xl transition-all duration-300 hover:bg-[#750B6B]"
                  size={"lg"}
                >
                  {link.name}
                </Button>
              ) : (
                <div
                  className={`transition-all duration-300 hover:text-purple-100 ${link.href == currentPath ? "text-2xl text-purple-200" : "text-xl"}`}
                >
                  {link.name}
                </div>
              )}
            </TransitionLink>
          ))}
        </div>
      </nav>
    </>
  );
}
