import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Las Patronas UCF",
  description:
    "Learn more about Las Patronas, a family owned Mexican restaurant in Orlando, Florida, serving authentic Mexican cuisine.",
  keywords: [
    "Las Patronas",
    "Mexican Restaurant",
    "Orlando",
    "University of Central Florida",
    "UCF",
    "Authentic Mexican Cuisine",
    "Tacos",
    "Burritos",
    "Quesadillas",
    "Family Owned",
  ],
};

import Image from "next/image";
import Navbar from "~/components/navbar";

export default function About() {
  return (
    <>
      <Navbar language="en-US" />
      <div
        id="transition-page"
        className="container mx-auto px-4 py-8 sm:px-6 sm:py-16 lg:px-8"
      >
        <h1 className="mb-8 animate-fade-down text-center text-3xl font-bold sm:mb-20 sm:text-4xl">
          About Our Restaurant
        </h1>

        {/* About Section */}
        <section className="mb-12 sm:mb-32">
          <div className="flex flex-col-reverse items-center gap-6 sm:gap-8 md:flex-row">
            <div className="order-2 w-full animate-fade-right md:order-1 md:w-1/2">
              <h2 className="mb-3 text-2xl font-semibold sm:mb-4 sm:text-3xl">
                Our Story
              </h2>
              <p className="text-base text-gray-700 sm:text-lg">
                Welcome to Las Patronas, a family-owned Mexican restaurant that
                combines traditional flavors with modern passion to offer the
                most authentic flavors of Mexico. Starting off as a food truck
                in 2021, we have since grown into a full-service restaurant that
                serves the UCF community and beyond.
              </p>
              <p className="mt-3 text-base text-gray-700 sm:mt-4 sm:text-lg">
                We are proud to offer an unforgettable Mexican cuisine. If you
                are looking for an authentic restauraunt with a lively
                atmosphere, Las Patronas is the place to be.
              </p>
            </div>
            <div className="order-1 w-full animate-fade-left animate-delay-500 md:order-2 md:ml-12 md:w-1/2 lg:w-5/12">
              <div className="relative h-0 w-full pb-[56.25%]">
                {" "}
                {/* 16:9 Aspect Ratio */}
                <Image
                  src="/interior.png"
                  alt="Family restaurant interior"
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 h-full w-full rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="">
          <div className="flex flex-col-reverse items-center gap-6 sm:gap-8 md:flex-row">
            <div className="w-full animate-fade-right animate-delay-500 md:mr-12 md:w-1/2 lg:w-5/12">
              <div className="relative h-0 w-full pb-[56.25%]">
                {" "}
                {/* 16:9 Aspect Ratio */}
                <Image
                  src="/truck.png"
                  alt="Colorful Mexican dishes"
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 h-full w-full rounded-lg shadow-md"
                />
              </div>
            </div>
            <div className="w-full animate-fade-left md:w-1/2">
              <h2 className="mb-3 text-2xl font-semibold sm:mb-4 sm:text-3xl">
                Our Mission
              </h2>
              <p className="text-base text-gray-700 sm:text-lg">
                At Las Patronas, our mission is to create a warm and inviting
                atmosphere where families and friends can come together to enjoy
                delicious, authentic Mexican cuisine. We are committed to:
              </p>
              <ul className="mt-3 list-inside list-disc space-y-1 text-base text-gray-700 sm:mt-4 sm:space-y-2 sm:text-lg">
                <li>Preserving and sharing our family's culinary traditions</li>
                <li>Using fresh, high-quality ingredients in every dish</li>
                <li>
                  Providing exceptional service that makes every guest feel like
                  family
                </li>
                <li>
                  Supporting our local community through partnerships and events
                </li>
                <li>Continuously innovating while staying true to our roots</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
