import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from 'react';

const links = [
  { name: "About", href: "/about" },
  { name: "Order", href: "/order" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false); // State for mobile menu
  const [isSheetOpen, setSheetOpen] = useState(false); // State for confirmation sheet

  // This function is called when the user confirms they want to delete
  const handleDeleteAccount = () => {
    // Here, you can simply log a message or perform any action you want
    console.log("Delete action confirmed!");
    setSheetOpen(false); // Close the confirmation sheet
  };

  return (
    <>
      <nav className="hidden h-[5vh] w-screen items-center justify-between overflow-hidden bg-[#1c0230] p-4 text-white md:flex">
        <div className="items-center justify-center">
          <Link href={"/"} className="ml-2 flex">
            <div className="flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Las Patronas UCF"
                width={50}
                height={50}
              />
              <div className="text-xl">Las Patronas UCF</div>
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-8 pr-8">
          {links.map((link) => (
            <Link
              href={link.href}
              className="text-xl transition-all duration-300 hover:text-2xl hover:text-purple-100"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
      {/*MOBILE NAVBAR*/}
      <nav className="flex h-[5vh] w-full items-center justify-between bg-[#1c0230] p-4 text-white md:hidden">
        <div className="items-center">
          <Link href={"/"} className="ml-2">
            <div className="flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Las Patronas UCF"
                width={50}
                height={50}
              />
              <div className="text-xl">Las Patronas UCF</div>
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-8 pr-8">
          <Button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="text-xl transition-all duration-300 hover:text-2xl"
          >
            Menu
          </Button>
          {isMenuOpen && (
            <div className="absolute mt-2 rounded bg-[#1c0230] p-4 shadow-lg">
              <Link
                href="/about"
                className="block text-lg hover:text-purple-100"
              >
                About
              </Link>
              <Link
                href="/order"
                className="block text-lg hover:text-purple-100"
              >
                Order
              </Link>
              <Link
                href="/contact"
                className="block text-lg hover:text-purple-100"
              >
                Contact
              </Link>
            </div>
          )}
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xl transition-all duration-300 hover:text-2xl hover:text-purple-100"
            >
              {link.name}
            </Link>
          ))}
          <button
            className="text-xl transition-all duration-300 hover:text-2xl hover:text-red-500"
            onClick={() => setSheetOpen(true)}
          >
            Delete Account
          </button>
        </div>
      </nav>

      {isSheetOpen && (
        <Sheet>
          <SheetTrigger onClick={() => setSheetOpen(false)}>Close</SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
            <div className="flex justify-end space-x-4">
              <button
                className="rounded bg-gray-300 px-4 py-2 text-black"
                onClick={() => setSheetOpen(false)}
              >
                Cancel
              </button>
              <button
                className="rounded bg-red-600 px-4 py-2 text-white"
                onClick={handleDeleteAccount}
              >
                Delete
              </button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
