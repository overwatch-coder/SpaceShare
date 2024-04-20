type Amenity = {
  name: string;
  slug: string;
}

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
  owner: string;
  createdAt: String;
  updatedAt: String;
  _id: string;
};

export type ResponseType = {
  error?: {
    message: string;
  };
  stack: string | null;
  success: boolean;
  data: any;
};
