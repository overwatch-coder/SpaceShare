import { Mongoose, Types } from "mongoose";

// Extend Express Request interface
declare global {
  namespace Express {
    export interface Request {
      user: UserType;
    }
  }
}

// Extend Mongoose Document interface
declare module "mongoose" {
  export interface Document {
    _id: string;
  }
}

// custom types or interfaces

// Define interfaces for the schema properties
interface User {
  name: string;
  email: string;
  password: string;
  username: string;
  age?: number | null;
  gender?: string | null;
  hobbies: string[];
  interests: string[];
  role: "host" | "client";
  smoker: boolean;
  pets: boolean;
  drinker: boolean;
  profilePicture?: string | null;
  personalStory?: string | null;
  phone?: string | null;
  _id: string;
  createdAt?: NativeDate | null;
  updatedAt?: NativeDate | null;
  properties: Types.ObjectId[];
  bookings: Types.ObjectId[];
}

// property types
// Define interfaces for the schema properties
interface Amenity {
  name: string;
  slug: string;
}

interface Property {
  name: string;
  description: string;
  slug: string;
  address: string;
  ratePerNight: number;
  amenities: Amenity[];
  minAvailableDate: string;
  maxAvailableDate: string;
  minRentalTime: number;
  maxRentalTime: number;
  numberOfGuests: number;
  numberOfBathrooms: number;
  numberOfBedrooms: number;
  numberOfToilets: number;
  numberOfRooms: number;
  capacity?: number;
  status: "available" | "unavailable";
  isFeatured: boolean;
  rating: number;
  coverImage: string;
  images: string[];
  location: string;
  category: string;
  owner: string;
  createdAt: String;
  updatedAt: String;
}

// booking types
interface Booking {
  checkInDate: string;
  checkOutDate: string;
  property: string;
  client: string;
  numberOfGuests: number;
  status: "pending" | "accepted" | "rejected";
  _id: string;
  createdAt: string;
  updatedAt: string;
}

// define all the types here

// user types
export type UserType = Omit<User, "password">;
export type CreateUserType = Pick<
  User,
  "name" | "email" | "password" | "username" | "role"
>;
export type LoginUserType = Pick<User, "email" | "password">;
export type UpdateUserType = Partial<User>;

// property types
export type PropertyType = Property;
export type CreatePropertyType = Omit<
  Property,
  "owner" | "images" | "coverImage" | "createdAt" | "updatedAt"
>;
export type UpdatePropertyType = Partial<PropertyType>;

// booking types
export type BookingType = Booking;
export type CreateBookingType = Omit<
  Booking,
  "createdAt" | "updatedAt" | "_id"
>;
export type UpdateBookingType = Partial<BookingType>;
