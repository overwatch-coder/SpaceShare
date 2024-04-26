"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { useAppDispatch } from "@/lib/hooks";
import { Login, loginSchema } from "@/schema/user.schema";
import { setAuth } from "@/store/slices/auth.slice";
import { loginFormSubmit } from "@/app/actions/user.actions";
import LoginSubmitButton from "@/app/(auth)/login/LoginSubmitButton";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { useSearchParams, useRouter } from "next/navigation";

const LoginPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.has("redirect")
    ? `${searchParams.get("redirect")}`
    : "/dashboard";

  const {
    register,
    reset,
    formState: { errors, isSubmitting: pending },
    handleSubmit,
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const processBookSubmit: SubmitHandler<Login> = async (data) => {
    const result = await loginFormSubmit(data);
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
    router.replace(redirectUrl);
  };

  if (user) {
    return router.replace(redirectUrl);
  }

  return (
    <section className="flex flex-col justify-center items-center mt-32 pb-20">
      <div className="flex flex-col gap-5 p-10 bg-white rounded shadow-sm border border-gray-200 max-w-xl w-full mx-auto">
        <h1 className="text-2xl font-bold text-pink-600">Login</h1>
        <p className="text-gray-500 text-sm">
          Welcome! Please login to continue
        </p>

        <form
          onSubmit={handleSubmit(processBookSubmit)}
          className="flex flex-col gap-6"
        >
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
          <LoginSubmitButton pending={pending} reset={reset} />

          <div className="flex justify-center py-2">
            <p className="text-sm text-gray-500">
              Don&apos;t have an account yet?{" "}
              <Link
                href="/register"
                className="text-pink-500 underline hover:text-pink-400"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
