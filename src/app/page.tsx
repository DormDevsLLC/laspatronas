import Image from "next/image";

export default async function Home() {
  return (
    <div className="relative flex h-screen w-full items-center justify-between overflow-hidden bg-lime-100">
      {/* Left-hand image */}
      <div className="flex h-full w-full items-center justify-center lg:w-5/12 lg:items-start lg:justify-normal">
        <div className="md: relative mb-12 h-auto w-full px-8 md:mb-36 md:px-12 lg:m-20 lg:px-0">
          <Image
            src="/patronas-hero-header.png"
            alt="Hero"
            layout="responsive"
            width={100} // Set aspect ratio by defining width
            height={60} // Set aspect ratio by defining height
            objectFit="contain" // Maintains the aspect ratio of the image
          />
        </div>
      </div>

      {/* Right-hand image */}
      <div className="relative hidden h-full w-4/12 lg:flex">
        <Image
          src="/hero-flowers.png"
          alt="Hero"
          layout="fill"
          objectFit="fill" // Ensures the image covers the full height and width
          className="right-0"
        />
      </div>
    </div>
  );
}
