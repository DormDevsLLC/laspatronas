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
  const tacoTuesday = today.getDay() === 2;

  // Check if the current time is between 11:30am and 2pm (LUNCH SPECIAL!!!)
  const currentTime = today.getHours() + today.getMinutes() / 60;
  const lunchSpecial = currentTime >= 11.5 && currentTime <= 14;

  if (!tacoTuesday && !lunchSpecial) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-3/4 rounded-xl border-[#a80c94] bg-[#1c0230] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {tacoTuesday
              ? language === "en"
                ? "Today is Taco Tuesday!"
                : "Hoy es Martes de Tacos"
              : language === "en"
                ? "It's Time for Lunch!"
                : "Es Hora del Almuerzo."}
          </DialogTitle>
          <DialogDescription className="text-base text-white md:text-xl">
            {tacoTuesday
              ? language === "en"
                ? "Enjoy our amazing chicken, beef, or pork tacos for only $1 each! Available for Dine-In and Carry Out."
                : "Disfruta de nuestros increíbles tacos de pollo, res o cerdo por solo $1 cada uno. Disponibles para comer en el restaurante o para llevar."
              : language === "en"
                ? "Enjoy our savory and affordable lunch special between 2pm and 5pm"
                : "Disfruta de nuestro delicioso y asequible especial de almuerzo entre las 2 p.m. y las 5 p.m."}
          </DialogDescription>
        </DialogHeader>
        <div className="text-base">
          {language === "en"
            ? "For more information, or to place an order, click"
            : "Para más información, o para realizar un pedido, haz clic"}{" "}
          <Link
            href={language === "en" ? "/en/order" : "/es/order"}
            className="underline"
            onClick={() => setIsOpen(false)}
          >
            {language === "en" ? "here" : "aquí"}
          </Link>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
