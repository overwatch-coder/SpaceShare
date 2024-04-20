import { getListings } from "@/actions/listings";
import BreadCrumpLinks from "@/components/BreadCrumpLinks";
import { Property } from "@/types/index";
import { Metadata } from "next";
import React from "react";

type ListingDetailsPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id },
}: ListingDetailsPageProps): Promise<Metadata> {
  const property: Property = await getListings(`properties/${id}`);

  return {
    title: property.name,
    description: property.description,
    keywords: property.name,
    openGraph: {
      title: property.name,
      description: property.description,
      images: [property.coverImage, ...property.images],
    },
  };
}

const ListingDetailsPage = async ({
  params: { id },
}: ListingDetailsPageProps) => {
  const property: Property = await getListings(`properties/${id}`);

  return (
    <div className="mt-32 px-8 md:px-16 flex flex-col gap-10 py-10">
      <BreadCrumpLinks />

      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-4">{property.name}</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="bg-white shadow-md rounded-lg p-6 flex-1">
            <h2 className="text-xl font-semibold mb-4">Booking Sheet</h2>
            <div className="mb-4">
              <p>
                <strong>Check-in:</strong> 09/29/2020
              </p>
              <p>
                <strong>Check-out:</strong> 09/29/2020
              </p>
              <p>
                <strong>Number of Persons:</strong> 2
              </p>
              <p>
                <strong>Number of Rooms:</strong> 1
              </p>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Book Now
            </button>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 flex-1">
            <h2 className="text-xl font-semibold mb-4">Property Amenities</h2>
            <div className="mb-4">
              <ul className="list-disc list-inside">
                {property.amenities.length === 0 ? (
                  <li>No amenities provided</li>
                ) : (
                  property.amenities.map((amenity) => (
                    <li key={amenity.slug} className="capitalize">
                      {amenity.name}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Price Details</h2>
          <div className="border-t border-gray-200 pt-5">
            <p className="text-lg font-medium text-black">
              <span className="text-2xl">${property.ratePerNight}</span> / night
            </p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p>{property.description}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Average Ratings:{" "}
            {property.rating > 0 ? property.rating : "No ratings yet"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsPage;
