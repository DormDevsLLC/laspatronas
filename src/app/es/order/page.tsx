import { Metadata } from "next";
import Link from "next/link";
import RestaurantMenuEN from "~/components/menuen";
import Navbar from "~/components/navbar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export const metadata: Metadata = {
  title: "Order | Las Patronas UCF",
  description:
    "Order from Las Patronas, a family owned Mexican restaurant in Orlando, Florida, serving authentic Mexican cuisine.",
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

export default async function Home() {
  return (
    <>
      <Navbar language="es-US" />
      <div id="transition-page" className="h-full">
        <h1 className="my-10 w-full animate-fade-down text-center text-2xl font-bold">
          Place an Order!
        </h1>
        <div className="flex h-full w-full animate-fade-up items-center justify-center">
          <Tabs
            defaultValue="pickup"
            className="h-full w-full px-2 md:px-8 lg:px-12 xl:px-24"
          >
            <TabsList className="text-red grid w-full grid-cols-2 bg-[#2b034a]">
              <TabsTrigger className="bg-[#1c0230] text-white" value="pickup">
                Pick Up
              </TabsTrigger>
              <TabsTrigger className="bg-[#1c0230] text-white" value="delivery">
                Delivery
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pickup">
              <Card className="mb-12 h-full items-center py-8">
                <RestaurantMenuEN />
              </Card>
            </TabsContent>
            <TabsContent value="delivery" className="h-full">
              <Card className="h-full">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold">Delivery</CardTitle>
                  <CardDescription className="text-lg">
                    Place your order for delivery via DoorDash or UberEats!
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex w-full items-center justify-center space-x-8">
                  <Button size={"lg"}>
                    <Link
                      href={
                        "https://www.doordash.com/store/las-patronas-mexican-food-orlando-24954132/?srsltid=AfmBOoonDalF7-BZDDohIf7SbGxe4cotEoJiY844t61zlxawHHke-CqE"
                      }
                    >
                      Door Dash
                    </Link>
                  </Button>
                  <Button size={"lg"}>
                    <Link
                      href={
                        "https://www.ubereats.com/store/las-patronas-restaurant/4QP_I5fkVmW2npJmd59Zjw?srsltid=AfmBOooTZsg5OdYRdQ7gzRqF8Agr3vBf_DEHeyYIZ7y4VjPAL2LS-0zg"
                      }
                    >
                      Uber Eats
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
