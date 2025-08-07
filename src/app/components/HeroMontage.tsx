"use client";

import React from "react";
import Image from "next/image";

const images = [
  {
    src: "https://cdn.sanity.io/images/y5onebmh/production/f6d839b6adee4fb82d1a6ba1de5f3b5499d1d56d-4681x3097.jpg",
    alt: "Tokyo cityscape with modern skyscrapers and traditional architecture blending harmoniously"
  },
  {
    src: "https://cdn.sanity.io/images/y5onebmh/production/3810f2775919d8f030cb49786f7b7152ee8d60f0-5770x3847.jpg",
    alt: "Traditional Japanese temple with cherry blossoms in full bloom during spring"
  },
  {
    src: "https://cdn.sanity.io/images/y5onebmh/production/8ffc5f436ef7767c8873e674158ba85853c31f66-7931x5290.jpg",
    alt: "Scenic Japanese mountain landscape with autumn foliage and peaceful lake"
  },
  {
    src: "https://cdn.sanity.io/images/y5onebmh/production/c333e9c0a36aac830c8e78f20579d297e05f1bd4-6000x3376.jpg",
    alt: "Bustling Tokyo street at night with colorful neon signs and vibrant city life"
  },
  {
    src: "https://cdn.sanity.io/images/y5onebmh/production/c5c018b8f4705f535b591b0e18cd8ec462c93ab4-3018x2368.jpg",
    alt: "Traditional Japanese garden with stone pathway and meticulously maintained landscaping"
  },
  {
    src: "https://cdn.sanity.io/images/y5onebmh/production/7499803d4811299269a6575d5dcdc2ae955a2cdd-7360x4912.jpg",
    alt: "Historic Japanese castle surrounded by blooming cherry blossom trees"
  },
  {
    src: "https://cdn.sanity.io/images/y5onebmh/production/c87922d7df7b0469d9e626dcaa98a399d695eab3-6728x4485.jpg",
    alt: "Serene Japanese countryside with rice paddies and traditional farmhouses"
  },
  {
    src: "https://cdn.sanity.io/images/y5onebmh/production/585051b2af5a7a46c3272ab90b4c07f7a2f67acc-4926x3080.jpg",
    alt: "Japanese cultural experience showing traditional tea ceremony in authentic setting"
  },
];

const IMAGE_WIDTH = 600;
const numImages = images.length;
const totalWidth = IMAGE_WIDTH * numImages * 2;
const animationDistance = IMAGE_WIDTH * numImages;

export default function HeroMontage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full h-[480px] overflow-hidden bg-black">
      {/* Scrolling Images */}
      <div
        className="absolute inset-0 flex items-center h-full animate-scroll-montage"
        style={{ width: totalWidth }}
      >
        {[...images, ...images].map((image, i) => (
          <Image
            key={i}
            src={image.src}
            alt={image.alt}
            width={600}
            height={480}
            className="h-full w-[600px] object-cover opacity-80"
            style={{ flex: "0 0 auto" }}
            draggable={false}
            priority={i < 2} // Preload first 2 images for better performance
          />
        ))}
      </div>
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      {/* Static Hero Text */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white">
        {children}
      </div>
    </div>
  );
}
