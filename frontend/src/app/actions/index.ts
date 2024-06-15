"use server";

import { cookies, headers } from "next/headers";

// set cookie
export const setCookie = async (res: Response, logout: boolean = false) => {
  const cookieStore = cookies();

  if (logout) {
    cookieStore.set("access_token", "");
    cookieStore.delete("access_token");
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

// set pathname
export const getPathname = async () => {
  const headersList = headers();

  return headersList.get("x-pathname") || "/";
};
