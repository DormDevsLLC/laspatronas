"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "~/components/navbar";
import Open from "~/components/open";
import RotatingBackground from "~/components/rotating-bg";
import TransitionLink from "~/components/transition-link";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

export default function Home() {
  // Stateful data
  const [language, setLang] = useState("en");
  let startLang;
  const [isMobile, setIsMobile] = useState(true);

  // Check if the user is on a mobile device
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  // Get the language of the web client
  useEffect(() => {
    startLang = navigator.language;
    if (startLang.includes("en")) {
      setLang("en");
    } else {
      setLang("es");
    }
  }, []);

  return (
    <>
      <Navbar
        language={startLang ?? "en"}
        setParentLanguage={(lang: string) => {
          setLang(lang);
        }}
      />
      <div className="relative flex h-[95vh] w-screen items-center justify-between overflow-hidden">
        <div className="absolute left-0 top-0 z-0 h-full w-full">
          <RotatingBackground />
        </div>
        <Card className="absolute bottom-0 left-1/2 z-10 mb-8 flex w-11/12 -translate-x-1/2 animate-fade flex-col border-[#a80c94] bg-[#1c0230] py-2 animate-delay-300 md:w-1/3">
          <div className="my-2 flex w-full items-center justify-center">
            {!isMobile && (
              <Image
                src="/logo.png"
                alt="Las Patronas UCF"
                width={125}
                height={125}
              />
            )}
          </div>
          <Open language={language} />
          <div className="my-2 flex w-full justify-center gap-4">
            <TransitionLink href={language == "en" ? "/en/order" : "/es/order"}>
              <Button className="bg-[#a80c94]">
                {language == "en" ? "Order" : "Ordenar"}
              </Button>
            </TransitionLink>{" "}
            <TransitionLink href={language == "en" ? "/en/about" : "/es/about"}>
              <Button className="bg-[#a80c94]">
                {language == "en" ? "About" : "Acerca de"}
              </Button>
            </TransitionLink>
          </div>
        </Card>
      </div>
    </>
  );
}
