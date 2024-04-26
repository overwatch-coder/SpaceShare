"use client";

import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import React, { useState } from "react";
import noProfileImage from "@/assets/no-profile-picture.png";
import { useRouter } from "next/navigation";
import { updateAvatar } from "@/app/actions/user.actions";
import { toast } from "react-toastify";
import { FileDrop } from "@instructure/ui-file-drop";
import { Upload } from "lucide-react";
import { useAppDispatch } from "@/lib/hooks";
import { User } from "@/types/index";
import { setAuth } from "@/store/slices/auth.slice";

const ChangeProfilePicture = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState<
    File | null | DataTransferItem
  >(null);
  const [loading, setLoading] = useState(false);

  if (!user) {
    router.replace("/login");
    return null;
  }

  // upload profile picture
  const uploadProfilePicture = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!profilePicture) {
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("avatar", profilePicture as File);
    const result = await updateAvatar(formData);

    if (!result.success) {
      setLoading(false);
      toast.error(
        Array.isArray(result.error?.message)
          ? result.error?.message.join(", ")
          : result.error?.message
      );
      return;
    }

    const data: User = result.data;

    toast.success(result.message);

    dispatch(setAuth(data));

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-5 w-full md:w-72 items-center">
      <Image
        src={
          profilePicture
            ? URL.createObjectURL(profilePicture as File)
            : user.profilePicture || noProfileImage
        }
        alt="profile picture"
        width={500}
        height={500}
        className="border-2 border-priamry-dark object-cover w-32 h-32 rounded-full"
      />

      <form
        onSubmit={uploadProfilePicture}
        className="w-full flex flex-col gap-3 items-center"
        encType="multipart/form-data"
      >
        <label htmlFor="file" className="text--primary-dark">
          Change Avatar
        </label>

        <FileDrop
          accept={[".jpg", ".jpeg", ".png", ".gif"]}
          onDropAccepted={(file) => {
            console.log({ file: file[0] });
            setProfilePicture(file[0]);
          }}
          renderLabel={() => (
            <div className="flex flex-col gap-3 p-3 items-center justify-center">
              <Upload />
              <p className="text-xs text-primary-dark">
                Only image file types are accepted
              </p>
            </div>
          )}
        />

        <button
          type="submit"
          className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600 w-full"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Change"}
        </button>
      </form>
    </div>
  );
};

export default ChangeProfilePicture;
