import Image from "next/image";
import { Property } from "@/types/index";
import { IoBedSharp, IoPeople } from "react-icons/io5";
import Link from "next/link";

type PropertyProps = {
  property: Property;
};

const Listing = ({ property }: PropertyProps) => {
  return (
    <div className="flex flex-col gap-4 shadow-md rounded-lg pb-2">
      <div className="w-full h-full group">
        <Link href={`/listings/${property._id}`}>
          <Image
            src={property.coverImage}
            alt={property.name}
            width={150}
            height={150}
            quality={100}
            loading="lazy"
            className="object-cover group-hover:scale-105 w-full h-[180px] transition"
          />
        </Link>
      </div>

      <div className="flex flex-col justify-between px-3 py-5">
        <div className="mb-5">
          {/* First Row */}
          <div className="flex justify-between mb-2">
            <div className="flex items-center gap-1">
              <IoPeople className="text-black" />
              <span className="text-gray-600">
                {property.numberOfGuests}{" "}
                {property.numberOfGuests > 1 ? "Guests" : "Guest"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <IoBedSharp className="text-black" />
              <span className="text-gray-600">
                {property.numberOfRooms}{" "}
                {property.numberOfRooms > 1 ? "Rooms" : "Room"}
              </span>
            </div>
          </div>

          {/* Second Row */}
          <Link
            href={`/listings/${property._id}`}
            className="text-lg font-semibold text-black hover:text-pink-600 transition-colors"
          >
            {property.name}
          </Link>

          <p className="text-gray-600">{property.location}</p>
        </div>

        {/* Third Row */}
        <div className="border-t border-gray-200 pt-5">
          <p className="text-lg font-medium text-black">
            <span className="text-2xl">${property.ratePerNight}</span> / night
          </p>
        </div>
      </div>
    </div>
  );
};

export default Listing;
