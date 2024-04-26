import ListingCarousel from "@/components/ListingCarousel";
import { formatTimeAgo } from "@/lib/timeago";
import { Property } from "@/types/index";
import { IoLocationSharp } from "react-icons/io5";

type ListingDetailsSummaryProps = {
  property: Property;
};

const ListingDetailsSummary = ({ property }: ListingDetailsSummaryProps) => {
  const listingImages =
    property.images.length > 0
      ? [property.coverImage, ...property.images]
      : [property.coverImage];

  return (
    <section className="flex flex-col gap-5 md:gap-7">
      <ListingCarousel listingImages={listingImages} />

      <div className="flex flex-col gap-3 py-4">
        <h3 className="font-semibold text-2xl md:text-4xl text-pink-600">
          {property.name}
        </h3>

        <div className="flex items-center justify-between">
          <p className="text-center text-black flex items-center justify-center gap-3">
            <IoLocationSharp size={30} className="text-black" />
            <span className="text-lg font-medium">{property.location}</span>
          </p>

          <p className="text-lg font-medium text-black">
            <span className="text-2xl">${property.ratePerNight}</span> / night
          </p>
        </div>
      </div>

      <div className="border-t border-gray-400 pt-5">
        <h3 className="text-xl font-semibold mb-2">Description</h3>
        <p className="text-gray-600">{property.description}</p>
      </div>

      <div className="border-t border-gray-400 pt-5 flex flex-col gap-5">
        <p className="text-lg">
          <span className="font-semibold">Average Rating:</span>{" "}
          {property.rating > 0 ? property.rating : "No ratings yet"}
        </p>
        {property.address && (
          <p className="text-lg">Address: {property.address}</p>
        )}
        <p className="text-lg capitalize">
          <span className="font-semibold">Listed:</span>{" "}
          {formatTimeAgo(new Date(property.createdAt))}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Available Between:</span>{" "}
          {new Date(property.minAvailableDate).toDateString()} -{" "}
          {new Date(property.maxAvailableDate).toDateString()}
        </p>
        <p className="text-lg capitalize">
          <span className="font-semibold">Listing Status:</span>{" "}
          {property.status}
        </p>
      </div>

      <div className="border-t border-gray-400 pt-5 flex flex-col gap-4">
        <h3 className="text-xl font-semibold mb-2">Owner Details</h3>
        <p className="text-lg">
          <span className="font-semibold">Name:</span> {property.owner.name}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Username:</span>{" "}
          {property.owner.username}
        </p>
        <p className="text-lg">
          Want to email the owner?{" "}
          <a
            href={`mailto:${property.owner.email}`}
            className="text-pink-600 hover:underline"
          >
            Click here
          </a>
        </p>
      </div>
    </section>
  );
};

export default ListingDetailsSummary;
