"use client";
import Image from "next/image";
import Navbar from "~/components/navbar";
import Open from "~/components/open";
import TransitionLink from "~/components/transition-link";
import { Button } from "~/components/ui/button";

export default async function Home() {
  // Get the language of the web client
  const language = navigator.language;

  return (
    <>
      <Navbar language={language} />
      <div
        id="transition-page"
        className="relative flex h-[92.5vh] w-screen items-center justify-between overflow-hidden"
      >
        {/* Left-hand image */}
        <div className="flex h-full w-full items-center justify-center lg:w-5/12 lg:items-start lg:justify-normal">
          <div className="relative mb-12 h-auto w-full px-8 md:mb-36 md:px-12 lg:m-20 lg:px-0">
            <Image
              src="/patronas-hero-header.png"
              alt="Hero"
              layout="responsive"
              width={100} // Set aspect ratio by defining width
              height={60} // Set aspect ratio by defining height
              objectFit="contain" // Maintains the aspect ratio of the image
              className="animate-fade-right animate-delay-300"
            />

            {/* Buttons below the image */}
            <div className="mt-6 flex animate-fade-right justify-center space-x-28 pt-4 animate-delay-500">
              <Open language={language} />
            </div>
            {/* Buttons below the image */}
            <div className="mt-8 flex animate-fade-right items-center justify-center animate-delay-700">
              <TransitionLink href="/order">
                <Button
                  size={"lg"}
                  className="mr-4 bg-[#1c0230] transition-all duration-300 hover:-translate-y-1 md:p-7 md:text-2xl"
                >
                  {language.includes("en") ? "Order Now" : "Ordenar Ahora"}
                </Button>
              </TransitionLink>
              <TransitionLink href="/about">
                <Button
                  size={"lg"}
                  className="bg-[#1c0230] transition-all duration-300 hover:-translate-y-1 md:p-7 md:text-2xl"
                >
                  {language.includes("en") ? "Learn More" : "Aprende Más"}
                </Button>
              </TransitionLink>
            </div>
          </div>
        </div>

        {/* Right-hand image */}
        <div className="relative hidden h-full w-4/12 animate-fade-left lg:flex">
          <Image
            src="/hero-flowers.png"
            alt="Hero"
            layout="fill"
            objectFit="fill" // Ensures the image covers the full height and width
            className="right-0"
          />
        </div>
      </div>
    </>
  );
}
