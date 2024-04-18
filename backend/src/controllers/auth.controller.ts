import { uploadSingleImage } from "@/lib/image-upload";
import User, { UserType } from "@/models/user.model";
import { deleteUser, updateUser } from "@/services/auth.service";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import fileUpload from "express-fileupload";
import validator from "validator";
import { createHttpError, HttpStatusCode } from "@/middleware/error.middleware";
import { UpdateUserType } from "@/types";

/**
  @desc    GET HOST PROFILE DETAILS
  @route   /api/auth/host
  @access  private
*/
export const hostProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;

  // get all properties belonging to this host
  const properties = <any>[];

  res.status(200).json({
    success: true,
    data: {
      properties,
      user,
    },
    message: "Host profile details",
  });
});

/**
  @desc    GET CURRENTLY LOGGED IN CLIENT
  @route   /api/auth/client
  @access  private
*/
export const clientProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user;

    res.status(200).json({
      success: true,
      data: user,
      message: "User details",
    });
  }
);

/**
  @desc    UPDATE DETAILS OF AN EXISTING USER
  @route   /api/auth/update
  @access  private
*/
export const userUpdate = asyncHandler(
  async (req: Request<any, any, UpdateUserType>, res: Response) => {
    const user = req.user;
    const userData = req.body;

    if (userData.email && !validator.isEmail(userData.email)) {
      throw createHttpError("Invalid email address", HttpStatusCode.BadRequest);
    }

    if (userData.email && userData.email === user.email) {
      throw createHttpError(
        "The new email address must be different from the current one",
        HttpStatusCode.BadRequest
      );
    }

    if (userData.password && !validator.isStrongPassword(userData.password)) {
      throw createHttpError(
        "Password is not strong enough",
        HttpStatusCode.BadRequest
      );
    }

    const updatedUser = await updateUser(userData, user);

    res.status(200).json({
      success: updatedUser.success,
      data: updatedUser.data,
      message: updatedUser.message,
    });
  }
);

/**
  @desc    ALLOW A USER TO UPDATE THEIR IMAGE/AVATAR
  @route   /api/auth/upload
  @access  private
*/
export const uploadAvatar = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user;
    const avatar = req?.files?.avatar as fileUpload.UploadedFile;

    if (!avatar) {
      throw createHttpError(
        "Please upload an image",
        HttpStatusCode.BadRequest
      );
    }

    if (!validator.isMimeType(avatar.mimetype)) {
      throw createHttpError(
        "Please upload a valid image",
        HttpStatusCode.BadRequest
      );
    }

    const url = await uploadSingleImage(avatar, "users");

    const updatedData = await User.findOneAndUpdate(
      { _id: user._id },
      { image: url },
      { new: true }
    ).select("-password -__v");

    if (!updatedData) {
      throw createHttpError(
        "Error while uploading your image.",
        HttpStatusCode.BadRequest
      );
    }

    res.status(200).json({
      success: true,
      data: updatedData,
      message: "Profile image uploaded successfully",
    });
  }
);

/**
  @desc    DELETE AN EXISTING USER
  @route   /api/auth/delete
  @access  private
*/
export const userDelete = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;

  await deleteUser(user._id.toString());

  res.status(200).json({
    success: true,
    data: null,
    message: "User deleted successfully",
  });
});
