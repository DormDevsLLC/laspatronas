import { Metadata } from "next";
import Navbar from "~/components/navbar";

export const metadata: Metadata = {
  title: "Contact | Las Patronas UCF",
  description:
    "Contact Las Patronas, a family owned Mexican restaurant in Orlando, Florida, serving authentic Mexican cuisine.",
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
      <Navbar language="es-US" />
      <h1 id="transition-page" className="flex w-full items-center justify-center">Contact Page</h1>
    </>
  );
}
