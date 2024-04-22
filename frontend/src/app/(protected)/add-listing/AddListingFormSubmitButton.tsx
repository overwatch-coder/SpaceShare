import React from "react";
import { Button } from "@/components/ui/button";
import { UseFormReset } from "react-hook-form";
import { ListingType } from "@/schema/listing.schema";

type AddListingFormSubmitButtonProps = {
  pending: boolean;
  reset: UseFormReset<ListingType>;
};

const AddListingFormSubmitButton = ({
  pending,
  reset,
}: AddListingFormSubmitButtonProps) => {
  return (
    <div className="flex flex-col gap-5 w-full items-center md:flex-row md:justify-between">
      <Button
        disabled={pending}
        className="bg-pink-500 py-5 hover:bg-pink-400 text-white text-center w-full"
      >
        {pending ? "Please wait..." : "Add Listing"}
      </Button>

      <Button
        disabled={pending}
        onClick={() => reset()}
        type="reset"
        variant={"destructive"}
        className="text-center w-full"
      >
        Cancel
      </Button>
    </div>
  );
};

export default AddListingFormSubmitButton;
