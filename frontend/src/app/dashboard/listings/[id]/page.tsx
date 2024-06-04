import EditListingForm from "@/app/dashboard/listings/[id]/EditListingForm";
import { getListings } from "@/app/actions/listings.actions";
import { currentUser } from "@/app/actions/user.actions";
import { Property } from "@/types/index";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

type EditListingProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id },
}: EditListingProps): Promise<Metadata> {
  const property: Property = await getListings(`properties/${id}`);

  return {
    title: `${property.name} | Edit Listing`,
    description: property.description,
    keywords: property.name,
    openGraph: {
      title: property.name,
      description: property.description,
      images: [property.coverImage, ...property.images],
    },
  };
}

const EditListing = async ({ params: { id } }: EditListingProps) => {
  const { user } = await currentUser();
  if (!user) {
    return redirect("/login");
  }

  if (user.role !== "host") {
    return redirect("/dashboard");
  }

  const property: Property = await getListings(`properties/${id}`);

  if (property.owner._id !== user._id) {
    return redirect("/dashboard");
  }

  return (
    <section className="px-8 w-full md:px-16 md:max-w-4xl mx-auto py-16 md:py-10">
      <div className="w-full flex flex-col gap-5 shadow-md p-2 md:p-10">
        <h2 className="font-semibold text-3xl md:text-4xl text-pink-500">
          Edit Listing
        </h2>
        <p className="font-medium text-primary-dark/70 text-sm md:text-lg max-w-2xl">
          Edit your listing to Spaceshare and get better experience on your next
          rental. It only takes a few minutes.
        </p>

        <EditListingForm listing={property} />
      </div>
    </section>
  );
};

export default EditListing;
