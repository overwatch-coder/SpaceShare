// user type
export type User = {
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
  properties: string[];
  bookings: string[];
};

// amenity type
type Amenity = {
  name: string;
  slug: string;
};

// Owner type
type Owner = {
  _id: string;
  name: string;
  username: string;
  email: string;
};

// infering client type from owner
type Client = Owner;

// property type
export type Property = {
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
  numberOfRooms: number;
  capacity?: number;
  status: "available" | "unavailable";
  isFeatured: boolean;
  rating: number;
  coverImage: string;
  images: string[];
  location: string;
  category: string;
  owner: Owner;
  createdAt: string;
  updatedAt: string;
  _id: string;
};

export type PropertyDocs = {
  docs: Property[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

// booking type
export type Booking = {
  checkInDate: string;
  checkOutDate: string;
  property: Property;
  client: Client;
  numberOfGuests: number;
  status: "pending" | "accepted" | "rejected";
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateBooking = Pick<
  Booking,
  "checkInDate" | "checkOutDate" | "numberOfGuests" | "status"
> & { property: string; client: string };

export type ResponseType = {
  error?: {
    message: string;
  };
  stack: string | null;
  success: boolean;
  data: any;
  message: string;
};
