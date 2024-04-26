"use client";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { removeAuth } from "@/store/slices/auth.slice";
import { deleteAccount } from "@/app/actions/user.actions";

const AccountSettings = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleDeleteAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteResults = await deleteAccount();

        if (!deleteResults.success) {
          Swal.fire({
            title: "Error!",
            text: deleteResults.error?.message,
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Sad to see you go😥",
            text: "Account deleted successfully",
            icon: "success",
          });

          dispatch(removeAuth());
          router.replace("/login");
        }
      }
    });
  };

  return (
    <section className="shadow-md border-red-600 rounded border p-4 flex flex-col space-y-5 mt-10">
      <h2 className="font-semibold text-lg text-red-600">Danger Zone</h2>

      <div className="flex flex-col space-y-5 md:space-y-0 md:items-center md:justify-between md:flex-row">
        <div className="flex flex-col space-y-1">
          <h2>Delete your account</h2>
          <span className="text-xs dark:text-white/70">
            Once you delete your account, there is no going back. <br />
            You will not be able to recover your account data.
          </span>
        </div>

        <form method="POST" onSubmit={handleDeleteAccount}>
          <button
            type="submit"
            className="rounded px-4 py-2 border-red-500 border hover:bg-red-600 text-red-500 hover:text-white md:w-fit"
          >
            Delete this account
          </button>
        </form>
      </div>
    </section>
  );
};

export default AccountSettings;
