import { Metadata } from "next";

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
    <h1 className="flex w-full items-center justify-center">Contact Page</h1>
  );
}
