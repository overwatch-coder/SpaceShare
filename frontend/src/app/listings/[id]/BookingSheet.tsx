import { currentUser } from "@/app/actions/user.actions";
import BookingForm from "@/app/listings/[id]/BookingForm";
import { Property } from "@/types/index";
import React from "react";

type BookingFormProps = {
  property: Property;
};

const BookingSheet = async ({ property }: BookingFormProps) => {
  const { user } = await currentUser();
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-6 bg-gray-200 rounded-md shadow p-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-pink-600 font-semibold mb-2 border-b border-gray-400 text-2xl">
            Amenities
          </h3>

          <div className="flex flex-col gap-4">
            {property.amenities.length ? (
              <ul className="list-disc list-inside">
                {property.amenities.map((amenity) => (
                  <li className="capitalize" key={amenity.slug}>
                    {amenity.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center font-medium text-xl">
                No amenities provided yet
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 bg-gray-200 rounded-md shadow p-4 mt-5">
        <div className="flex flex-col gap-4">
          <h3 className="text-pink-600 font-semibold">
            <span className="text-3xl">${property.ratePerNight}</span> / night
          </h3>

          <p className="text-gray-400 text-sm">
            {new Date(property.minAvailableDate).toDateString()} -{" "}
            {new Date(property.maxAvailableDate).toDateString()}
          </p>
        </div>

        {/* Booking Form */}
        {user === null && <BookingForm property={property} />}
        {user && user.role === "client" && <BookingForm property={property} />}
      </div>
    </section>
  );
};

export default BookingSheet;
