import { Metadata } from "next";
import Navbar from "~/components/navbar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
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
      <Navbar language="en-US" />
      <div id="transition-page">
        <h1 className="my-10 w-full text-center text-2xl font-bold">Order</h1>
        <div className="mt-12 flex w-full items-center justify-center">
          <Tabs defaultValue="pickup" className="w-full px-24">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pickup">Pick Up</TabsTrigger>
              <TabsTrigger value="delivery">Delivery</TabsTrigger>
            </TabsList>
            <TabsContent value="pickup">
              <Card>
                <CardHeader>
                  <CardTitle>Pick Up</CardTitle>
                  <CardDescription>
                    Place an order for pick up at our restaurant!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Order</Label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Order</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="delivery">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery</CardTitle>
                  <CardDescription>
                    Place your order for delivery via DoorDash!
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button>Door Dash Button</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
