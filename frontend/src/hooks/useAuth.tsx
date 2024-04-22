"use client";

import { useAppSelector } from "@/lib/hooks";

export const useAuth = () => {
  const user = useAppSelector((state) => state.auth.auth);

  return {
    user,
  };
};
