"use client";

// Import necessary components and hooks
import {
  ArrowLeft,
  ArrowRight,
  ChevronUp,
  Loader2,
  Minus,
  Search,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation"; // Import useRouter
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useToast } from "~/hooks/use-toast"; // Custom toast hook for notifications
import menuItemsEn from "./data/menuen.json"; // English menu items data
import menuItemsEs from "./data/menues.json"; // Spanish menu items data
import { getIsOpen, isOpen } from "./open"; // Functions to check if the restaurant is open
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

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
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  // If today is Tuesday, sort the "Taco Tuesday" category items first
  const today = new Date();
  const isTacoTuesday = true; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // Check if the time is between 11:30 AM and 2:00 PM
  const currentTime = today.getHours() + today.getMinutes() / 60;
  const lunchSpecial = currentTime >= 11.5 && currentTime <= 14;

  const menuItems = useMemo(() => {
    let items = language === "en" ? menuItemsEn : menuItemsEs;

    if (isTacoTuesday) {
      items.sort((a, b) => {
        if (
          (a.category === "Taco Tuesday" || a.category === "Martes de Tacos") &&
          b.category !== "Taco Tuesday" &&
          b.category !== "Martes de Tacos"
        ) {
          return -1;
        } else if (
          (a.category !== "Taco Tuesday" &&
            a.category !== "Martes de Tacos" &&
            b.category === "Taco Tuesday") ||
          b.category === "Martes de Tacos"
        ) {
          return 1;
        }
        return 0;
      });

      items = items.filter(
        (item) => item.category !== "Lunch Special (11:30 AM to 2:00 PM)",
      );
      items = items.filter(
        (item) => item.category !== "Especial de Almuerzo (11:30 AM a 2:00 PM)",
      );
    } else if (lunchSpecial) {
      items.sort((a, b) => {
        if (
          (a.category === "Lunch Special (11:30 AM to 2:00 PM)" ||
            a.category === "Especial de Almuerzo (11:30 AM a 2:00 PM)") &&
          b.category !== "Lunch Special (11:30 AM to 2:00 PM)" &&
          b.category !== "Especial de Almuerzo (11:30 AM a 2:00 PM)"
        ) {
          return -1;
        } else if (
          a.category !== "Lunch Special (11:30 AM to 2:00 PM)" &&
          a.category !== "Especial de Almuerzo (11:30 AM a 2:00 PM)" &&
          (b.category === "Lunch Special (11:30 AM to 2:00 PM)" ||
            b.category === "Especial de Almuerzo (11:30 AM a 2:00 PM)")
        ) {
          return 1;
        }
        return 0;
      });

      items = items.filter((item) => item.category !== "Taco Tuesday");
      items = items.filter((item) => item.category !== "Martes de Tacos");
    } else {
      items = items.filter((item) => item.category !== "Taco Tuesday");
      items = items.filter((item) => item.category !== "Martes de Tacos");
      items = items.filter(
        (item) => item.category !== "Lunch Special (11:30 AM to 2:00 PM)",
      );
      items = items.filter(
        (item) => item.category !== "Especial de Almuerzo (11:30 AM a 2:00 PM)",
      );
    }

    return items;
  }, [language, isTacoTuesday, lunchSpecial]);

  // State variables for search term, cart, and filtered items
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[] | null>(null); // Initialize cart as null
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(menuItems);

  // State variables for customer information
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // State variables for pickup time selection
  const [pickupTimeOption, setPickupTimeOption] = useState("ASAP"); // 'ASAP' or 'Later'
  const [pickupTime, setPickupTime] = useState(""); // If 'Later' is selected, store the time here
  const [timeError, setTimeError] = useState(""); // Error message for invalid time

  // State variables for form validation errors
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Use the custom toast hook for notifications
  const { toast } = useToast();

  // Extract unique categories from the menu items
  const categories = Array.from(
    new Set(menuItems.map((item) => item.category)),
  );

  // Refs for section elements and cart
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const cartRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);

  // Callback to register section refs for smooth scrolling
  const registerSectionRef = useCallback(
    (category: string, element: HTMLElement | null) => {
      sectionRefs.current[category] = element;
    },
    [],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart) as CartItem[];
        if (parsedCart.length > 0) {
          setCart(
            parsedCart
              .map((cartItem) => {
                const menuItem = menuItems.find(
                  (item) => item.id === cartItem.id,
                );
                return menuItem
                  ? { ...menuItem, quantity: cartItem.quantity }
                  : null;
              })
              .filter(Boolean) as CartItem[],
          );
        } else {
          setCart([]);
        }
      } else {
        setCart([]);
      }
    }
  }, [language]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined" && cart !== null) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Update filtered items whenever the search term or language changes
  useEffect(() => {
    const filtered = menuItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredItems(filtered);
  }, [searchTerm, menuItems]);

  // Helper function to validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Helper function to validate phone number format (10-digit numbers)
  const isValidPhoneNumber = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  // Check if the restaurant is currently open
  const restaurantIsOpen = isOpen();

  // Function to add an item to the cart
  const addToCart = (item: MenuItem) => {
    if (cart === null) return; // If cart is not initialized yet
    setCart((prevCart) => {
      // Check if the item already exists in the cart
      const existingItem = prevCart!.find(
        (cartItem) => cartItem.id === item.id,
      );
      if (existingItem) {
        // If it exists, increment the quantity
        return prevCart!.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }
      // If not, add it to the cart with quantity 1
      return [...prevCart!, { ...item, quantity: 1 }];
    });
    // Show a toast notification
    toast({
      title:
        language === "en"
          ? "Item added to cart"
          : "Artículo añadido al carrito",
      description: `${item.name} ${
        language === "en"
          ? "has been added to your cart."
          : "ha sido añadido a tu carrito."
      }`,
    });
  };

  // Function to decrease the quantity of an item in the cart
  const decreaseQuantity = (itemId: string) => {
    if (cart === null) return;
    setCart(
      (prevCart) =>
        prevCart!
          .map((cartItem) =>
            cartItem.id === itemId
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem,
          )
          .filter((cartItem) => cartItem.quantity > 0), // Remove item if quantity is 0
    );
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId: string) => {
    if (cart === null) return;
    setCart((prevCart) =>
      prevCart!.filter((cartItem) => cartItem.id !== itemId),
    );
  };

  // Function to scroll to a specific category section
  const scrollToSection = (category: string) => {
    const element = sectionRefs.current[category];
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Function to scroll to the cart section
  const scrollToCart = () => {
    if (cartRef.current) {
      cartRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Function to get the earliest possible pickup time
  function getMinPickupTime() {
    const now = new Date();
    // Add preparation time (e.g., 15 minutes)
    const minTime = new Date(now.getTime());
    minTime.setMinutes(minTime.getMinutes() + 15);

    // Get the restaurant's opening time
    const { displayOpenTime24 } = getIsOpen(language);
    if (!displayOpenTime24) {
      // Restaurant is closed today
      return null;
    }
    const [openHours, openMinutes] = displayOpenTime24.split(":").map(Number);
    const openTime = new Date();
    openTime.setHours(openHours!, openMinutes!, 0, 0);

    // The earliest possible time is the later of minTime and openTime
    const earliestTime = minTime > openTime ? minTime : openTime;

    return earliestTime.toTimeString().slice(0, 5); // Return in HH:MM format
  }

  // Function to get the latest possible pickup time
  function getMaxPickupTime() {
    const { displayCloseTime24 } = getIsOpen(language);
    if (!displayCloseTime24) {
      // Restaurant is closed today
      return null;
    }
    const [closeHours, closeMinutes] = displayCloseTime24
      .split(":")
      .map(Number);
    const closeTime = new Date();
    closeTime.setHours(closeHours!, closeMinutes!, 0, 0);

    return closeTime.toTimeString().slice(0, 5); // Return in HH:MM format
  }

  // Effect to validate the pickup time during user input
  useEffect(() => {
    if (pickupTimeOption === "Later" && pickupTime) {
      // Parse the selected pickup time
      const [hours, minutes] = pickupTime.split(":").map(Number);
      const pickupDateTime = new Date();
      pickupDateTime.setHours(hours!, minutes!, 0, 0);

      // Get earliest and latest possible pickup times
      const earliestTimeString = getMinPickupTime();
      const latestTimeString = getMaxPickupTime();

      if (earliestTimeString && latestTimeString) {
        // Parse earliest and latest times
        const [earliestHours, earliestMinutes] = earliestTimeString
          .split(":")
          .map(Number);
        const earliestDateTime = new Date();
        earliestDateTime.setHours(earliestHours!, earliestMinutes!, 0, 0);

        const [latestHours, latestMinutes] = latestTimeString
          .split(":")
          .map(Number);
        const latestDateTime = new Date();
        latestDateTime.setHours(latestHours!, latestMinutes!, 0, 0);
        // Move latestDateTime back by 15 minutes (preparation time)
        latestDateTime.setMinutes(latestDateTime.getMinutes() - 15);

        // Validate the pickup time
        if (pickupDateTime < earliestDateTime) {
          setTimeError(
            language === "en"
              ? "Please select a time at least 15 minutes from now and after the restaurant opens."
              : "Por favor, selecciona una hora al menos 15 minutos desde ahora y después de que el restaurante abra.",
          );
        } else if (pickupDateTime > latestDateTime) {
          setTimeError(
            language === "en"
              ? "Please select a time 15 minutes before the restaurant closes."
              : "Por favor, selecciona una hora 15 minutos antes de que el restaurante cierre.",
          );
        } else {
          setTimeError(""); // Time is valid
        }
      } else {
        // Restaurant is closed today
        setTimeError(
          language === "en"
            ? "Cannot select a time; the restaurant is closed today."
            : "No se puede seleccionar una hora; el restaurante está cerrado hoy.",
        );
      }
    } else {
      setTimeError(""); // Reset error if ASAP is selected or time is cleared
    }
  }, [pickupTime, pickupTimeOption, language]);

  // Function to handle checkout and place the order
  const handleCheckout = async () => {
    if (cart === null) return;
    setLoading(true);

    if (!restaurantIsOpen) {
      // Notify the user if the restaurant is closed
      toast({
        title:
          language === "en"
            ? "Restaurant is closed"
            : "El restaurante está cerrado",
        description:
          language === "en"
            ? "We are currently closed. You cannot place orders at this time. Check back during our regular business hours!"
            : "Actualmente estamos cerrados. No puedes hacer pedidos en este momento. ¡Vuelve durante nuestro horario comercial habitual!",
      });
      return;
    }

    let valid = true;

    // Validate email
    if (!isValidEmail(customerEmail)) {
      setEmailError(
        language === "en"
          ? "Please enter a valid email address."
          : "Por favor, introduce una dirección de correo electrónico válida.",
      );
      valid = false;
    } else {
      setEmailError("");
    }

    // Validate phone number
    if (!isValidPhoneNumber(customerPhone)) {
      setPhoneError(
        language === "en"
          ? "Please enter a valid 10-digit phone number."
          : "Por favor, introduce un número de teléfono válido de 10 dígitos.",
      );
      valid = false;
    } else {
      setPhoneError("");
    }

    // Check if there's a time error
    if (timeError) {
      valid = false;
    }

    if (!valid) {
      // If any validation fails, do not proceed
      return;
    }

    // Calculate order totals
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    const salesTax = subtotal * 0.06; // Assuming 6% sales tax
    const total = subtotal + salesTax;

    // Create an object with order details
    const orderDetails = {
      name: customerName,
      phone: customerPhone,
      email: customerEmail,
      specialRequests,
      pickupTimeOption,
      pickupTime: pickupTimeOption === "ASAP" ? "ASAP" : pickupTime,
      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price.toFixed(2),
        total: (item.price * item.quantity).toFixed(2),
      })),
      subtotal: subtotal.toFixed(2),
      salesTax: salesTax.toFixed(2),
      total: total.toFixed(2),
    };

    // Format pickup time for the toast message
    const formattedPickupTime =
      pickupTimeOption === "ASAP" ? "ASAP" : formatTime(pickupTime);

    // Helper function to format time from 24-hour to 12-hour format
    function formatTime(time: string) {
      const [hours, minutes] = time.split(":").map(Number);
      const period = hours! >= 12 ? "PM" : "AM";
      const formattedHours = hours! % 12 || 12;
      return `${formattedHours}:${minutes!
        .toString()
        .padStart(2, "0")} ${period}`;
    }

    // Send order details to the API route
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail: customerEmail,
          customerName: customerName,
          orderDetails: orderDetails,
          customerPhone: customerPhone,
          language: language,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Show a toast notification for successful order
      toast({
        title: language === "en" ? "Order Placed" : "Pedido Realizado",
        description:
          language === "en"
            ? `Your order has been placed! Your total is $${total.toFixed(
                2,
              )}. ${
                pickupTimeOption == "ASAP"
                  ? "Your order will be ready ASAP."
                  : `Your order will be ready at ${formattedPickupTime}.`
              } Thank you!`
            : `¡Tu pedido ha sido realizado! Tu total es $${total.toFixed(
                2,
              )}. ${
                pickupTimeOption == "ASAP"
                  ? "Tu pedido estará listo lo antes posible."
                  : `Tu pedido estará listo a las ${formattedPickupTime}.`
              } ¡Gracias!`,
      });

      // Clear cart and customer information after order is placed
      setLoading(false);
      setCart([]);
      setCustomerName("");
      setCustomerPhone("");
      setCustomerEmail("");
      setSpecialRequests("");
      setPickupTimeOption("ASAP");
      setPickupTime("");
      setTimeError("");
    } catch (error) {
      console.error("Error placing order:", error);
      toast({
        title: language === "en" ? "Order Failed" : "Pedido Fallido",
        description:
          language === "en"
            ? "There was an issue placing your order. Please try again later."
            : "Hubo un problema al realizar tu pedido. Por favor, inténtalo de nuevo más tarde.",
      });
    }
  };

  // Check if the pickup time is valid
  const isTimeValid =
    pickupTimeOption === "ASAP" ||
    (pickupTimeOption === "Later" && pickupTime.trim() !== "");

  // Check if the entire form is valid
  const isFormValid =
    customerName.trim() !== "" &&
    isValidEmail(customerEmail) &&
    isValidPhoneNumber(customerPhone) &&
    cart !== null &&
    cart.length > 0 &&
    isTimeValid &&
    timeError === "";

  // If cart is null (still loading), render nothing or a loader
  if (cart === null) {
    return null; // Could return a loading indicator here
  }

  // Main component rendering
  return (
    <div className="mb-12 w-full rounded-xl border-8 border-[#a80c94] bg-[#a80c94]">
      <div className="w-full rounded-xl border-8 border-[#200434] bg-[#f0ccf4] p-4 md:p-12">
        {/* Header */}
        <h1 className="mb-6 text-3xl font-bold" ref={topRef}>
          {language === "en" ? "Our Menu" : "Nuestro Menú"}
        </h1>

        {/* Display message if the restaurant is closed */}
        {!restaurantIsOpen && (
          <div className="mb-4 font-semibold text-red-500">
            {language === "en"
              ? "We are currently closed. You cannot place orders at this time. Check back during our regular business hours!"
              : "Actualmente estamos cerrados. No puedes hacer pedidos en este momento. ¡Vuelve durante nuestro horario comercial habitual!"}
          </div>
        )}

        {/* Search bar */}
        <div className="mb-4 flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-500" />
          <Input
            type="text"
            placeholder={
              language === "en" ? "Search menu..." : "Buscar en el menú..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-gray-800"
          />
        </div>

        {/* Navigation for categories and cart */}
        <nav className="sticky top-0 z-10 mb-8 bg-[#f0ccf4] py-4">
          <div className="flex-col justify-between space-y-2 md:hidden">
            <div className="flex items-center justify-center">
              <div>
                <ArrowLeft className="h-4 w-4" />
              </div>
              <div className="flex flex-nowrap items-center space-x-2 overflow-x-auto">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    size={"sm"}
                    onClick={() => scrollToSection(category)}
                    className={`bg-${category === "Taco Tuesday" || category === "Lunch Special (11:30 AM to 2:00 PM)" || category === "Martes de Tacos" || category === "Especial de Almuerzo (11:30 AM a 2:00 PM)" ? "[#a80c94] text-white" : "[#f8cca4]"}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <div>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <Button
                onClick={scrollToCart}
                className="flex-shrink-0 bg-[#a80c94] text-white"
              >
                {language === "en" ? "Checkout" : "Pagar"}
              </Button>
              <Button
                onClick={scrollToTop}
                className="flex-shrink-0 bg-[#a80c94] text-white"
                size={"icon"}
              >
                <ChevronUp />
              </Button>
            </div>
          </div>
          {/* Desktop Layout */}
          <div className="hidden items-center justify-between md:flex md:flex-wrap">
            <div className="mb-2 flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <Button
                  key={category}
                  variant="outline"
                  onClick={() => scrollToSection(category)}
                  className={`animate-fade-right border-none bg-${category === "Taco Tuesday" || category === "Lunch Special (11:30 AM to 2:00 PM)" || category === "Martes de Tacos" || category === "Especial de Almuerzo (11:30 AM a 2:00 PM)" ? "[#a80c94] text-white" : "[#f8cca4]"}`}
                  style={{
                    animationDelay: `${index * 75 + 100}ms`,
                  }}
                >
                  {category}
                </Button>
              ))}
              <Button
                onClick={scrollToCart}
                style={{
                  animationDelay: `${categories.length * 75 + 100}ms`,
                }}
                className="animate-fade-right bg-[#a80c94] text-white"
              >
                {language === "en" ? "Checkout" : "Pagar"}
              </Button>
              <Button
                onClick={scrollToTop}
                style={{
                  animationDelay: `${(categories.length + 1) * 75 + 100}ms`,
                }}
                className="animate-fade-right bg-[#a80c94] text-white"
                size={"icon"}
              >
                <ChevronUp />
              </Button>
            </div>
          </div>
        </nav>

        {/* Menu sections */}
        {categories.some((category) =>
          filteredItems.some((item) => item.category === category),
        ) ? (
          categories.map((category) => {
            const categoryItems = filteredItems.filter(
              (item) => item.category === category,
            );

            // Only render the category section if there are items in it
            if (categoryItems.length === 0) return null;

            return (
              <section
                key={category}
                ref={(el) => registerSectionRef(category, el)}
                className="mb-12 scroll-mt-20"
              >
                <h2
                  className="mb-4 text-2xl font-bold"
                  id={`section-${category.toLowerCase().replace(" ", "-")}`}
                >
                  {category}
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {categoryItems.map((item, index) => (
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
                          <Button
                            onClick={() => addToCart(item)}
                            disabled={!restaurantIsOpen}
                            className="bg-[#a80c94] text-white"
                          >
                            {restaurantIsOpen
                              ? language === "en"
                                ? "Add to Cart"
                                : "Añadir al Carrito"
                              : language === "en"
                                ? "Closed"
                                : "Cerrado"}
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </section>
            );
          })
        ) : (
          <div className="text-2xl font-bold">
            {language === "en"
              ? "No Items Found"
              : "No se encontraron artículos"}
          </div>
        )}

        {/* Cart section */}
        <div className="mt-8" ref={cartRef}>
          <h2 className="mb-4 text-2xl font-bold">
            {language === "en" ? "Your Cart" : "Tu Carrito"}
          </h2>
          {cart.length === 0 ? (
            <p>
              {language === "en"
                ? "Your cart is empty"
                : "Tu carrito está vacío"}
            </p>
          ) : (
            <div>
              {/* List of items in the cart */}
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="mb-2 flex items-center justify-between"
                >
                  <div>
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      (${(item.price * item.quantity).toFixed(2)})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={!restaurantIsOpen}
                    >
                      <Minus className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      disabled={!restaurantIsOpen}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}

              {/* Customer Information Form */}
              <div className="mt-6 space-y-4">
                {/* Name Field */}
                <div>
                  <Label htmlFor="name">
                    {language === "en" ? "Name" : "Nombre"}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={language === "en" ? "Your Name" : "Tu Nombre"}
                    className="border-none bg-white"
                    required
                  />
                </div>

                {/* Phone Number Field */}
                <div>
                  <Label htmlFor="phone">
                    {language === "en" ? "Phone Number" : "Número de Teléfono"}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder={
                      language === "en"
                        ? "Your Phone Number"
                        : "Tu Número de Teléfono"
                    }
                    required
                    className="border-none bg-white"
                  />
                  {phoneError && (
                    <p className="text-sm text-red-500">{phoneError}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder={
                      language === "en" ? "Your Email" : "Tu Correo Electrónico"
                    }
                    required
                    className="border-none bg-white"
                  />
                  {emailError && (
                    <p className="text-sm text-red-500">{emailError}</p>
                  )}
                </div>

                {/* Pickup Time Selection */}
                <div>
                  <Label>
                    {language === "en" ? "Pickup Time" : "Hora de Recogida"}
                  </Label>
                  <div className="flex items-center space-x-4">
                    {/* ASAP Option */}
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="pickupTimeOption"
                        value="ASAP"
                        checked={pickupTimeOption === "ASAP"}
                        onChange={(e) => setPickupTimeOption(e.target.value)}
                        className="mr-2"
                        disabled={!restaurantIsOpen}
                      />
                      {language === "en" ? "ASAP" : "Lo Antes Posible"}
                    </label>
                    {/* Specify Time Option */}
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="pickupTimeOption"
                        value="Later"
                        checked={pickupTimeOption === "Later"}
                        onChange={(e) => setPickupTimeOption(e.target.value)}
                        className="mr-2"
                        disabled={!restaurantIsOpen}
                      />
                      {language === "en" ? "Specify Time" : "Especificar Hora"}
                    </label>
                  </div>
                  {/* Time Input Field */}
                  {pickupTimeOption === "Later" && (
                    <div className="mt-2">
                      <Input
                        type="time"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        min={getMinPickupTime() || "00:00"}
                        max={getMaxPickupTime() || "23:59"}
                        disabled={!restaurantIsOpen}
                      />
                      {timeError && (
                        <p className="text-sm text-red-500">{timeError}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Special Requests Field */}
                <div>
                  <Label htmlFor="specialRequests">
                    {language === "en"
                      ? "Special Requests / Notes"
                      : "Peticiones Especiales / Notas"}
                  </Label>
                  <textarea
                    id="specialRequests"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder={
                      language === "en"
                        ? "Any substitutions, removals, food allergies, etc."
                        : "Cualquier sustitución, eliminación, alergias alimentarias, etc."
                    }
                    className="w-full rounded border p-2"
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="mt-6">
                <div className="flex justify-between">
                  <span>{language === "en" ? "Subtotal:" : "Subtotal:"}</span>
                  <span>
                    $
                    {cart
                      .reduce(
                        (total, item) => total + item.price * item.quantity,
                        0,
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>
                    {language === "en" ? "Sales Tax (6%):" : "Impuesto (6%):"}
                  </span>
                  <span>
                    $
                    {(
                      cart.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0,
                      ) * 0.06
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="mt-2 flex justify-between font-bold">
                  <span>{language === "en" ? "Total:" : "Total:"}</span>
                  <span>
                    $
                    {(
                      cart.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0,
                      ) * 1.06
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="mt-4 text-sm text-gray-500">
                {language === "en"
                  ? "Please note: Purchases for pickup orders must be made in-store. Prices or discounts are applied at the time of purchase."
                  : "Por favor, ten en cuenta: Las compras para pedidos de recogida deben hacerse en la tienda. Los precios o descuentos se aplican en el momento de la compra."}
              </p>

              {/* Checkout Button */}
              <Button
                className="mt-6 w-full bg-[#a80c94] text-white"
                onClick={handleCheckout}
                disabled={!isFormValid || !restaurantIsOpen}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : restaurantIsOpen ? (
                  language === "en" ? (
                    "Checkout"
                  ) : (
                    "Pagar"
                  )
                ) : language === "en" ? (
                  "Closed"
                ) : (
                  "Cerrado"
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
