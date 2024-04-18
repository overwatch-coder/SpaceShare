import bcrypt from "bcryptjs";
import User, { UserType } from "@/models/user.model";
import { createHttpError, HttpStatusCode } from "@/middleware/error.middleware";

// update an existing user
export const updateUser = async (data: Partial<UserType>, user: UserType) => {
  let newEmail = user.email;

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  if (data.email && data.email !== user.email) {
    newEmail = data.email;
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id },
    { ...data, email: newEmail },
    {
      new: true,
    }
  );

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
