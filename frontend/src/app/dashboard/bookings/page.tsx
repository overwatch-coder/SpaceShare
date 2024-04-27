import UpdateBookingStatus from "@/app/dashboard/bookings/UpdateBookingStatus";
import { getBookings } from "@/app/actions/bookings.actions";
import { currentUser } from "@/app/actions/user.actions";
import { Booking } from "@/types/index";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Your Bookings - Dashboard",
  description: "Manage your bookings with ease",
};

const BookingsPage = async () => {
  const { user } = await currentUser();
  const bookings: Booking[] = await getBookings("bookings");
  return (
    <div className="container mx-auto py-8 flex flex-col gap-5 flex-1 w-full">
      <div className="bg-white p-2 md:p-6">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">My Bookings</h2>
        {bookings.length > 0 ? (
          <div className="flex flex-col gap-5">
            <p className="text-gray-700">
              {user.role === "host"
                ? `You have ${bookings.length} ${
                    bookings.length === 1 ? "booking" : "bookings"
                  } to manage`
                : `You have ${bookings.length} ${
                    bookings.length === 1 ? "booking" : "bookings"
                  }`}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8">
              {bookings.map((booking) => (
                <div key={booking._id} className="relative p-3 shadow-md">
                  <div className="flex flex-col gap-4 mb-4">
                    <div className="flex flex-col gap-2">
                      <p className="text-gray-700 flex flex-col gap-1">
                        <span className="font-semibold">Check-in Date:</span>{" "}
                        <span className="text-sm text-gray-500">
                          {new Date(booking.checkInDate).toDateString()}
                        </span>
                      </p>

                      <p className="text-gray-700 flex flex-col gap-1">
                        <span className="font-semibold">Check-out Date:</span>{" "}
                        <span className="text-sm text-gray-500">
                          {new Date(booking.checkOutDate).toDateString()}
                        </span>
                      </p>
                    </div>

                    <p
                      className={`absolute top-2 right-2 text-white text-center  rounded-full px-2 py-1 text-xs ${
                        booking.status === "pending" && "bg-gray-600"
                      } ${booking.status === "accepted" && "bg-green-600"} ${
                        booking.status === "rejected" && "bg-red-600"
                      } `}
                    >
                      {booking.status.toUpperCase()}
                    </p>

                    <p className="text-gray-700">
                      <span className="font-semibold">Number of People:</span>{" "}
                      <span className="text-sm text-gray-500">
                        {booking.numberOfGuests}
                      </span>
                    </p>

                    <p className="text-gray-700">
                      <span className="font-semibold">Property:</span>{" "}
                      <span className="text-sm text-gray-500">
                        {booking.property.name}
                      </span>
                    </p>

                    {user.role === "host" && (
                      <UpdateBookingStatus booking={booking} />
                    )}
                  </div>

                  {user.role === "client" && (
                    <div className="flex flex-col gap-5 mt-4">
                      <div>
                        <p className="text-gray-700">
                          <span className="font-semibold">Owner:</span>{" "}
                          <span className="text-sm text-gray-500">
                            {booking.property.owner.name}
                          </span>
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Location:</span>{" "}
                          <span className="text-sm text-gray-500">
                            {booking.property.location}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-700">
                          <span className="font-semibold">Rate Per Night:</span>{" "}
                          <span className="text-sm text-gray-500">
                            ${booking.property.ratePerNight}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-700">You have no bookings at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
