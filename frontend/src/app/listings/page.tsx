import { getListings } from "@/actions/listings";
import Listing from "@/components/Listing";
import { Property } from "@/types/index";
import { Metadata } from "next";
import React from "react";

export const meta: Metadata = {
  title: "Available Listings - SheShare Vacation Rentals",
  description: "Show all available listings",
};

const ListingPage = async () => {
  const properties: Property[] = await getListings("properties");
  return (
    <div className="px-8 md:px-16 mt-32 flex flex-col gap-5 py-10">
      <h2 className="font-semibold text-4xl text-pink-500">All Listings</h2>
      <p className="font-medium text-primary-dark/70 text-sm md:text-lg max-w-2xl">
        We aim to make the rental process straightforward and transparent,
        ensuring that you find the perfect home and have a positive experience
        from start to finish.
      </p>

      {properties.length === 0 ? (
        <div className="py-5 text-center mx-auto">
          <p className="text-xl text-center font-semibold">
            Sorry, No Listings Available
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {properties.map((property) => (
            <Listing key={property._id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingPage;
