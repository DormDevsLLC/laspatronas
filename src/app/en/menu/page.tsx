import { Metadata } from "next";
import Menu from "~/components/menu";
import Navbar from "~/components/navbar";
import TransitionLink from "~/components/transition-link";
import { Card } from "~/components/ui/card";

export const metadata: Metadata = {
  title: "Menu | Las Patronas UCF",
  description:
    "Browse the Menu for Las Patronas, a family owned Mexican restaurant in Orlando, Florida, serving authentic Mexican cuisine.",
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

export default async function Home() {
  return (
    <>
      <Navbar language="en-US" />
      <div id="transition-page" className="h-full">
        <h1 className="mb-2 mt-10 w-full animate-fade-down text-center text-3xl font-bold">
          Our menu
        </h1>
        <div className="mb-4 w-full animate-fade-up px-4 text-center text-lg">
          View all of our delicious food options below! If you would like to
          place an order, please click{" "}
          <TransitionLink href="/en/order" className="underline">
            here
          </TransitionLink>
          .
        </div>
        <div className="flex h-full w-full animate-fade-up items-center justify-center px-2 md:px-8 lg:px-12 xl:px-24">
          <Card className="mb-12 h-full">
            <Menu language="en" />
          </Card>
        </div>
      </div>
    </>
  );
}
