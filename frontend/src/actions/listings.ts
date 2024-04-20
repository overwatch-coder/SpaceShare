"use server";

import { ResponseType } from "@/types/index";

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
    throw new Error(data.error?.message);
  }

  return data.data.docs;
};
