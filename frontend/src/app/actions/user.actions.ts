"use server";

import {
  Login,
  loginSchema,
  Register,
  registerSchema,
} from "@/schema/user.schema";
import { ResponseType, User } from "@/types/index";
import { cookies } from "next/headers";

// set cookie
export const setCookie = (res: Response, logout: boolean = false) => {
  const cookieStore = cookies();

  if (logout) {
    cookieStore.set("access_token", "");
    return;
  } else {
    //   check if cookies is present in headers
    const cookiesPresent = res.headers.getSetCookie().length > 0;
    const cookiesArray = cookiesPresent
      ? res.headers.getSetCookie()[0].split(";")
      : [];

    // get the token key and value
    const cookieKey =
      cookiesArray.length > 0 ? cookiesArray[0].split("=")[0] : "token";
    const cookieValue =
      cookiesArray.length > 0 ? cookiesArray[0].split("=")[1] : "";

    cookieStore.set(cookieKey, cookieValue);
    return;
  }
};

// login
export const loginFormSubmit = async (data: Login) => {
  const validatedData = loginSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      error: validatedData.error.format(),
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
      error: error.message,
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
      error: validatedData.error.format(),
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
      error: error.message,
      success: false,
      data: null,
      stack: process.env.NODE_ENV === "development" ? error.stack : null,
      message: "Something went wrong. Please try again later.",
    };
  }
};

// currently logged in user details
export const getServerUser = async () => {
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
