import { Metadata } from "next";
import { getServerUser } from "@/app/actions/user.actions";
import { redirect } from "next/navigation";
import { Property } from "@/types/index";
import { deleteListing, getListings } from "@/app/actions/listings.actions";
import UserBookings from "@/app/(protected)/dashboard/UserBookings";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard - SheShare Vacation Rentals",
  description: "Manage your account, rentals and bookings with ease",
};

const DashboardPage = async () => {
  const { user } = await getServerUser();
  if (!user) {
    return redirect("/login");
  }

  const allListings: Property[] = await getListings("properties");
  const listings =
    allListings.length > 0
      ? allListings.filter((listing) => listing.owner._id === user._id)
      : [];

  return (
    <section className="container mx-auto py-8 mt-32 px-8 md:px-16">
      <h1 className="text-3xl font-semibold mb-6 text-pink-500">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Account Management Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="mb-4">
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Username:</span> {user.username}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
          </div>
          <button className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600">
            Edit Profile
          </button>
        </div>

        {/* Bookings Section */}
        <UserBookings />

        {/* Listings Section */}
        {user.role === "host" && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">My Listings</h2>
            <p className="text-gray-700">
              You have {listings.length} listings available.
            </p>

            {/* Display all listings here */}
            {listings.length > 0 &&
              listings.map((listing) => (
                <div
                  key={listing._id}
                  className="mt-4 border-b border-gray-200 pb-4 relative shadow-md rounded-md p-3 flex flex-col gap-2"
                >
                  <h3 className="text-gray-900 flex flex-col gap-1">
                    <span className="font-semibold text-lg">Property</span>
                    <span className="text-sm font-medium text-gray-700">
                      {listing.name}
                    </span>
                  </h3>
                  <p className="text-gray-700 flex flex-col gap-1">
                    <span className="font-semibold">Location</span>{" "}
                    <span className="text-sm font-medium">
                      {listing.location}
                    </span>
                  </p>
                  <Link
                    href={`listings/${listing._id}`}
                    className="absolute top-0 right-2 bg-green-600 text-white text-xs text-center px-3 py-1 rounded-full"
                  >
                    Edit
                  </Link>

                  <form action={deleteListing}>
                    <input
                      type="hidden"
                      name="propertyId"
                      value={listing._id}
                    />
                    <button
                      type="submit"
                      className="absolute top-10 right-2 bg-red-600 text-white text-xs text-center px-3 py-1 rounded-full"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              ))}

            <div className="mt-7 flex flex-col pt-5">
              <Link
                href="add-listing"
                className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600 text-center w-full"
              >
                Add New Listing
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardPage;
