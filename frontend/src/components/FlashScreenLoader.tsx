import React from "react";
import logo from "@/assets/logo2.png";
import Image from "next/image";

const FlashScreenLoader = () => {
  return (
    <div className="flex flex-col gap-4 h-screen items-center justify-center bg-primary-dark">
      <Image
        src={logo}
        alt="logo"
        width={120}
        height={120}
        quality={100}
        loading="lazy"
        className="object-contain animate-bounce"
      />
      <p className="font-semibold flex flex-col animate-bounce">
        <span className="text-pink-500 text-xl">SheShare</span>
        <span className="text-xs text-white">Vacation Rentals</span>
      </p>
    </div>
  );
};

export default FlashScreenLoader;
