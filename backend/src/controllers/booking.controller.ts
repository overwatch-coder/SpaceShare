import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { createHttpError, HttpStatusCode } from "@/middleware/error.middleware";
import { isValidObjectId } from "mongoose";
import { CreateBookingType, UpdateBookingType } from "@/types";
import {
  addBooking,
  findAllBookings,
  findBooking,
  removeBooking,
  updateExistingBooking,
} from "@/services/booking.service";

/**
  @desc    GET ALL BOOKINGS
  @route   /api/bookings
  @method  GET
  @access  private
*/
export const getAllBookings = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user;

    // call find all bookings service
    const bookings = await findAllBookings(user._id!, user.role === "host");

    // check if there are no bookings
    if ((Array.isArray(bookings) && bookings.length === 0) || !bookings) {
      res.status(200).json({
        success: true,
        data: [],
        message: "You do not have any bookings yet",
      });
    }

    res.status(200).json({
      success: true,
      data: bookings,
      message: "Bookings retrieved successfully",
    });
  }
);

/**
  @desc    GET A SINGLE BOOKING
  @route   /api/bookings/:id
  @method  GET
  @access  public
*/
export const getSingleBooking = asyncHandler(
  async (req: Request, res: Response) => {
    // get id from url
    const id = req.params.id;
    const user = req.user;

    // check if id is valid
    if (!id || !isValidObjectId(id)) {
      throw createHttpError("Invalid booking id", HttpStatusCode.BadRequest);
    }

    // call find booking by id or slug service
    const booking = await findBooking(id, user.role === "host", user._id!);

    // check if there are no bookings
    if (!booking) {
      throw createHttpError("Booking not found", HttpStatusCode.NotFound);
    }

    res.status(200).json({
      success: true,
      data: booking,
      message: "Booking retrieved successfully",
    });
  }
);

/**
  @desc    CREATE A NEW BOOKING
  @route   /api/bookings
  @method  POST
  @access  private
*/
export const createBooking = asyncHandler(
  async (req: Request<any, any, CreateBookingType>, res: Response) => {
    // get booking data from request body
    const bookingData = req.body;
    const user = req.user;

    // check if all required fields are present
    if (
      !bookingData.checkInDate ||
      !bookingData.checkOutDate ||
      !bookingData.property
    ) {
      throw createHttpError(
        "Missing required fields (checkInDate, checkOutDate, property id)",
        HttpStatusCode.BadRequest
      );
    }

    // check if user is not a host to create a booking
    if (user.role !== "client") {
      throw createHttpError(
        "Only clients can rent a property",
        HttpStatusCode.Unauthorized
      );
    }

    // call create booking service
    const createdBooking = await addBooking(bookingData, user);

    res.status(201).json({
      success: true,
      data: createdBooking,
      message: "Booking created successfully",
    });
  }
);

/**
  @desc    UPDATE AN EXISTING BOOKING
  @route   /api/bookings/:id
  @method  PATCH
  @access  public
*/
export const updateBooking = asyncHandler(
  async (
    req: Request<{ id: string }, any, UpdateBookingType>,
    res: Response
  ) => {
    // get id from url
    const id = req.params.id;
    const user = req.user;

    // check if id is valid
    if (!id || !isValidObjectId(id)) {
      throw createHttpError("Invalid booking id", HttpStatusCode.BadRequest);
    }

    // get booking data from request body
    const bookingData = req.body;

    // call update booking service
    const updatedBooking = await updateExistingBooking(id, bookingData, user);

    res.status(200).json({
      success: true,
      data: updatedBooking,
      message: "Booking updated successfully",
    });
  }
);

/**
  @desc    DELETE A SINGLE BOOKING
  @route   /api/bookings/:id
  @method  DELETE
  @access  public
*/
export const deleteBooking = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    // get id from url
    const id = req.params.id;
    const user = req.user;

    // check if id is valid
    if (!id || !isValidObjectId(id)) {
      throw createHttpError("Invalid booking id", HttpStatusCode.BadRequest);
    }

    await removeBooking(id, user);

    res.status(200).json({
      success: true,
      data: null,
      message: "Booking deleted successfully",
    });
  }
);
