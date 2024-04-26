"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";

const PasswordChange = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    if (!password || !confirmPassword) {
      setPending(false);
      return Swal.fire({
        title: "Error!",
        text: "All fields are required",
        icon: "error",
        timer: 4000,
        timerProgressBar: true,
      });
    }

    if (password !== confirmPassword) {
      setPending(false);
      setPassword("");
      setConfirmPassword("");
      return Swal.fire({
        title: "Error!",
        text: "Passwords do not match",
        icon: "error",
        timer: 4000,
        timerProgressBar: true,
      });
    }

    // const result = await changePassword(password);
    const result = {
      success: false,
      error: {
        message: "Password could not be changed successfully",
      },
    };

    setPassword("");
    setConfirmPassword("");
    if (!result.success) {
      setPending(false);
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

    setPending(false);
    return Swal.fire({
      title: "Great!",
      text: "Password changed successfully",
      icon: "success",
      timer: 4000,
      timerProgressBar: true,
    });
  };
  return (
    <div className="w-full max-w-2xl p-6 flex flex-col gap-5 mt-10 border border-primary-dark rounded shadow-md">
      <h2 className="font-semibold text-3xl text-primary-dark">
        Change Password
      </h2>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
      >
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
          placeholder="your new password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />

        <label htmlFor="confirmPassword">Confirm Password</label>

        <input
          type="password"
          className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-black"
          placeholder="confirm password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          name="confirmPassword"
        />

        <button
          disabled={pending}
          type="submit"
          className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600 w-full"
        >
          {pending ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default PasswordChange;
