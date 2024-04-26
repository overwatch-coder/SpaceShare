"use client";

import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { bookFormSchema, BookingFormType } from "@/schema/bookings.schema";
import BookingFormSubmitBtn from "@/app/listings/[id]/BookingFormSubmitBtn";
import { Property } from "@/types/index";
import { submitBookingForm } from "@/app/actions/bookings.actions";
import { useAppDispatch } from "@/lib/hooks";
import { addToBookings } from "@/store/slices/bookings.slice";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

type BookingFormProps = {
  property: Property;
};

const BookingForm = ({ property }: BookingFormProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    reset,
    formState: { errors, isSubmitting: pending },
    handleSubmit,
  } = useForm<BookingFormType>({
    resolver: zodResolver(bookFormSchema),
    mode: "all",
  });

  const processBookSubmit: SubmitHandler<BookingFormType> = async (data) => {
    const result = await submitBookingForm(data, property._id, user?._id!);
    if (!result.success) {
      return Swal.fire({
        title: "Oops!",
        text: Array.isArray(result.error?.message)
          ? result.error?.message.join(", ")
          : result.error?.message,
        icon: "error",
        timer: 4000,
        timerProgressBar: true,
      });
    }

    dispatch(addToBookings(result.data));

    Swal.fire({
      title: "Thank you!",
      text: "SheShare Rental Booking Successful.",
      icon: "success",
      timer: 4000,
      timerProgressBar: true,
    });

    reset();

    router.replace("/dashboard/bookings");
  };

  return (
    <form
      onSubmit={handleSubmit(processBookSubmit)}
      className="flex flex-col gap-6"
    >
      {/* Check In date */}
      <div className="flex flex-col space-y-4 w-full">
        <label htmlFor="checkInDate">Check In</label>
        <div className="relative">
          <FaCalendarAlt
            size={16}
            className="text-gray-500 absolute top-3 left-2"
          />
          <input
            type="date"
            className="px-10 py-2 rounded text-black placeholder:text-sm w-full focus:border-0 ring-0 outline-none"
            {...register("checkInDate")}
            min={
              new Date(property.minAvailableDate).toISOString().split("T")[0]
            }
            max={
              new Date(property.maxAvailableDate).toISOString().split("T")[0]
            }
          />
        </div>
        {errors?.checkInDate?.message && (
          <p className="text-red-500 text-xs py-2">
            {errors.checkInDate.message}
          </p>
        )}
      </div>

      {/* Check Out date */}
      <div className="flex flex-col space-y-4 w-full">
        <label htmlFor="checkOutDate">Check Out</label>
        <div className="relative">
          <FaCalendarAlt
            size={16}
            className="text-gray-500 absolute top-3 left-2"
          />
          <input
            type="date"
            className="px-10 py-2 rounded text-black placeholder:text-sm w-full focus:border-0 ring-0 outline-none"
            {...register("checkOutDate")}
            min={
              new Date(property.minAvailableDate).toISOString().split("T")[0]
            }
            max={
              new Date(property.maxAvailableDate).toISOString().split("T")[0]
            }
          />
        </div>
        {errors?.checkOutDate?.message && (
          <p className="text-red-500 text-xs py-2">
            {errors.checkOutDate.message}
          </p>
        )}
      </div>

      {/* Number of Guests */}
      <div className="flex flex-col space-y-4 w-full">
        <label htmlFor="numberOfGuests">Number of People</label>
        <div className="relative">
          <select
            id="numberOfGuests"
            className="px-4 py-2 rounded text-black placeholder:text-sm w-full focus:border-0 ring-0 outline-none"
            {...register("numberOfGuests")}
          >
            <option>Number of People</option>
            {Array.from({ length: 6 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                0{num}
              </option>
            ))}
          </select>
        </div>
        {errors?.numberOfGuests?.message && (
          <p className="text-red-500 text-xs py-2">
            {errors.numberOfGuests.message}
          </p>
        )}
      </div>

      {/* Submit form button */}
      {user === null || (user && user.role === "client") ? (
        <BookingFormSubmitBtn pending={pending} reset={reset} />
      ) : (
        <p className="text-sm py-3 font-semibold text-center">
          Only clients can book properties/listings
        </p>
      )}
    </form>
  );
};

export default BookingForm;
