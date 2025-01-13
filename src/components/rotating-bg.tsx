"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const RotatingBackground = () => {
  const [images, setImages] = useState<string[]>([]);
  const desktopImages = [
    "/d1.jpeg",
    "/d2.jpeg",
    "/d3.jpeg",
    "/d4.jpeg",
    "/d5.jpeg",
    "/d6.jpeg",
  ];

  const mobileImages = [
    "/m1.jpeg",
    "/m2.jpeg",
    "/m3.jpeg",
    "/m4.jpeg",
    "/m5.jpeg",
    "/m6.jpeg",
    "/m7.jpeg",
    "/m8.jpeg",
    "/m9.jpeg",
    "/m10.jpeg",
    "/m11.jpeg",
    "/m12.jpeg",
    "/m13.jpeg",
    "/m14.jpeg",
  ];

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    setImages(isMobile ? mobileImages : desktopImages);
  }, []);

  // Current index in the rotation
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Rotate every 5 seconds (5000 ms)
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    // Clean up when the component unmounts
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-full w-full">
      {images.map((imageSrc, index) => (
        <div
          key={index}
          // Stacked images (absolute) so that only the currentIndex is shown via opacity
          className={`absolute left-0 top-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={imageSrc}
            alt={`Rotating background ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0} // optionally load the first image as priority
          />
        </div>
      ))}
    </div>
  );
};

export default RotatingBackground;
