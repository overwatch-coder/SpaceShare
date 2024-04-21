import jwt from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import asyncHandler from "express-async-handler";
import User from "@/models/user.model";
import { createHttpError, HttpStatusCode } from "@/middleware/error.middleware";
import { UserType } from "@/types";

interface PayloadData {
  userId: string;
}

// check if user is authorized
export const protectUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.headers.authorization?.split(" ")[1];

    if (!access_token) {
      throw createHttpError(
        "Not authorized, no token found.",
        HttpStatusCode.Forbidden
      );
    }

    const decoded = jwt.verify(
      access_token,
      process.env.JWT_SECRET!
    ) as PayloadData;

    if (!decoded) {
      throw createHttpError(
        "Not authorized, token expired. Please login again",
        HttpStatusCode.Forbidden
      );
    }

    const user = await User.findOne({ _id: decoded.userId }).select(
      "-password -__v"
    );

    if (!user) {
      throw createHttpError(
        "Forbidden!. You must be logged in to access this page.",
        HttpStatusCode.Forbidden
      );
    }

    const userData: UserType = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      username: user.username,
      age: user.age,
      gender: user.gender,
      hobbies: user.hobbies,
      interests: user.interests,
      role: user.role,
      smoker: user.smoker,
      pets: user.pets,
      drinker: user.drinker,
      profilePicture: user.profilePicture,
      personalStory: user.personalStory,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      properties: user.properties,
      bookings: user.bookings,
    };

    req.user = userData;
    next();
  }
);

// check if logged in user is an merchant
export const protectHost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user;

    if (role !== "host") {
      throw createHttpError(
        "Forbidden!. Not authorized to access this page.",
        HttpStatusCode.Forbidden
      );
    }

    next();
  }
);
