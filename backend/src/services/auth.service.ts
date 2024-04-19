import bcrypt from "bcryptjs";
import User from "@/models/user.model";
import { createHttpError, HttpStatusCode } from "@/middleware/error.middleware";
import { UpdateUserType, UserType } from "@/types";

// update an existing user
export const updateUser = async (data: UpdateUserType, user: UserType) => {
  let newEmail = user.email;

  // convert interests and hobbies to an array
  let interestsArray: string[] = user.interests
    ? Array.isArray(user.interests)
      ? user.interests
      : user.interests.split(",")
    : [];

  let hobbiesArray: string[] = user.hobbies
    ? Array.isArray(user.hobbies)
      ? user.hobbies
      : user.hobbies.split(",")
    : [];

  // check if interest and hobbies are present and convert them to an array and remove duplicates
  if (data.interests) {
    interestsArray = Array.isArray(data.interests)
      ? [...new Set([...data.interests, ...user.interests])]
      : [...new Set([...data.interests.split(","), ...user.interests])];
  }

  if (data.hobbies) {
    hobbiesArray = Array.isArray(data.hobbies)
      ? [...new Set([...data.hobbies, ...user.hobbies])]
      : [...new Set([...data.hobbies.split(","), ...user.hobbies])];
  }

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  if (data.email && data.email !== user.email) {
    newEmail = data.email.toLowerCase();
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id },
    {
      ...data,
      email: newEmail,
      interests: interestsArray,
      hobbies: hobbiesArray,
    },
    {
      new: true,
    }
  )
    .select("-password -__v -properties -bookings")
    .lean()
    .exec();

  if (!updatedUser) {
    throw createHttpError(
      "An error occurred while updating your profile. Try again later",
      HttpStatusCode.InternalServerError
    );
  }

  return {
    success: true,
    data: updatedUser,
    message: "Profile updated successfully.",
  };
};

// delete an existing user
export const deleteUser = async (userId: string) => {
  const deletedUser = await User.findOneAndDelete({ _id: userId });

  if (!deletedUser) {
    throw createHttpError(
      "An error occurred while deleting your account. Try again later",
      HttpStatusCode.InternalServerError
    );
  }
};
