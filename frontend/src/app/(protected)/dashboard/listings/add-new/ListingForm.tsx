"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { listingSchema, ListingType } from "@/schema/listing.schema";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import AddListingFormSubmitButton from "@/app/(protected)/dashboard/listings/add-new/AddListingFormSubmitButton";
import { submitListingForm } from "@/app/actions/listings.actions";
import { toast } from "react-toastify";
import { FileDrop } from "@instructure/ui-file-drop";
import { Upload } from "lucide-react";
import ImagePreview from "@/components/ImagePreview";

const ListingForm = () => {
  const [imageFiles, setImageFiles] = useState<{
    coverImage: any;
    images: any;
  }>({ coverImage: null, images: [] });

  const { user } = useAuth();
  const router = useRouter();
  const {
    register,
    reset,
    formState: { errors, isSubmitting: pending },
    handleSubmit,
  } = useForm<ListingType>({
    resolver: zodResolver(listingSchema),
    mode: "all",
  });

  const submitListingHandler: SubmitHandler<ListingType> = async (data) => {
    const formdata = new FormData();
    formdata.append("coverImage", imageFiles.coverImage);
    if (imageFiles.images.length > 0) {
      imageFiles.images.map((file: any) => {
        formdata.append("images", file);
      });
    } else {
      formdata.append("images", imageFiles.images);
    }
    const result = await submitListingForm(
      JSON.parse(JSON.stringify(data)),
      user?._id!,
      formdata
    );
    if (!result.success) {
      return Swal.fire({
        title: "Oops!",
        text: Array.isArray(result.error?.message)
          ? result.error?.message.join(", ")
          : result.error?.message,
        icon: "error",
        timer: 4000,
        timerProgressBar: true,
      });
    }
    toast.success(result.message);
    reset();
    router.replace("/dashboard/listings");
  };

  return (
    <form
      onSubmit={handleSubmit(submitListingHandler)}
      className="flex flex-col gap-6"
      method="POST"
      encType="multipart/form-data"
    >
      {/* Property Name */}
      <div className="flex flex-col space-y-4 w-full">
        <label htmlFor="name">Title of Listing</label>
        <input
          type="text"
          className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
          {...register("name")}
          placeholder="Give your listing a title"
        />
        {errors?.name?.message && (
          <p className="text-red-500 text-xs py-2">{errors.name.message}</p>
        )}
      </div>

      {/* Property Description */}
      <div className="flex flex-col space-y-4 w-full">
        <label htmlFor="description">Propery Description</label>
        <textarea
          className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
          {...register("description")}
          placeholder="give a description to your property"
          rows={10}
        />
        {errors?.description?.message && (
          <p className="text-red-500 text-xs py-2">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Property Location */}
      <div className="flex flex-col space-y-4 w-full">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
          {...register("location")}
          placeholder="property location"
        />
        {errors?.location?.message && (
          <p className="text-red-500 text-xs py-2">{errors.location.message}</p>
        )}
      </div>

      {/* Rate per Night */}
      <div className="flex flex-col space-y-4 w-full">
        <label htmlFor="ratePerNight">Rate Per Night</label>
        <input
          type="text"
          className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
          {...register("ratePerNight")}
          placeholder="Rate per night"
        />
        {errors?.ratePerNight?.message && (
          <p className="text-red-500 text-xs py-2">
            {errors.ratePerNight.message}
          </p>
        )}
      </div>

      {/* Min Available Date */}
      <div className="flex flex-col space-y-3 w-full">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="minAvailableDate"
        >
          Available From
        </label>
        <input
          type="date"
          className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
          {...register("minAvailableDate")}
          min={new Date().toISOString().split("T")[0]}
        />
        {errors?.minAvailableDate?.message && (
          <p className="text-red-500 text-xs py-2">
            {errors.minAvailableDate.message}
          </p>
        )}
      </div>

      {/* Max Available date */}
      <div className="flex flex-col space-y-3 w-full">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="maxAvailableDate"
        >
          Available Until
        </label>
        <input
          type="date"
          className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
          {...register("maxAvailableDate")}
          min={new Date().toISOString().split("T")[0]}
        />
        {errors?.maxAvailableDate?.message && (
          <p className="text-red-500 text-xs py-2">
            {errors.maxAvailableDate.message}
          </p>
        )}
      </div>

      {/* Number of Guests */}
      <div className="flex flex-col space-y-4 w-full">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="numberOfGuests"
        >
          Max Number of People
        </label>
        <div className="relative">
          <select
            id="numberOfGuests"
            className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
            {...register("numberOfGuests")}
          >
            <option>Max Number of People</option>
            {Array.from({ length: 6 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                0{num}
              </option>
            ))}
          </select>
        </div>
        {errors?.numberOfGuests?.message && (
          <p className="text-red-500 text-xs py-2">
            {errors.numberOfGuests.message}
          </p>
        )}
      </div>

      {/* Number of rooms */}
      <div className="flex flex-col space-y-4 w-full">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="numberOfRooms"
        >
          Available Rooms
        </label>
        <div className="relative">
          <select
            id="numberOfRooms"
            className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
            {...register("numberOfRooms")}
          >
            <option>Available Rooms</option>
            {Array.from({ length: 6 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                0{num}
              </option>
            ))}
          </select>
        </div>
        {errors?.numberOfRooms?.message && (
          <p className="text-red-500 text-xs py-2">
            {errors.numberOfRooms.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="coverImage"
          className="block text-gray-700 font-semibold mb-2"
        >
          Cover Image
        </label>

        <FileDrop
          id="coverImage"
          name="coverImage"
          accept={[".jpg", ".jpeg", ".png", ".gif"]}
          onDropAccepted={(file) => {
            setImageFiles((prev) => ({ ...prev, coverImage: file[0] }));
          }}
          renderLabel={() => (
            <div className="flex flex-col gap-3 p-3 items-center justify-center">
              <Upload />
              <p className="text-xs text-primary-dark">
                Only image file types are accepted
              </p>
            </div>
          )}
        />

        {imageFiles.coverImage && (
          <ImagePreview image={URL.createObjectURL(imageFiles.coverImage)} />
        )}
      </div>

      {/* Add input for multiple images */}
      <div className="mb-4">
        <label
          htmlFor="images"
          className="block text-gray-700 font-semibold mb-2"
        >
          Images of the Property
        </label>
        <FileDrop
          id="images"
          name="images"
          accept={[".jpg", ".jpeg", ".png", ".gif"]}
          onDropAccepted={(file) => {
            setImageFiles((prev) => ({ ...prev, images: file }));
          }}
          shouldAllowMultiple={true}
          renderLabel={() => (
            <div className="flex flex-col gap-3 p-3 items-center justify-center">
              <Upload />
              <p className="text-xs text-primary-dark">
                Only image file types are accepted
              </p>
            </div>
          )}
        />
        {imageFiles.images.length > 0 && (
          <div className="flex items-center gap-5 flex-wrap">
            {imageFiles.images.map((image: File, idx: number) => (
              <ImagePreview image={URL.createObjectURL(image)} key={idx} />
            ))}
          </div>
        )}
      </div>

      {/* Amenities */}
      <div className="flex flex-col space-y-4 w-full">
        <label htmlFor="amenities">Available Amenities</label>
        <p className="text-xs text-gray-500 py-1">
          NB: It should be comma separated
        </p>
        <input
          type="text"
          className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
          {...register("amenities")}
          placeholder="eg: wifi, tv, air conditioning, gym"
        />
        {errors?.amenities?.message && (
          <p className="text-red-500 text-xs py-2">
            {errors.amenities.message}
          </p>
        )}
      </div>

      {/* Rating */}
      <div className="flex flex-col space-y-4 w-full">
        <label htmlFor="rating">Averagte Rating</label>
        <input
          type="text"
          className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
          {...register("rating")}
          placeholder="rating"
        />
        {errors?.rating?.message && (
          <p className="text-red-500 text-xs py-2">{errors.rating.message}</p>
        )}
      </div>

      {/* Address */}
      <div className="flex flex-col space-y-4 w-full">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
          {...register("address")}
          placeholder="exact location of property"
        />
        {errors?.address?.message && (
          <p className="text-red-500 text-xs py-2">{errors.address.message}</p>
        )}
      </div>

      {/* Minimum Rental Time (Number of Days) */}
      <div className="flex flex-col space-y-4 w-full">
        <label htmlFor="minRentalTime">
          Minimum Rental Time (Number of Days)
        </label>
        <input
          type="number"
          className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
          {...register("minRentalTime")}
          placeholder="enter a number"
        />
        {errors?.minRentalTime?.message && (
          <p className="text-red-500 text-xs py-2">
            {errors.minRentalTime.message}
          </p>
        )}
      </div>

      {/* Maximum Rental Time (Number of Days) */}
      <div className="flex flex-col space-y-4 w-full">
        <label htmlFor="maxRentalTime">
          Maximum Rental Time (Number of Days)
        </label>
        <input
          type="number"
          className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
          {...register("maxRentalTime")}
          placeholder="enter a number"
        />
        {errors?.maxRentalTime?.message && (
          <p className="text-red-500 text-xs py-2">
            {errors.maxRentalTime.message}
          </p>
        )}
      </div>

      {/* Capacity */}
      <div className="flex flex-col space-y-4 w-full">
        <label htmlFor="capacity">Capacity (in feet (ft))</label>
        <input
          type="number"
          className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
          {...register("capacity")}
          placeholder="capacity"
        />
        {errors?.capacity?.message && (
          <p className="text-red-500 text-xs py-2">{errors.capacity.message}</p>
        )}
      </div>

      {/* Submit form button */}
      <AddListingFormSubmitButton pending={pending} reset={reset} />
    </form>
  );
};

export default ListingForm;
