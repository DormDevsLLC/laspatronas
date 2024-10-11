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

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
      <h1 className="mb-8 text-center text-3xl font-bold sm:mb-12 sm:text-4xl">
        About Our Restaurant
      </h1>

      {/* About Section */}
      <section className="animate-fade-right animate-delay-300 mb-12 sm:mb-16">
        <div className="flex flex-col items-center gap-6 sm:gap-8 md:flex-row">
          <div className="order-2 w-full md:order-1 md:w-1/2">
            <h2 className="mb-3 text-2xl font-semibold sm:mb-4 sm:text-3xl">
              Our Story
            </h2>
            <p className="text-base text-gray-700 sm:text-lg">
              Welcome to Las Patronas, a family-owned Mexican restaurant that
              has been serving authentic flavors for over three generations. Our
              journey began in 1965 when our grandparents, Maria and Jose,
              brought their cherished family recipes from Oaxaca to this vibrant
              community.
            </p>
            <p className="mt-3 text-base text-gray-700 sm:mt-4 sm:text-lg">
              Today, we continue to honor their legacy by crafting each dish
              with the same love, care, and traditional techniques that have
              been passed down through our family. From our homemade salsas to
              our slow-cooked mole, every bite tells the story of our heritage
              and passion for Mexican cuisine.
            </p>
          </div>
          <div className="order-1 w-full md:order-2 md:w-1/2">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Family restaurant interior"
              width={600}
              height={400}
              className="h-auto w-full rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="animate-fade-left animate-delay-500">
        <div className="flex flex-col items-center gap-6 sm:gap-8 md:flex-row">
          <div className="w-full md:w-1/2">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Colorful Mexican dishes"
              width={600}
              height={400}
              className="h-auto w-full rounded-lg shadow-md"
            />
          </div>
          <div className="mt-6 w-full md:mt-0 md:w-1/2">
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
  );
}
