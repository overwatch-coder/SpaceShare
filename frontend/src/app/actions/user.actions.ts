"use server";

import { setCookie } from "@/app/actions";
import {
  Login,
  loginSchema,
  Register,
  registerSchema,
  updateUserSchema,
  UpdateUserType,
} from "@/schema/user.schema";
import { ResponseType, User } from "@/types/index";
import age from "@whitetrefoil/s-age-ts";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// login
export const loginFormSubmit = async (data: Login) => {
  const validatedData = loginSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      error: {
        message: validatedData.error.errors.map((err) => err.message),
      },
      success: false,
      data: null,
      stack: null,
      message: "validation error",
    };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });

    const result: ResponseType = await res.json();

    setCookie(res);

    return result;
  } catch (error: any) {
    return {
      error: {
        message: error.message,
      },
      success: false,
      data: null,
      stack: process.env.NODE_ENV === "development" ? error.stack : null,
      message: "Something went wrong. Please try again later.",
    };
  }
};

// register
export const registerFormSubmit = async (data: Register) => {
  const validatedData = registerSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      error: {
        message: validatedData.error.errors.map((err) => err.message),
      },
      success: false,
      data: null,
      stack: null,
      message: "validation error",
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          username: data.username,
          role: data.role,
          name: data.name,
        }),
      }
    );

    const result: ResponseType = await res.json();

    setCookie(res);

    return result;
  } catch (error: any) {
    return {
      error: { message: error.message },
      success: false,
      data: null,
      stack: process.env.NODE_ENV === "development" ? error.stack : null,
      message: "Something went wrong. Please try again later.",
    };
  }
};

// update profile
export const updateAccount = async (data: UpdateUserType) => {
  const { user, token } = await currentUser();
  const dataToValidate = {
    ...data,
    email: data.email === user.email ? undefined : data.email,
    age: data.age ? age(data.age).toString() : undefined,
  };
  const validatedData = updateUserSchema.safeParse(dataToValidate);

  if (!validatedData.success) {
    return {
      error: {
        message: validatedData.error.errors.map((err) => err.message),
      },
      success: false,
      data: null,
      stack: null,
      message: "validation error",
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/update-profile`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(validatedData.data),
      }
    );

    const result: ResponseType = await res.json();

    revalidatePath("/dashboard");
    return result;
  } catch (error: any) {
    return {
      error: { message: error.message },
      success: false,
      data: null,
      stack: process.env.NODE_ENV === "development" ? error.stack : null,
      message: "Something went wrong. Please try again later.",
    };
  }
};

// change profile picture
export const updateAvatar = async (formData: FormData) => {
  const { token } = await currentUser();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/upload-image`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const data: ResponseType = await res.json();

  revalidatePath("/dashboard");
  return data;
};

// currently logged in user details
export const currentUser = async () => {
  const cookieStore = cookies();
  const token = cookieStore.has("access_token")
    ? cookieStore.get("access_token")?.value
    : "";

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data: ResponseType = await res.json();

  const user: User = data.data;

  return { user, token };
};

// delete account
export const deleteAccount = async () => {
  const { token } = await currentUser();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/delete`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: ResponseType = await res.json();

  return data;
};

//   logout
export const logout = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: ResponseType = await res.json();

  setCookie(res, true);

  return data;
};
