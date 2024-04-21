import Booking from "@/models/booking.model";
import { createHttpError, HttpStatusCode } from "@/middleware/error.middleware";
import { CreateBookingType, UpdateBookingType, UserType } from "@/types";
import { findPropertiesByUserId } from "@/services/property.service";

// find all bookings
export const findAllBookings = async (
  userId: string,
  owner: boolean = true
) => {
  try {
    if (owner) {
      // get all properties of the logged in user
      const ownerProperties = await findPropertiesByUserId(userId);

      // get all bookings of the property owner
      const bookingsPromise = ownerProperties.map(async (property) => {
        const bookings = await Booking.find({ property: property._id })
          .populate({
            path: "property",
            populate: [
              {
                path: "owner",
                select: "name username _id email",
              },
            ],
          })
          .populate({ path: "client", select: "name username _id email" })
          .lean()
          .exec();

        return bookings;
      });

      const bookings = await Promise.all(bookingsPromise);

      return bookings.filter((booking) => booking.length > 0)[0];
    }

    // get all bookings of the logged in user
    const bookings = await Booking.find({ client: userId })
      .populate({
        path: "property",
        populate: [
          {
            path: "owner",
            select: "name username _id email",
          },
        ],
      })
      .populate({ path: "client", select: "name username _id email" })
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
  bookingId: string,
  owner: boolean = true,
  userId: string
) => {
  try {
    if (owner) {
      // find all bookings of the property owner
      const bookings = await findAllBookings(userId, owner);

      // check if there are no bookings
      if (!bookings || bookings.length === 0) {
        return null;
      }

      // find the booking using id and return it
      const booking = bookings.filter(
        (booking) => booking._id.toString() === bookingId
      )[0];

      return booking;
    }

    const booking = await Booking.findOne({
      $and: [{ _id: bookingId }, { client: userId }],
    })
      .populate({
        path: "property",
        populate: [
          {
            path: "owner",
            select: "name username _id email",
          },
        ],
      })
      .populate({ path: "client", select: "name username _id email" })
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
      checkInDate: new Date(bookingData.checkInDate).toISOString(),
      checkOutDate: new Date(bookingData.checkOutDate).toISOString(),
      status: bookingData.status || "pending",
      client: user._id!,
    });

    // check if an error occurred
    if (!createdBooking) {
      throw createHttpError(
        "An error occurred while creating the booking",
        HttpStatusCode.InternalServerError
      );
    }

    return findBooking(
      createdBooking._id.toString(),
      user.role === "host",
      user._id
    );
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
      throw createHttpError(
        "Not authorized to delete this booking",
        HttpStatusCode.Unauthorized
      );
    }

    // update booking
    // NB: The status is only updated if the user is a host
    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: existingBooking._id },
      {
        ...bookingData,
        status:
          user.role === "client" ? existingBooking.status : bookingData.status,
      },
      { new: true }
    )
      .lean()
      .exec();

    // check if there are no bookings
    if (!updatedBooking) {
      throw createHttpError(
        "An error occurred while updating the booking",
        HttpStatusCode.InternalServerError
      );
    }

    return findBooking(
      updatedBooking._id.toString(),
      user.role === "host",
      user._id
    );
  } catch (error: any) {
    console.log("Error while updating booking: ", error.message);
    throw createHttpError(
      error.message || "Internal Server Error",
      error.statusCode || HttpStatusCode.InternalServerError
    );
  }
};

// delete a booking
export const removeBooking = async (id: string, user: UserType) => {
  try {
    // check if booking exists
    const existingBooking = await findBooking(
      id,
      user.role === "host",
      user._id!
    );

    if (!existingBooking) {
      throw createHttpError(
        "Not authorized to delete this booking",
        HttpStatusCode.Unauthorized
      );
    }

    const removedBooking = await Booking.findOneAndDelete({
      _id: existingBooking._id,
    });

    if (!removedBooking) {
      throw createHttpError(
        "An error occurred while deleting the booking",
        HttpStatusCode.InternalServerError
      );
    }

    return removedBooking;
  } catch (error: any) {
    console.log("Error while deleting booking: ", error.message);
    throw createHttpError(
      error.message || "Internal Server Error",
      error.statusCode || HttpStatusCode.InternalServerError
    );
  }
};
