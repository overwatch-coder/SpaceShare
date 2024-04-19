import bcrypt from "bcryptjs";
import User from "@/models/user.model";
import { createHttpError, HttpStatusCode } from "@/middleware/error.middleware";
import { UpdateUserType, UserType } from "@/types";

// update an existing user
export const updateUser = async (data: UpdateUserType, user: UserType) => {
  let newEmail = user.email;

  // check if interest and hobbies are arrays
  if (data.interests && !Array.isArray(data.interests)) {
    data.interests = [data.interests];
  }

  if (data.hobbies && !Array.isArray(data.hobbies)) {
    data.hobbies = [data.hobbies];
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
      interests: data.interests
        ? [...new Set([...data.interests, ...user.interests])]
        : user.interests,
      hobbies: data.hobbies
        ? [...new Set([...data.hobbies, ...user.hobbies])]
        : user.hobbies,
    },
    {
      new: true,
    }
  )
    .select("-password -__v")
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
