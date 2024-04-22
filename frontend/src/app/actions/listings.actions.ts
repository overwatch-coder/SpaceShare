"use server";

import { getServerUser } from "@/app/actions/user.actions";
import { convertToFormData } from "@/lib/converstions";
import { listingSchema, ListingType } from "@/schema/listing.schema";
import { ResponseType } from "@/types/index";
import { revalidateTag } from "next/cache";
import { toast } from "react-toastify";

// get all properties/listings available
export const getListings = async (endpoint: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600, tags: ["properties"] },
  });

  const data: ResponseType = await res.json();

  if (!data.success) {
    toast.error(data.error?.message);
  }

  return endpoint.includes("/") ? data.data : data.data.docs;
};

// delete listing
export const deleteListing = async (formdata: FormData) => {
  const { token } = await getServerUser();
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

  if (!data.success) {
    toast.error(data.error?.message);
  }

  revalidateTag("properties");

  toast.success(data.message);
};

// add new listing
export const submitAddListingForm = async (
  data: ListingType,
  owner: string,
  imageData: FormData
) => {
  const coverImage = imageData.get("coverImage");
  const images = imageData.get("images");

  const { token } = await getServerUser();
  const listingValidationResults = listingSchema.safeParse(data);

  if (!listingValidationResults.success) {
    return {
      error: {
        message: listingValidationResults.error.format(),
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

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
        message: data.error?.message,
      };
    }

    revalidateTag("properties");

    return {
      error: null,
      success: true,
      data: data.data,
      stack: null,
      message: data.message,
    };
  } catch (error: any) {
    return {
      error: error?.message,
      success: false,
      data: null,
      stack: process.env.NODE_ENV === "development" ? error.stack : null,
      message: error?.message,
    };
  }
};
