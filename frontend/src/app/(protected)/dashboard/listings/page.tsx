import { deleteListing, getListings } from "@/app/actions/listings.actions";
import { currentUser } from "@/app/actions/user.actions";
import { Property } from "@/types/index";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Your Listings - Dashboard",
  description: "Manage your listings with ease",
};

const ListingsPage = async () => {
  const { user } = await currentUser();
  const allListings: Property[] = await getListings("properties");
  const listings =
    allListings.length > 0
      ? allListings.filter((listing) => listing.owner._id === user._id)
      : [];

  if (!user) {
    return redirect("/login?redirect=/dashboard/listings");
  }

  if (user.role !== "host") {
    return redirect("/dashboard");
  }

  return (
    <div className="bg-white mt-20 container w-full mx-auto py-16">
      <h2 className="text-2xl md:text-4xl font-semibold mb-4">My Listings</h2>
      <p className="text-gray-700">
        You have {listings.length}{" "}
        {listings.length === 1 ? "listing" : "listings"} available.
      </p>

      {/* Display all listings here */}
      {listings.length > 0 &&
        listings.map((listing) => (
          <div
            key={listing._id}
            className="mt-4 border-b border-gray-200 pb-4 relative shadow-md rounded-md p-3 md:p-5 flex flex-col gap-2"
          >
            <h3 className="text-gray-900 flex flex-col gap-1">
              <span className="font-semibold text-lg">Property</span>
              <span className="text-sm font-medium text-gray-700">
                {listing.name}
              </span>
            </h3>
            <p className="text-gray-700 flex flex-col gap-1">
              <span className="font-semibold">Location</span>{" "}
              <span className="text-sm font-medium">{listing.location}</span>
            </p>
            <Link
              href={`listings/${listing._id}`}
              className="absolute top-0 right-2 bg-green-600 text-white text-xs text-center px-3 py-1 rounded-full"
            >
              Edit
            </Link>

            <form action={deleteListing}>
              <input type="hidden" name="propertyId" value={listing._id} />
              <button
                type="submit"
                className="absolute top-10 right-2 bg-red-600 text-white text-xs text-center px-3 py-1 rounded-full"
              >
                Delete
              </button>
            </form>
          </div>
        ))}

      <div className="mt-7 flex flex-col items-center pt-5">
        <Link
          href="add-listing"
          className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600 text-center w-full md:w-fit"
        >
          Add New Listing
        </Link>
      </div>
    </div>
  );
};

export default ListingsPage;
