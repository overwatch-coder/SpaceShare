import React from "react";
import { Button } from "@/components/ui/button";
import { UseFormReset } from "react-hook-form";
import { BookingFormType } from "@/schema/bookings.schema";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";

type BookingFormSubmitBtnProps = {
  pending: boolean;
  reset: UseFormReset<BookingFormType>;
};

const BookingFormSubmitBtn = ({
  pending,
  reset,
}: BookingFormSubmitBtnProps) => {
  const { user } = useAuth();
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-5 w-full items-center">
      {user === null ? (
        <Link
          href={`/login?redirect=${pathname}`}
          className="bg-pink-500 py-3 rounded-md hover:bg-pink-400 text-white text-center w-full"
        >
          Login to continue
        </Link>
      ) : (
        <>
          <Button
            disabled={pending}
            className="bg-pink-500 py-5 hover:bg-pink-400 text-white text-center w-full"
          >
            {pending ? "Booking..." : "Book Now"}
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
        </>
      )}
    </div>
  );
};

export default BookingFormSubmitBtn;
