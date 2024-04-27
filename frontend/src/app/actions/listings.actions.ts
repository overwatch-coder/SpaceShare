"use server";

import { currentUser } from "@/app/actions/user.actions";
import { convertToFormData } from "@/lib/converstions";
import {
  listingSchema,
  ListingType,
  updateListingSchema,
} from "@/schema/listing.schema";
import { ResponseType } from "@/types/index";
import { revalidateTag } from "next/cache";

// get all properties/listings available
export const getListings = async (endpoint: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 3600,
      tags: endpoint.includes("/") ? ["properties/id"] : ["properties"],
    },
  });

  const data: ResponseType = await res.json();

  if (!data.success) {
    return [];
  }

  if(endpoint.includes("/")) {
    revalidateTag("properties/id");
  }

  return endpoint.includes("/") ? data.data : data.data.docs;
};

// delete listing
export const deleteListing = async (formdata: FormData) => {
  const { token } = await currentUser();
  const propertyId = formdata.get("propertyId");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/properties/${propertyId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data: ResponseType = await res.json();

  revalidateTag("properties");
};

// add new listing
export const submitListingForm = async (
  data: ListingType,
  owner: string,
  imageData: FormData,
  propertyId?: string
) => {
  const coverImage = imageData.get("coverImage");
  const images = imageData.getAll("images");

  const { token } = await currentUser();

  const listingValidationResults = propertyId
    ? updateListingSchema.safeParse(data)
    : listingSchema.safeParse(data);

  if (!listingValidationResults.success) {
    return {
      error: {
        message: listingValidationResults.error.errors.map(
          (err) => err.message
        ),
      },
      success: false,
      data: null,
      stack: null,
    };
  }

  const formData = convertToFormData({
    ...listingValidationResults.data,
    owner,
    coverImage,
    images,
  });

  const urlPathname = propertyId ? `/properties/${propertyId}` : "/properties";
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${urlPathname}`,
      {
        method: propertyId ? "PATCH" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
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

    revalidateTag("properties");
    revalidateTag("properties/id");

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
