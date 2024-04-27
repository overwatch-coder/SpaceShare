import User from "@/models/user.model";
import { createHttpError, HttpStatusCode } from "@/middleware/error.middleware";
import { CreateUserType } from "@/types";

// find a single user
export const findUser = async (
  data: string,
  selectPassword: boolean = false,
  findById: boolean = false
) => {
  const user = await User.findOne(findById ? { _id: data } : { email: data })
    .select(selectPassword ? "" : "-password -__v -properties -bookings")
    .lean()
    .exec();

  if (!user || user === null) {
    throw createHttpError(
      "Account does not exist. Please sign up",
      HttpStatusCode.NotFound
    );
  }

  // return user
  return user;
};

// create a new user
export const createUser = async (data: CreateUserType) => {
  const user = await User.create({ ...data, email: data.email.toLowerCase() });

  if (!user) {
    throw createHttpError(
      "User creation failed",
      HttpStatusCode.InternalServerError
    );
  }

  return findUser(user.email);
};
