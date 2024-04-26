"use server";

import { currentUser } from "@/app/actions/user.actions";
import { BookingFormType, createBookingSchema } from "@/schema/bookings.schema";
import { CreateBooking, ResponseType } from "@/types/index";
import { revalidateTag } from "next/cache";

// submit booking
export const submitBookingForm = async (
  data: BookingFormType,
  property: string,
  client: string
) => {
  const { token } = await currentUser();

  const bookingData: CreateBooking = {
    ...data,
    property,
    client,
    status: "pending",
  };

  const bookingDataValidation = createBookingSchema.safeParse(bookingData);

  if (!bookingDataValidation.success) {
    return {
      error: {
        message: bookingDataValidation.error.errors.map(err => err.message),
      },
      success: false,
      data: null,
      stack: null,
    };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });

    const data: ResponseType = await res.json();

    if (!data.success) {
      return {
        error: {
          message: data.error?.message,
        },
        success: false,
        data: null,
        stack: process.env.NODE_ENV === "development" ? data.stack : null,
      };
    }

    revalidateTag("bookings");

    return {
      error: null,
      success: true,
      data: data.data,
      stack: null,
    };
  } catch (error: any) {
    return {
      error: { message: error?.message },
      success: false,
      data: null,
      stack: process.env.NODE_ENV === "development" ? error.stack : null,
    };
  }
};

// get bookings of the logged in user
export const getBookings = async (endpoint: string) => {
  const { token } = await currentUser();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 3600, tags: ["bookings"] },
  });

  const data: ResponseType = await res.json();

  if (!data.success) {
    return [];
  }

  return data.data;
};

// update booking
export const updateBookingStatus = async ({
  status,
  bookingId,
}: {
  status: string;
  bookingId: string;
}) => {
  const { token } = await currentUser();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    const data: ResponseType = await res.json();

    if (!data.success) {
      return {
        error: {
          message: data.error?.message,
        },
        success: false,
        data: null,
        stack: process.env.NODE_ENV === "development" ? data.stack : null,
        message: data.error?.message,
      };
    }

    revalidateTag("bookings");

    return {
      error: null,
      success: true,
      data: data.data,
      stack: null,
      message: data.message,
    };
  } catch (error: any) {
    return {
      error: { message: error?.message },
      success: false,
      data: null,
      stack: process.env.NODE_ENV === "development" ? error.stack : null,
      message: error?.message,
    };
  }
};
