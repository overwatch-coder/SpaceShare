import React from "react";
import Link from "next/link";
import { amenities } from "@/constants";

const Amenities = () => {
  return (
    <section className="flex flex-col items-center text-center mx-auto gap-5 px-8 md:px-16 pb-10 pt-5">
      <h3 className="font-bold text-4xl text-pink-500">Available Amenities</h3>
      <p className="text-center font-medium text-gray-500 max-w-xl">
        You can find detailed information about each rental, including photos,
        amenities, location, and rental terms.
      </p>

      <div className="flex items-start md:items-center gap-5 flex-wrap justify-center">
        {amenities.map((amenity, index) => (
          <Link
            key={index}
            href={`/listings?search=${amenity.name.toLowerCase()}`}
            className="w-32 flex flex-col gap-4 items-center text-center p-4 rounded-md hover:shadow-md cursor-pointer"
          >
            <amenity.icon size={30} />
            <span className="font-semibold">{amenity.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Amenities;
