"use client";

const hours: { [key: string]: string[] } = {
  Monday: ["12:00", "21:00"],
  Tuesday: ["12:00", "21:00"],
  Wednesday: ["12:00", "21:00"],
  Thursday: ["12:00", "21:00"],
  Friday: ["12:00", "22:00"],
  Saturday: ["12:00", "22:00"],
  Sunday: ["12:00", "21:00"],
};

export default function Open() {
  // Get current day of the week
  const today = new Date().toLocaleString("en-us", { weekday: "long" });
  const todayHours = hours[today];
  console.log(today, todayHours);

  // Extract opening and closing hours for today
  const [openTime, closeTime] = todayHours ?? [];

  // If the restaurant is closed today
  if (!openTime || !closeTime) {
    return <p className="text-2xl font-bold text-red-500">Closed</p>;
  }

  // Current time
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Time in minutes from midnight

  // Convert open and close times to minutes from midnight for easy comparison
  const [openHour, openMinute] = openTime.split(":").map(Number);
  const openInMinutes = (openHour ?? 0) * 60 + openMinute!;

  const [closeHour, closeMinute] = closeTime.split(":").map(Number);
  const closeInMinutes = (closeHour ?? 0) * 60 + closeMinute!;

  // Check if the restaurant is open
  const isOpen = currentTime >= openInMinutes && currentTime <= closeInMinutes;

  // Convert open and close times to 12-hour format
  const openHours =
    (openHour ?? 0) > 12 ? (openHour ?? 0) - 12 : (openHour ?? 0);
  const closeHours =
    closeHour !== undefined ? (closeHour > 12 ? closeHour - 12 : closeHour) : 0;
  const openSuffix = (openHour ?? 0) >= 12 ? "PM" : "AM";
  const closeSuffix =
    closeHour !== undefined ? (closeHour >= 12 ? "PM" : "AM") : "";
  const displayOpenTime = `${openHours}:${(openMinute ?? 0).toString().padStart(2, "0")} ${openSuffix}`;
  const displayCloseTime = `${closeHours}:${(closeMinute ?? 0).toString().padStart(2, "0")} ${closeSuffix}`;

  return (
    <div className="w-full flex-col content-center items-center justify-center text-center text-3xl lg:text-4xl">
      <div>
        {today}'s Hours: {displayOpenTime} - {displayCloseTime}
      </div>
      <div className="w-full">
        {isOpen ? (
          <p className="text-green-500">Open</p>
        ) : (
          <p className="text-red-500">Closed</p>
        )}
      </div>
    </div>
  );
}
