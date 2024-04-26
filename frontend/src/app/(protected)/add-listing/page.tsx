import ListingForm from "@/app/(protected)/add-listing/ListingForm";
import { currentUser } from "@/app/actions/user.actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Add Listing - SheShare",
  description: "Add your listing to SheShare",
};

const AddListing = async () => {
  const { user } = await currentUser();
  if (!user) {
    return redirect("/login");
  }

  if (user.role !== "host") {
    return redirect("/dashboard");
  }

  return (
    <section className="mt-32 px-8 md:px-16 max-w-4xl mx-auto py-10">
      <div className="w-full flex flex-col gap-5 shadow-md p-10">
        <h2 className="font-semibold text-4xl text-pink-500">
          Add New Listing
        </h2>
        <p className="font-medium text-primary-dark/70 text-sm md:text-lg max-w-2xl">
          Add your listing to SheShare and get started on your next rental. It
          only takes a few minutes.
        </p>

        <ListingForm />
      </div>
    </section>
  );
};

export default AddListing;
