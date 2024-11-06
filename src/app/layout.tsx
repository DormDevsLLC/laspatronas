import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import Footer from "~/components/footer";
import { TRPCReactProvider } from "~/trpc/react";

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
      <body>
        <TRPCReactProvider>
          <main className="h-screen overflow-x-hidden bg-lime-100">
            <div className="min-h-screen">{children}</div>
            <Footer />
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
