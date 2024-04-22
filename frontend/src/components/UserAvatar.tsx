"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

const UserAvatar = () => {
  const { user } = useAuth();
  const defaultUrl =
    "https://res.cloudinary.com/cloudinary/image/upload/v1667394529/avatars/avatars/default.png";
  const userProfiePicture = user ? user.profilePicture : defaultUrl;
  const initialsArray = user ? user?.name.split(" ")! : null;
  const fallBackName = initialsArray
    ? `${initialsArray[0].charAt(0)}${initialsArray[1].charAt(0)}`
    : "SS";

  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src={userProfiePicture} />
        <AvatarFallback>{fallBackName.toUpperCase()}</AvatarFallback>
      </Avatar>
      <p className="text-white text-lg">{user?.username || "Guest"}</p>
    </div>
  );
};

export default UserAvatar;
