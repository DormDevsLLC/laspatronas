import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import Script from "next/script";
import Footer from "~/components/footer";
import SpecialsDialog from "~/components/specials-dialog";
import { Toaster } from "~/components/ui/toaster";

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
    <html lang="en" className={`${GeistSans.variable} bg-lime-100`}>
      <Script
        async
        src="https://dormdevs-analytics.vercel.app/script.js"
        data-website-id="a429b59d-4627-4f31-9599-47af68fbab85"
      />
      <body>
        <main className="h-screen overflow-x-hidden bg-lime-100">
          <SpecialsDialog />
          <div className="min-h-screen">{children}</div>
          <Footer />
        </main>
        <Toaster />
      </body>
    </html>
  );
}
