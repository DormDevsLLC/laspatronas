"use client";

const enHours: { [key: string]: string[] } = {
  Monday: ["12:00", "21:00"],
  Tuesday: ["12:00", "21:00"],
  Wednesday: ["12:00", "21:00"],
  Thursday: ["12:00", "21:00"],
  Friday: ["12:00", "22:00"],
  Saturday: ["12:00", "22:00"],
  Sunday: ["12:00", "21:00"],
};

const esHours: { [key: string]: string[] } = {
  Lunes: ["12:00", "21:00"],
  Martes: ["12:00", "21:00"],
  Miércoles: ["12:00", "21:00"],
  Jueves: ["12:00", "21:00"],
  Viernes: ["12:00", "22:00"],
  Sábado: ["12:00", "22:00"],
  Domingo: ["12:00", "21:00"],
};

// Map from English to Spanish days
const daysMap: { [key: string]: string } = {
  Monday: "Lunes",
  Tuesday: "Martes",
  Wednesday: "Miércoles",
  Thursday: "Jueves",
  Friday: "Viernes",
  Saturday: "Sábado",
  Sunday: "Domingo",
};

// Function to determine if the store is open
export function getIsOpen(
  language: string = "en",
  date: Date = new Date(),
): {
  isOpen: boolean;
  today: string;
  displayOpenTime: string;
  displayCloseTime: string;
  displayOpenTime24: string;
  displayCloseTime24: string;
} {
  // Get current day of the week
  const enDay = date.toLocaleString("en-us", { weekday: "long" });
  const esDay = daysMap[enDay];
  const today = language.includes("en") ? enDay : (esDay ?? "");

  // Pick the correct hours based on the language
  const hours = language.includes("en") ? enHours : esHours;

  const todayHours = hours[today];

  // Extract opening and closing hours for today
  const [openTime, closeTime] = todayHours ?? [];

  // If the restaurant is closed today
  if (!openTime || !closeTime) {
    return {
      isOpen: false,
      today,
      displayOpenTime: "",
      displayCloseTime: "",
      displayOpenTime24: "",
      displayCloseTime24: "",
    };
  }

  // Current time
  const now = date;
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Time in minutes from midnight

  // Convert open and close times to minutes from midnight for easy comparison
  const [openHour, openMinute] = openTime.split(":").map(Number);
  const openInMinutes = (openHour ?? 0) * 60 + (openMinute ?? 0);

  const [closeHour, closeMinute] = closeTime.split(":").map(Number);
  const closeInMinutes = (closeHour ?? 0) * 60 + (closeMinute ?? 0);

  // Check if the restaurant is open
  const isOpen = currentTime >= openInMinutes && currentTime <= closeInMinutes;

  // Convert open and close times to 12-hour format and 24-hour format
  const formatTime = (hour: number, minute: number) => {
    const suffix = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedTime12 = `${formattedHour}:${minute
      .toString()
      .padStart(2, "0")} ${suffix}`;
    const formattedTime24 = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
    return { formattedTime12, formattedTime24 };
  };

  const {
    formattedTime12: displayOpenTime,
    formattedTime24: displayOpenTime24,
  } = formatTime(openHour ?? 0, openMinute ?? 0);
  const {
    formattedTime12: displayCloseTime,
    formattedTime24: displayCloseTime24,
  } = formatTime(closeHour ?? 0, closeMinute ?? 0);

  return {
    isOpen,
    today,
    displayOpenTime,
    displayCloseTime,
    displayOpenTime24,
    displayCloseTime24,
  };
}

export default function Open({ language }: { language: string }) {
  const { isOpen, today, displayOpenTime, displayCloseTime } =
    getIsOpen(language);

  return (
    <div className="w-full flex-col content-center items-center justify-center text-center text-3xl lg:text-4xl">
      <div>
        {today}'s {language.includes("en") ? "Hours" : "Horas"}:{" "}
        {displayOpenTime} - {displayCloseTime}
      </div>
      <div className="w-full">
        {isOpen ? (
          <p className="text-green-500">
            {language.includes("en") ? "Open" : "Abierta"}
          </p>
        ) : (
          <p className="text-red-500">
            {language.includes("en") ? "Closed" : "Cerrada"}
          </p>
        )}
      </div>
    </div>
  );
}

// Simple function to check if the store is open (default to English)
export function isOpen() {
  return getIsOpen("en").isOpen;
}
