"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

const UserAvatar = ({ nameClass }: { nameClass?: string }) => {
  const { user } = useAuth();
  const defaultUrl =
    "https://res.cloudinary.com/cloudinary/image/upload/v1667394529/avatars/avatars/default.png";
  const userProfiePicture =
    user && user.profilePicture ? user.profilePicture : defaultUrl;
  const initialsArray = user
    ? user.name.split(" ").length > 1
      ? user.name.split(" ")
      : user.name.split("")
    : ["Guest", "User"];
  const fallBackName = initialsArray
    ? `${initialsArray[0]?.charAt(0)}${initialsArray[1]?.charAt(0)}`
    : "SS";

  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src={userProfiePicture} />
        <AvatarFallback>{fallBackName.toUpperCase()}</AvatarFallback>
      </Avatar>
      <p className={`text-white text-lg ${nameClass}`}>
        {user?.username || "Guest"}
      </p>
    </div>
  );
};

export default UserAvatar;
