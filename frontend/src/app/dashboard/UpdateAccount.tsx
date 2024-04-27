"use client";

import React from "react";
import { useForm, SubmitHandler, UseFormReset } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { useAppDispatch } from "@/lib/hooks";
import { UpdateUserType, updateUserSchema } from "@/schema/user.schema";
import { setAuth } from "@/store/slices/auth.slice";
import { updateAccount } from "@/app/actions/user.actions";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import arrayUniq from "array-uniq";

const UpdateAccountDetails = () => {
  const router = useRouter();
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  const {
    register,
    reset,
    formState: { errors, isSubmitting: pending },
    handleSubmit,
  } = useForm<UpdateUserType>({
    resolver: zodResolver(updateUserSchema),
    mode: "all",
  });

  const processBookSubmit: SubmitHandler<UpdateUserType> = async (data) => {
    const result = await updateAccount(data);
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

    dispatch(setAuth(result.data));

    toast.success(result.message);
    reset();
    router.replace("/dashboard");
  };

  if (!user) {
    router.replace("/login");
    return;
  }

  return (
    <section className="max-w-2xl w-full mt-10 shadow-md border border-primary-dark rounded-lg p-6">
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold text-primary-dark">Update Account</h1>
        <p className="text-gray-500 text-sm">Update your account details</p>

        <form
          onSubmit={handleSubmit(processBookSubmit)}
          className="flex flex-col gap-6"
        >
          {/* Name */}
          <div className="flex flex-col space-y-4 w-full">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
              {...register("name")}
              placeholder="your name"
              defaultValue={user.name}
            />
            {errors?.name?.message && (
              <p className="text-red-500 text-xs py-2">{errors.name.message}</p>
            )}
          </div>

          {/* Username */}
          <div className="flex flex-col space-y-4 w-full">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
              {...register("username")}
              placeholder="your username"
              defaultValue={user.username}
            />
            {errors?.username?.message && (
              <p className="text-red-500 text-xs py-2">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-4 w-full">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
              {...register("email")}
              placeholder="your email"
              defaultValue={user.email}
            />
            {errors?.email?.message && (
              <p className="text-red-500 text-xs py-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col space-y-4 w-full">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
              {...register("phone")}
              placeholder="eg: +212-123-456-7890"
              defaultValue={user.phone || ""}
              pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
            />
            {errors?.phone?.message && (
              <p className="text-red-500 text-xs py-2">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div className="flex flex-col space-y-4 w-full">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
              {...register("gender")}
              defaultValue={user.gender || ""}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors?.gender?.message && (
              <p className="text-red-500 text-xs py-2">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col space-y-4 w-full">
            <label htmlFor="age">Date of Birth</label>
            <p className="text-gray-500 text-sm">
              NB: Not stored. Just used to calculate age
            </p>
            <input
              type="date"
              className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
              {...register("age")}
              defaultValue={user.age || ""}
              max={new Date().toISOString().split("T")[0]}
              min="1900-01-01"
            />
            {errors?.age?.message && (
              <p className="text-red-500 text-xs py-2">{errors.age.message}</p>
            )}
          </div>

          {/* Interests */}
          <div className="flex flex-col space-y-4 w-full">
            <label htmlFor="interests">Your Interests Include:</label>
            <input
              type="text"
              className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black capitalize"
              {...register("interests")}
              placeholder="eg: Cooking, Reading, Writing"
              defaultValue={
                user.interests.length > 0
                  ? arrayUniq(user.interests.map((x) => x.trim())).join(", ")
                  : ""
              }
            />
            {errors?.interests?.message && (
              <p className="text-red-500 text-xs py-2">
                {errors.interests.message}
              </p>
            )}
          </div>

          {/* Hobbies */}
          <div className="flex flex-col space-y-4 w-full">
            <label htmlFor="hobbies">Your Hobbies Include:</label>
            <input
              type="text"
              className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black capitalize"
              {...register("hobbies")}
              placeholder="eg: Programming, Fishing, Cooking"
              defaultValue={
                user.hobbies.length > 0
                  ? arrayUniq(user.hobbies.map((x) => x.trim())).join(", ")
                  : ""
              }
            />
            {errors?.hobbies?.message && (
              <p className="text-red-500 text-xs py-2">
                {errors.hobbies.message}
              </p>
            )}
          </div>

          {/* Smoker */}
          <div className="flex flex-col space-y-4 w-full">
            <label htmlFor="smoker">Do you smoke?</label>
            <select
              id="smoker"
              className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
              {...register("smoker")}
              defaultValue={user.smoker ? "true" : "false"}
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors?.smoker?.message && (
              <p className="text-red-500 text-xs py-2">
                {errors.smoker.message}
              </p>
            )}
          </div>

          {/* Drinker */}
          <div className="flex flex-col space-y-4 w-full">
            <label htmlFor="drinker">Do you drink?</label>
            <select
              id="drinker"
              className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
              {...register("drinker")}
              defaultValue={user.drinker ? "true" : "false"}
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors?.drinker?.message && (
              <p className="text-red-500 text-xs py-2">
                {errors.drinker.message}
              </p>
            )}
          </div>

          {/* Pets */}
          <div className="flex flex-col space-y-4 w-full">
            <label htmlFor="pets">Do you have pets?</label>
            <select
              id="pets"
              className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
              {...register("pets")}
              defaultValue={user.pets ? "true" : "false"}
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors?.pets?.message && (
              <p className="text-red-500 text-xs py-2">{errors.pets.message}</p>
            )}
          </div>

          {/* Submit form button */}
          <UpdateAccountSubmitButton pending={pending} reset={reset} />
        </form>
      </div>
    </section>
  );
};

export const UpdateAccountSubmitButton = ({
  pending,
  reset,
}: {
  pending: boolean;
  reset: UseFormReset<UpdateUserType>;
}): React.JSX.Element => {
  return (
    <div className="flex flex-col gap-5 w-full items-center md:flex-row md:justify-center">
      <Button
        disabled={pending}
        className="bg-pink-500 py-5 hover:bg-pink-400 text-white text-center w-full"
      >
        {pending ? (
          <ClipLoader size={28} loading={pending} color="white" />
        ) : (
          "Update"
        )}
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

export default UpdateAccountDetails;
