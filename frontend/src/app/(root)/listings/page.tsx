import Listings from "@/app/(root)/listings/Listings";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Available Listings - SheShare Vacation Rentals",
  description: "Show all available listings",
};

const ListingPage = async () => {
  return (
    <div className="px-8 md:px-16 mt-32 flex flex-col gap-5 py-10">
      <h2 className="font-semibold text-4xl text-pink-500">All Listings</h2>
      <p className="font-medium text-primary-dark/70 text-sm md:text-lg max-w-2xl">
        We aim to make the rental process straightforward and transparent,
        ensuring that you find the perfect home and have a positive experience
        from start to finish.
      </p>

      <Listings />
    </div>
  );
};

export default ListingPage;
