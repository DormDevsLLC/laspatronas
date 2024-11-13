import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acerca de | Las Patronas UCF",
  description:
    "Conoce más sobre Las Patronas, un restaurante mexicano familiar en Orlando, Florida, que sirve auténtica cocina mexicana.",
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

import Image from "next/image";
import Navbar from "~/components/navbar";

export default function About() {
  return (
    <>
      <Navbar language="es-ES" />
      <div
        id="transition-page"
        className="container mx-auto px-4 py-8 sm:px-6 sm:py-16 lg:px-8"
      >
        <h1 className="mb-8 animate-fade-down text-center text-3xl font-bold sm:mb-20 sm:text-4xl">
          Acerca de Nuestro Restaurante
        </h1>

        {/* Sección Acerca de */}
        <section className="mb-12 sm:mb-32">
          <div className="flex flex-col-reverse items-center gap-6 sm:gap-8 md:flex-row">
            <div className="order-2 w-full animate-fade-right md:order-1 md:w-1/2">
              <h2 className="mb-3 text-2xl font-semibold sm:mb-4 sm:text-3xl">
                Nuestra Historia
              </h2>
              <p className="text-base text-gray-700 sm:text-lg">
                Bienvenidos a Las Patronas, un restaurante mexicano familiar que
                combina sabores tradicionales con pasión moderna para ofrecer
                los sabores más auténticos de México. Comenzando como un food
                truck en 2021, hemos crecido hasta convertirnos en un
                restaurante de servicio completo que sirve a la comunidad de UCF
                y más allá.
              </p>
              <p className="mt-3 text-base text-gray-700 sm:mt-4 sm:text-lg">
                Nos enorgullece ofrecer una experiencia inolvidable de cocina
                mexicana. Si buscas un restaurante auténtico con un ambiente
                animado, Las Patronas es el lugar indicado.
              </p>
            </div>
            <div className="order-1 w-full animate-fade-left animate-delay-500 md:order-2 md:ml-12 md:w-1/2 lg:w-5/12">
              <div className="relative h-0 w-full pb-[56.25%]">
                {" "}
                {/* Relación de aspecto 16:9 */}
                <Image
                  src="/interior.png"
                  alt="Interior de restaurante familiar"
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 h-full w-full rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sección Misión */}
        <section className="">
          <div className="flex flex-col-reverse items-center gap-6 sm:gap-8 md:flex-row">
            <div className="w-full animate-fade-right animate-delay-500 md:mr-12 md:w-1/2 lg:w-5/12">
              <div className="relative h-0 w-full pb-[56.25%]">
                {" "}
                {/* Relación de aspecto 16:9 */}
                <Image
                  src="/truck.png"
                  alt="Platos mexicanos coloridos"
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 h-full w-full rounded-lg shadow-md"
                />
              </div>
            </div>
            <div className="w-full animate-fade-left md:w-1/2">
              <h2 className="mb-3 text-2xl font-semibold sm:mb-4 sm:text-3xl">
                Nuestra Misión
              </h2>
              <p className="text-base text-gray-700 sm:text-lg">
                En Las Patronas, nuestra misión es crear un ambiente cálido y
                acogedor donde las familias y amigos puedan reunirse para
                disfrutar de deliciosa y auténtica cocina mexicana. Estamos
                comprometidos a:
              </p>
              <ul className="mt-3 list-inside list-disc space-y-1 text-base text-gray-700 sm:mt-4 sm:space-y-2 sm:text-lg">
                <li>
                  Preservar y compartir las tradiciones culinarias de nuestra
                  familia
                </li>
                <li>
                  Utilizar ingredientes frescos y de alta calidad en cada plato
                </li>
                <li>
                  Brindar un servicio excepcional que haga sentir a cada cliente
                  como en familia
                </li>
                <li>
                  Apoyar a nuestra comunidad local a través de colaboraciones y
                  eventos
                </li>
                <li>
                  Innovar continuamente mientras permanecemos fieles a nuestras
                  raíces
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
