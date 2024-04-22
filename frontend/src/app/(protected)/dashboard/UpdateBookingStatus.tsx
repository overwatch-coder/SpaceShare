"use client";

import { updateBookingStatus } from "@/app/actions/bookings.actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Booking } from "@/types/index";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type UpdateBookingStatusProps = {
  booking: Booking;
};

const UpdateBookingStatus = ({ booking }: UpdateBookingStatusProps) => {
  const [status, setStatus] = useState<
    string | "pending" | "accepted" | "rejected"
  >(booking.status);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    if (!status || status === "") {
      setPending(false);
      return;
    }

    if (status === booking.status) {
      setPending(false);

      toast.warning("Status cannot be the same as previous");
      return;
    }

    const result = await updateBookingStatus({
      status,
      bookingId: booking._id,
    });

    if (!result.success) {
      setPending(false);

      return Swal.fire({
        title: "Oops!",
        text: result.error?.message,
        icon: "error",
        timer: 4000,
        timerProgressBar: true,
      });
    }

    setPending(false);
    return Swal.fire({
      title: "Great!",
      text: result.message,
      icon: "success",
      timer: 4000,
      timerProgressBar: true,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600">
          Update Booking
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-semibold">
            Update Booking Status
          </DialogTitle>

          <form
            method="POST"
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
          >
            <label
              htmlFor="status"
              className="block text-gray-700 font-semibold mb-2"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500"
              required
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Approve or reject booking</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>

            <button
              disabled={pending}
              type="submit"
              className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600"
            >
              {pending ? "Updating..." : "Update"}
            </button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBookingStatus;
