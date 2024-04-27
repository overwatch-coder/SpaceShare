"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

type ListingCarouselProps = {
  listingImages: string[];
};

const ListingCarousel = ({ listingImages }: ListingCarouselProps) => {
  return (
    <Carousel
      id="listing-carousel-container"
      className="relative"
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 7000 })]}
    >
      <CarouselContent>
        {listingImages.map((listingImage, index) => (
          <CarouselItem key={index} className="rounded-md shadow-md w-full">
            <Image
              src={listingImage}
              alt={`listing image ${index + 1}`}
              width={500}
              height={500}
              quality={100}
              className="object-cover w-full h-full md:h-[500px] rounded-md"
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {listingImages.length > 1 && (
        <>
          <CarouselPrevious className="bg-white hover:bg-white text-black/70 hover:text-black border-2 absolute top-1/2 left-5" />
          <CarouselNext className="bg-white hover:bg-white text-black/70 hover:text-black border-2 absolute top-1/2 right-5" />
        </>
      )}
    </Carousel>
  );
};

export default ListingCarousel;
