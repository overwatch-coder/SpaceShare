"use client";
import { logout } from "@/app/actions/user.actions";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/lib/hooks";
import { removeAuth } from "@/store/slices/auth.slice";
import { redirect, usePathname, useRouter } from "next/navigation";

const Logout = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const logoutUser = async () => {
    const data = await logout();
    toast.success(data.message);
    dispatch(removeAuth());

    router.replace(pathname.includes("/dashboard") ? "/login" : pathname);
  };
  return (
    <section>
      <button
        onClick={logoutUser}
        className="bg-pink-500 rounded-md uppercase text-white py-2 px-5 text-center hover:scale-105 transition w-full"
      >
        Logout
      </button>
    </section>
  );
};

export default Logout;
