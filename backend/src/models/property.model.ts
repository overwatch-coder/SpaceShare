import mongoose, { HydratedDocumentFromSchema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const propertySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true },
    address: { type: String },
    ratePerNight: { type: Number, required: true },
    amenities: [
      {
        name: { type: String, required: true },
        slug: { type: String, required: true },
      },
    ],
    minAvailableDate: { type: String, required: true },
    maxAvailableDate: { type: String, required: true },
    minRentalTime: { type: Number, default: 1 },
    maxRentalTime: { type: Number, default: 7 },
    numberOfGuests: { type: Number, default: 1 },
    numberOfBathrooms: { type: Number, default: 1 },
    numberOfBedrooms: { type: Number, default: 1 },
    numberOfToilets: { type: Number, default: 1 },
    numberOfRooms: { type: Number, default: 4 },
    capacity: { type: Number },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    isFeatured: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    coverImage: { type: String, required: true },
    images: [{ type: String }],
    location: { type: String, required: true },
    category: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// set strict populate to false
mongoose.set("strictPopulate", false);

// add pagination plugin
propertySchema.plugin(mongoosePaginate);

type PropertyModelType = HydratedDocumentFromSchema<typeof propertySchema>;

const Property = mongoose.model<
  PropertyModelType,
  mongoose.PaginateModel<PropertyModelType>
>("Property", propertySchema, "properties");

export default Property;
