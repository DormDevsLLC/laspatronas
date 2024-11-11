"use client";

import { Minus, Search, ShoppingCart, Trash } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "./ui/badge";
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

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
};

type CartItem = MenuItem & { quantity: number };

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Tacos",
    description: "Three tacos with your choice of meat",
    price: 10.99,
    category: "Main Courses",
  },
  {
    id: "2",
    name: "Chips and Guacamole",
    description: "Freshly made guacamole with crispy tortilla chips",
    price: 8.99,
    category: "Starters",
  },
  {
    id: "3",
    name: "Burrito",
    description: "Large burrito with rice, beans, and your choice of meat",
    price: 12.99,
    category: "Main Courses",
  },
  {
    id: "4",
    name: "Chocolate Brownie",
    description: "Rich chocolate brownie with vanilla ice cream",
    price: 6.99,
    category: "Desserts",
  },
  {
    id: "5",
    name: "Chips and Queso",
    description: "Warm queso dip with crispy tortilla chips",
    price: 4.99,
    category: "Starters",
  },
  {
    id: "6",
    name: "Flautas",
    description: "Crispy flautas with your choice of dessert filling",
    price: 7.99,
    category: "Desserts",
  },
];

export default function RestaurantMenu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]); // Initialize as empty array
  const [filteredItems, setFilteredItems] = useState(menuItems);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const categories = Array.from(
    new Set(menuItems.map((item) => item.category)),
  );
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const registerSectionRef = useCallback(
    (category: string, element: HTMLElement | null) => {
      sectionRefs.current[category] = element;
    },
    [],
  );

  // Load cart from localStorage on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    const filtered = menuItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredItems(filtered);
  }, [searchTerm]);

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const decreaseQuantity = (itemId: string) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0),
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== itemId),
    );
  };

  const scrollToSection = (category: string) => {
    const element = sectionRefs.current[category];
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCheckout = () => {
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    const salesTax = subtotal * 0.06;
    const total = subtotal + salesTax;

    const orderDetails = {
      name: customerName,
      phone: customerPhone,
      email: customerEmail,
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

    console.log("Order Details:", orderDetails);

    // Clear cart and customer information
    setCart([]);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    alert("Thank you for your order!");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Our Menu</h1>
      <div className="mb-4 flex items-center space-x-2">
        <Search className="h-5 w-5 text-gray-500" />
        <Input
          type="text"
          placeholder="Search menu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <nav className="sticky top-0 z-10 mb-8 border-b bg-background py-4">
        <ul className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <li key={category}>
              <Button
                variant="outline"
                onClick={() => scrollToSection(category)}
              >
                {category}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      {categories.map((category) => (
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
            {filteredItems
              .filter((item) => item.category === category)
              .map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{item.description}</p>
                    <p className="mt-2 font-bold">${item.price.toFixed(2)}</p>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => addToCart(item)}>Add to Cart</Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </section>
      ))}
      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
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
                  >
                    <Minus className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
            {/* Customer Information */}
            <div className="mt-6 space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Your Phone Number"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="Your Email"
                  required
                />
              </div>
            </div>
            {/* Order Summary */}
            <div className="mt-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
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
                <span>Sales Tax (6%):</span>
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
                <span>Total:</span>
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
            {/* Checkout Button */}
            <Button
              className="mt-6 w-full"
              onClick={handleCheckout}
              disabled={
                !customerName ||
                !customerPhone ||
                !customerEmail ||
                cart.length === 0
              }
            >
              Checkout
            </Button>
          </div>
        )}
      </div>
      <Badge variant="secondary" className="fixed bottom-4 right-4 p-3">
        <ShoppingCart className="mr-2 h-6 w-6" />
        <span className="sr-only">Items in cart:</span>
        {cart.reduce((total, item) => total + item.quantity, 0)}
      </Badge>
    </div>
  );
}
