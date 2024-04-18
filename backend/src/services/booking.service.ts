import Booking from "@/models/booking.model";
import { createHttpError, HttpStatusCode } from "@/middleware/error.middleware";
import { CreateBookingType, UpdateBookingType, UserType } from "@/types";

// find all bookings
export const findAllBookings = async (
  userId: string,
  owner: boolean = true
) => {
  try {
    if (owner) {
      const bookings = await Booking.find({ "property.owner": userId })
        .populate({
          path: "property",
          populate: [
            {
              path: "owner",
              select: "-password -__v",
            },
          ],
        })
        .populate({ path: "client", select: "-password -__v" })
        .lean()
        .exec();

      return bookings;
    }

    const bookings = await Booking.find({ client: userId })
      .populate({
        path: "property",
        populate: [
          {
            path: "owner",
            select: "-password -__v",
          },
        ],
      })
      .populate({ path: "client", select: "-password -__v" })
      .lean()
      .exec();

    return bookings;
  } catch (error: any) {
    console.log("Error while finding bookings: ", error.message);
    throw createHttpError(
      error.message || "Internal Server Error",
      error.statusCode || HttpStatusCode.InternalServerError
    );
  }
};

// find a single booking
export const findBooking = async (
  id: string,
  owner: boolean = true,
  userId: string
) => {
  try {
    if (owner) {
      const booking = await Booking.findOne({
        $and: [{ _id: id }, { "property.owner": userId }],
      })
        .populate({
          path: "property",
          populate: [
            {
              path: "owner",
              select: "-password -__v",
            },
          ],
        })
        .populate({ path: "client", select: "-password -__v" })
        .lean()
        .exec();

      return booking;
    }

    const booking = await Booking.findOne({
      $and: [{ _id: id }, { client: userId }],
    })
      .populate({
        path: "property",
        populate: [
          {
            path: "owner",
            select: "-password -__v",
          },
        ],
      })
      .populate({ path: "client", select: "-password -__v" })
      .lean()
      .exec();

    return booking;
  } catch (error: any) {
    console.log("Error while finding booking: ", error.message);
    throw createHttpError(
      error.message || "Internal Server Error",
      error.statusCode || HttpStatusCode.InternalServerError
    );
  }
};

// create a new booking
export const addBooking = async (
  bookingData: CreateBookingType,
  user: UserType
) => {
  try {
    // create new booking
    const createdBooking = await Booking.create({
      ...bookingData,
      status: "pending",
      client: user._id!,
    });

    // check if an error occurred
    if (!createdBooking) {
      throw createHttpError(
        "An error occurred while creating the booking",
        HttpStatusCode.InternalServerError
      );
    }

    return createdBooking;
  } catch (error: any) {
    console.log("Error while creating booking: ", error.message);
    throw createHttpError(
      error.message || "Internal Server Error",
      error.statusCode || HttpStatusCode.InternalServerError
    );
  }
};

// update a booking
export const updateExistingBooking = async (
  id: string,
  bookingData: UpdateBookingType,
  user: UserType
) => {
  try {
    // check if booking exists
    const existingBooking = await findBooking(
      id,
      user.role === "host",
      user._id!
    );

    if (!existingBooking) {
      throw createHttpError("Booking not found", HttpStatusCode.NotFound);
    }

    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: id },
      { ...bookingData, status: bookingData.status },
      { new: true }
    )
      .populate({ path: "owner", select: "-password -__v" })
      .lean()
      .exec();

    // check if there are no bookings
    if (!updatedBooking) {
      throw createHttpError(
        "An error occurred while updating the booking",
        HttpStatusCode.InternalServerError
      );
    }

    return updatedBooking;
  } catch (error: any) {
    console.log("Error while updating booking: ", error.message);
    throw createHttpError(
      error.message || "Internal Server Error",
      error.statusCode || HttpStatusCode.InternalServerError
    );
  }
};
