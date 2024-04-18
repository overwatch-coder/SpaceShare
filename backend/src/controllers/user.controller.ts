import asyncHandler from "express-async-handler";
import { createUser, findUser } from "@/services/user.service";
import { Request, Response } from "express";
import { comparePassword, generateToken } from "@/lib";
import validator from "validator";
import { createHttpError, HttpStatusCode } from "@/middleware/error.middleware";
import User from "@/models/user.model";
import { CreateUserType, LoginUserType } from "@/types";

/**
  @desc    REGISTER A NEW USER
  @route   /api/users/register
  @access  public
*/
export const registerUser = asyncHandler(
  async (req: Request<any, any, CreateUserType>, res: Response) => {
    const data = req.body;

    // check if required fields are present
    if (!data.email || data.name || !data.username || !data.password) {
      throw createHttpError(
        "Missing required fields",
        HttpStatusCode.BadRequest
      );
    }

    // check if email is valid
    if (!validator.isEmail(data.email)) {
      throw createHttpError("Invalid email address", HttpStatusCode.BadRequest);
    }

    // check if password is strong enough
    if (!validator.isStrongPassword(data.password)) {
      throw createHttpError(
        "Password is not strong enough",
        HttpStatusCode.BadRequest
      );
    }

    // check if email already exists
    const emailAlreadyExists = await User.findOne({ email: data.email })
      .lean()
      .exec();

    if (emailAlreadyExists) {
      throw createHttpError("User already exists", HttpStatusCode.BadRequest);
    }

    // check if username already exists
    const usernameAlreadyExists = await User.findOne({
      username: data.username,
    });

    if (usernameAlreadyExists) {
      throw createHttpError(
        "Username already taken. Please choose a different username",
        HttpStatusCode.BadRequest
      );
    }

    const user = await createUser(data);

    res.status(201).json({
      success: true,
      data: user,
      message: "Account created successfully.",
    });
  }
);

/**
  @desc    LOGIN AN EXISTING USER
  @route   /api/users/login
  @access  public
*/
export const loginUser = asyncHandler(
  async (req: Request<any, any, LoginUserType>, res: Response) => {
    const { email, password: clientPassword } = req.body;
    if (!email || !clientPassword) {
      throw createHttpError(
        "Please provide email and password",
        HttpStatusCode.BadRequest
      );
    }

    // find user by email
    const user = await findUser(email, true);

    // check if password is correct
    const isPasswordCorrect = await comparePassword(
      clientPassword,
      user.password
    );

    // throw error if password is incorrect
    if (!isPasswordCorrect) {
      throw createHttpError("Invalid credentials", HttpStatusCode.Unauthorized);
    }

    // generate access token and send cookie
    generateToken(res, user._id.toString());

    const { password, ...rest } = user;

    res.status(200).json({
      success: true,
      data: rest,
      message: "You've successfully logged in.",
    });
  }
);

/**
  @desc    LOGOUT A USER
  @route   /api/users/logout
  @access  public
*/
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("access_token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    data: null,
    message: "You have successfully logged out",
  });
});
