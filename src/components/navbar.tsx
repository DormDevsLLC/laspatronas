"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import TransitionLink from "./transition-link";
import { Button } from "./ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "~/components/ui/sheet";

const enLinks = [
  { name: "About", href: "/en/about" },
  { name: "Menu", href: "/en/menu" },
  { name: "Order", href: "/en/order" },
];

const esLinks = [
  { name: "Acerca", href: "/es/about" },
  { name: "Menú", href: "/es/menu" },
  { name: "Orden", href: "/es/order" },
];

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

  const handleTransition = async (href: string) => {
    const transitionDiv = document.getElementById("transition-page");
    transitionDiv?.classList.add("page-transition");
    await sleep(500);
    router.push(href);
    transitionDiv?.classList.remove("page-transition");
  };

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
        const newPath = currentPath.replace("/en", "/es");
        handleTransition(newPath);
      } else {
        const newPath = currentPath.replace("/es", "/en");
        handleTransition(newPath);
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
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <nav className="flex h-16 w-screen items-center justify-between overflow-hidden bg-[#1c0230] p-4 text-white transition-all duration-300">
        <div className="sm:block md:hidden">
          <Sheet open={open} onOpenChange={setOpen} />
          <Sheet>
            <SheetTrigger>
              <GiHamburgerMenu size={40} />
            </SheetTrigger>
            <SheetContent className="bg-[#1c0230] p-4 sm:w-[540px]">
              <SheetHeader>
                <TransitionLink
                  href={"/"}
                  className="ml-2 flex"
                  onClick={() => setOpen(false)}
                >
                  <Image
                    src="/logo.png"
                    alt="Las Patronas UCF"
                    width={500}
                    height={300}
                  />
                </TransitionLink>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white"></div>
                  </div>
                </div>

                <div
                  className="text-2xl text-white sm:flex"
                  onClick={() => changeLanguage()}
                >
                  {lang.includes("en") ? "Español" : "English"}
                </div>
                <div className="w-full border-t border-white"></div>

                <TransitionLink href="/en/about" onClick={() => setOpen(false)}>
                  <div className="text-2xl text-white sm:flex">
                    {lang.includes("en") ? "About" : "Acerca de"}
                  </div>
                  <div className="w-full border-t border-white"></div>
                </TransitionLink>

                <TransitionLink href="/en/menu" onClick={() => setOpen(false)}>
                  <div className="text-2xl text-white sm:flex">
                    {lang.includes("en") ? "Menu" : "Menú"}
                  </div>
                  <div className="w-full border-t border-white"></div>
                </TransitionLink>

                <TransitionLink href="/en/order" onClick={() => setOpen(false)}>
                  <div className="text-2xl text-white sm:flex">
                    {lang.includes("en") ? "Order" : "Ordenar"}
                  </div>
                  <div className="w-full border-t border-white"></div>
                </TransitionLink>
              </SheetHeader>
              <button className="absolute right-5 top-2 text-white">X</button>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden items-center justify-center sm:flex">
          <TransitionLink
            href={"/"}
            className="ml-2 flex"
            onClick={() => setOpen(false)}
          >
            <div className="flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Las Patronas UCF"
                width={50}
                height={50}
              />
              <div className="hidden text-xl sm:flex">Las Patronas UCF</div>
            </div>
          </TransitionLink>
        </div>
        <div className="flex items-center space-x-8 pr-8 transition-all duration-300">
          <div
            onClick={() => changeLanguage()}
            className="hidden text-xl transition-all duration-300 hover:cursor-pointer hover:text-purple-100 md:flex"
          >
            {lang.includes("en") ? "Español" : "English"}
          </div>
          {links.map((link) => (
            <TransitionLink
              href={link.href}
              key={link.href}
              onClick={() => setOpen(false)}
            >
              {link.href === "/es/order" || link.href === "/en/order" ? (
                <Button
                  className="hidden bg-[#a40c96] text-xl transition-all duration-300 hover:bg-[#750B6B] sm:flex"
                  size={"lg"}
                >
                  {link.name}
                </Button>
              ) : (
                <div
                  className={`hidden transition-all duration-300 hover:text-purple-100 md:flex ${link.href == currentPath ? "hidden text-2xl text-purple-200 md:flex" : "hidden text-xl md:flex"}`}
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
