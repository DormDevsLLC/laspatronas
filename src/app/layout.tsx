import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "../components/navbar";

export const metadata: Metadata = {
  title: "Las Patronas UCF",
  description:
    "Las Patronas is a family owned Mexican restaurant in Orlando, Florida, serving authentic Mexican cuisine.",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="h-screen w-screen overflow-hidden">
        <TRPCReactProvider>
          <main className="h-full w-full">
            <Navbar />
            {children}
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
