import React from "react";
import { Button } from "@/components/ui/button";
import { UseFormReset } from "react-hook-form";
import { Register } from "@/schema/user.schema";

const RegisterSubmitButton = ({
  pending,
  reset,
}: {
  pending: boolean;
  reset: UseFormReset<Register>;
}) => {
  return (
    <div className="flex flex-col gap-5 w-full items-center">
      <Button
        disabled={pending}
        className="bg-pink-500 py-5 hover:bg-pink-400 text-white text-center w-full"
      >
        {pending ? "Please wait..." : "Register"}
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

export default RegisterSubmitButton;
