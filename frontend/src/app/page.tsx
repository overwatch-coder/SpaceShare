import { Button } from "@/components/ui/button";
import { getListings } from "@/actions/listings";
import { Property } from "@/types/index";
import Listing from "@/components/Listing";
import ProgressCounter from "@/components/ProgressCounter";
import Link from "next/link";
import Amenities from "@/components/Amenities";

const HomePage = async () => {
  const properties: Property[] = await getListings("properties");

  return (
    <div className="flex flex-col gap-5">
      {/* Hero Section */}
      <section
        id="welcome"
        className="bg-hero bg-center bg-cover bg-no-repeat h-full md:h-[80vh] lg:h-[100vh] py-16"
      >
        <div className="mt-24 md:mt-32 flex flex-col gap-6 md:gap-8 justify-center items-center max-w-2xl mx-auto">
          <p className="text-center tracking-wider font-medium text-white uppercase">
            <span className="text-pink-600">SheShare</span> Your Space,{" "}
            <br className="md:hidden" />
            <span className="text-pink-600">SheShare</span> Your Story
          </p>

          <h2 className="text-center font-bold text-4xl md:text-6xl text-white">
            Rent Your Dream Home
          </h2>

          <p className="text-center text-sm md:text-base text-white font-medium">
            Discover the perfect home away from home in our diverse selection of
            rentals. Choose the accommodation that best suits your needs.
          </p>

          {/* Call To Action Buttons */}
          <div className="text-center flex flex-col gap-4 md:flex-row md:items-center">
            <Button size="lg" className="bg-pink-500 hover:bg-pink-400">
              Share Your Room
            </Button>
            <Button size="lg" variant="secondary">
              Rent A Room
            </Button>
          </div>
        </div>
      </section>

      {/* Progress Counter */}
      <ProgressCounter />

      {/* Recent Listings for Rental */}
      <section className="flex flex-col gap-5 px-8 md:px-16 py-5">
        <h2 className="font-semibold text-3xl text-pink-500">
          Recent Listings
        </h2>
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
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {properties.slice(0, 4).map((property) => (
                <Listing key={property._id} property={property} />
              ))}
            </div>

            <Link
              href="/listings"
              className="w-fit uppercase text-gray-600 text-lg text-center py-4 hover:underline hover:text-pink-500 mx-auto"
            >
              See All Listings
            </Link>
          </div>
        )}
      </section>

      {/* Discover Amenities */}
      <Amenities />
    </div>
  );
};

export default HomePage;
