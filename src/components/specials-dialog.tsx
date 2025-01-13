"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export default function SpecialsDialog() {
  const [isOpen, setIsOpen] = useState(true);
  const [language, setLang] = useState("en");

  if (typeof window !== "undefined") {
    // Get the language of the web client
    useEffect(() => {
      const startLang = navigator.language;
      if (startLang.includes("en")) {
        setLang("en");
      } else {
        setLang("es");
      }
    }, []);
  }

  // Check if today is Taco Tuesday
  const today = new Date();
  //   const tacoTuesday = today.getDay() === 2;
  const tacoTuesday = true;

  // Check if the current time is between 2pm and 5pm (LUNCH SPECIAL!!!)
  const currentTime = today.getHours();
  const lunchSpecial = currentTime >= 14 && currentTime <= 17;

  if (!tacoTuesday && !lunchSpecial) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-3/4 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {tacoTuesday ? "Today is Taco Tuesday!" : "It's Time for Lunch!"}
          </DialogTitle>
          <DialogDescription className="text-base text-black md:text-xl">
            {tacoTuesday
              ? "Enjoy our amazing chicken, beef, or pork tacos for only $1 each! Available for Dine-In and Carry Out."
              : "Enjoy our savory and affordable lunch special between 2pm and 5pm"}
          </DialogDescription>
        </DialogHeader>
        <div className="text-base">
          For more information, or to place an order, click{" "}
          <Link
            href={language == "en" ? "/en/order" : "/es/order"}
            className="underline"
            onClick={() => setIsOpen(false)}
          >
            here
          </Link>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
