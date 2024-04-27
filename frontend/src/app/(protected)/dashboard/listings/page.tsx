import { getListings } from "@/app/actions/listings.actions";
import { currentUser } from "@/app/actions/user.actions";
import { Property } from "@/types/index";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteAlert from "@/app/(protected)/dashboard/listings/DeleteAlert";

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
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl md:text-4xl font-semibold mb-4">
            My Listings
          </h2>
          <p className="text-gray-700">
            You have {listings.length}{" "}
            {listings.length === 1 ? "listing" : "listings"} available.
          </p>
        </div>

        <div className="mt-7 flex flex-col items-center pt-5">
          <Link
            href="/dashboard/listings/add-new"
            className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600 text-center w-full md:w-fit"
          >
            Add New Listing
          </Link>
        </div>
      </div>

      {/* Display all listings here */}
      {listings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="mt-4 border-b bg-gray-300 border-gray-200 pb-4 relative shadow-lg rounded-md p-3 md:p-5 flex flex-col gap-2"
            >
              <h3 className="text-gray-900 flex flex-col gap-1">
                <span className="font-semibold text-lg">Property Name</span>
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
                className="absolute top-2 right-2 bg-green-600 text-white text-xs text-center px-4 py-1 rounded-full w-20"
              >
                Edit
              </Link>

              <DeleteAlert listingId={listing._id} />
            </div>
          ))}
        </div>
      )}

      <div className="mt-7 flex flex-col items-center pt-5">
        <Link
          href="/dashboard/listings/add-new"
          className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600 text-center w-full md:w-fit"
        >
          Add New Listing
        </Link>
      </div>
    </div>
  );
};

export default ListingsPage;
