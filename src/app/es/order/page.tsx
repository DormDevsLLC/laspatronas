import { Metadata } from "next";
import Link from "next/link";
import Navbar from "~/components/navbar";
import OrderPage from "~/components/order";
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
  title: "Ordenar | Las Patronas UCF",
  description:
    "Haz tu pedido en Las Patronas, un restaurante mexicano familiar en Orlando, Florida, que sirve auténtica cocina mexicana.",
  keywords: [
    "Las Patronas",
    "Restaurante Mexicano",
    "Orlando",
    "Universidad de Florida Central",
    "UCF",
    "Auténtica Cocina Mexicana",
    "Tacos",
    "Burritos",
    "Quesadillas",
    "Familiar",
  ],
};

export default async function Home() {
  return (
    <>
      <Navbar language="es-US" />
      <div id="transition-page" className="h-full">
        <h1 className="mb-2 mt-10 w-full animate-fade-down text-center text-3xl font-bold">
          Hacer un Pedido
        </h1>
        <div className="mb-4 w-full animate-fade-up px-4 text-center text-lg">
          Esperamos que tengas hambre. ¡Esperamos poder servirle! Haga un pedido
          aquí.
        </div>
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
              <OrderPage language="es" />
            </TabsContent>
            <TabsContent value="delivery" className="h-full">
              <div className="rounded-xl border-8 border-[#a80c94] bg-[#a80c94]">
                <Card className="h-full rounded-xl border-8 border-[#200434] bg-[#f0ccf4]">
                  <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold">
                      Entrega
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Realizar un pedido para entrega.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex w-full items-center justify-center space-x-8">
                    <Button size={"lg"} className="bg-[#a80c94] text-white">
                      <Link
                        href={
                          "https://www.doordash.com/store/las-patronas-mexican-food-orlando-24954132/?srsltid=AfmBOoonDalF7-BZDDohIf7SbGxe4cotEoJiY844t61zlxawHHke-CqE"
                        }
                      >
                        Door Dash
                      </Link>
                    </Button>
                    <Button size={"lg"} className="bg-[#a80c94] text-white">
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
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
