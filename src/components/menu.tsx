"use client";

// Import necessary components and hooks
import menuItemsEn from "./data/menuen.json"; // English menu items data
import menuItemsEs from "./data/menues.json"; // Spanish menu items data
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

// Define the structure of a menu item
type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
};

// Extend MenuItem to include quantity for cart items
type CartItem = MenuItem & { quantity: number };

interface RestaurantMenuProps {
  language: string; // "en" or "es"
}

export default function OrderPage({ language }: RestaurantMenuProps) {
  // Select the appropriate menu items based on the language
  const menuItems = language === "en" ? menuItemsEn : menuItemsEs;

  // Extract unique categories from the menu items
  const categories = Array.from(
    new Set(menuItems.map((item) => item.category)),
  );

  // Main component rendering
  return (
    <div className="rounded-xl border-8 border-[#a80c94] bg-[#a80c94]">
      <div className="container mx-auto rounded-xl border-8 border-[#200434] bg-[#f0ccf4] p-4 md:p-12">
        {/* Header */}
        <h1 className="mb-6 text-3xl font-bold">
          {language === "en" ? "Our Menu" : "Nuestro Menú"}
        </h1>
        {/* Menu sections */}
        {categories.map((category) => (
          <section key={category} className="mb-12 scroll-mt-20">
            <h2
              className="mb-4 text-2xl font-bold"
              id={`section-${category.toLowerCase().replace(" ", "-")}`}
            >
              {category}
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {menuItems
                .filter((item) => item.category === category)
                .map((item, index) => (
                  <Card
                    key={item.id}
                    className="flex animate-fade-right flex-col justify-between border-none bg-[#f8cca4]"
                    style={{
                      animationDelay: `${index * 150 + 200}ms`,
                    }}
                  >
                    <CardHeader>
                      <CardTitle>{item.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p>{item.description}</p>
                    </CardContent>
                    <CardFooter className="mt-auto">
                      <div className="flex w-full items-center justify-between">
                        <p className="mt-2 font-bold">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
