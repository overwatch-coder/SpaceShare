"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { UseFormReset } from "react-hook-form";
import { UpdateListingType } from "@/schema/listing.schema";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";

type EditListingFormSubmitButtonProps = {
  pending: boolean;
  reset: UseFormReset<UpdateListingType>;
};

const EditListingFormSubmitButton = ({
  pending,
  reset,
}: EditListingFormSubmitButtonProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-5 w-full items-center md:flex-row md:justify-between">
      <Button
        disabled={pending}
        className="bg-pink-500 py-5 hover:bg-pink-400 text-white text-center w-full"
      >
        {pending ? (
          <ClipLoader size={28} loading={pending} color="white" />
        ) : (
          "Edit Listing"
        )}
      </Button>

      <Button
        disabled={pending}
        onClick={() => router.back()}
        type="reset"
        variant={"destructive"}
        className="text-center w-full"
      >
        Cancel
      </Button>
    </div>
  );
};

export default EditListingFormSubmitButton;
