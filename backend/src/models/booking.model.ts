import mongoose, { HydratedDocumentFromSchema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const bookingSchema = new mongoose.Schema(
  {
    checkInDate: { type: String, required: true },
    checkOutDate: { type: String, required: true },
    numberOfGuests: { type: Number, default: 1 },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// set strict populate to false
mongoose.set("strictPopulate", false);

// add pagination plugin
bookingSchema.plugin(mongoosePaginate);

type BookingModelType = HydratedDocumentFromSchema<typeof bookingSchema>;

const Booking = mongoose.model<
  BookingModelType,
  mongoose.PaginateModel<BookingModelType>
>("Booking", bookingSchema, "bookings");

export default Booking;
