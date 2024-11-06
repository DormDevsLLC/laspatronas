import { Metadata } from "next";
import Navbar from "~/components/navbar";

export const metadata: Metadata = {
  title: "Menu | Las Patronas UCF",
  description:
    "View the menu at Las Patronas, a family owned Mexican restaurant in Orlando, Florida, serving authentic Mexican cuisine.",
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

export default function Menu() {
  return (
    <>
      <Navbar language="es-US" />
      <div
        id="transition-page"
        className="container mx-auto px-4 py-8 sm:px-6 sm:py-16 lg:px-8"
      >
        <h1 className="mb-8 animate-fade-down text-center text-3xl font-bold sm:mb-20 sm:text-4xl">
          Menu!
        </h1>
      </div>
    </>
  );
}
