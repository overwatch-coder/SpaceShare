"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { useAppDispatch } from "@/lib/hooks";
import { Register, registerSchema } from "@/schema/user.schema";
import { setAuth } from "@/store/slices/auth.slice";
import { registerFormSubmit } from "@/app/actions/user.actions";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { useSearchParams, useRouter } from "next/navigation";
import RegisterSubmitButton from "@/app/(auth)/register/RegisterSubmitButton";

const RegisterPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const role = searchParams.has("role")
    ? `${searchParams.get("role")}`
    : "client";

  const {
    register,
    reset,
    formState: { errors, isSubmitting: pending },
    handleSubmit,
  } = useForm<Register>({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });

  const processBookSubmit: SubmitHandler<Register> = async (data) => {
    const result = await registerFormSubmit(data);
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

  if (user) {
    return router.replace("/dashboard");
  }

  return (
    <section className="flex flex-col justify-center items-center mt-32 pb-20">
      <div className="flex flex-col gap-5 p-10 rounded shadow-sm border border-gray-200 bg-white max-w-xl w-full mx-auto">
        <h1 className="text-2xl font-bold text-pink-600">Create Account</h1>
        <p className="text-gray-500 text-sm">
          Welcome! Register to make your first booking
        </p>

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
            />
            {errors?.email?.message && (
              <p className="text-red-500 text-xs py-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div className="flex flex-col space-y-4 w-full">
            <label htmlFor="role">What do you want?</label>
            <select
              id="role"
              className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
              {...register("role")}
              defaultValue={role}
            >
              <option>Select one</option>
              <option value="client">To Rent A Room</option>
              <option value="host">To Share A Room</option>
            </select>
            {errors?.role?.message && (
              <p className="text-red-500 text-xs py-2">{errors.role.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-4 w-full">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
              {...register("password")}
              placeholder="your password"
            />
            {errors?.password?.message && (
              <p className="text-red-500 text-xs py-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col space-y-4 w-full">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
              {...register("confirmPassword")}
              placeholder="confirm your password"
            />
            {errors?.confirmPassword?.message && (
              <p className="text-red-500 text-xs py-2">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit form button */}
          <RegisterSubmitButton pending={pending} reset={reset} />

          <div className="flex justify-center py-2">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-pink-500 underline hover:text-pink-400"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
