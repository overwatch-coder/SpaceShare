import { Mongoose } from "mongoose";
import { UserType } from "@/models/user.model";

// Extend Express Request interface
declare global {
  namespace Express {
    export interface Request {
      user: UserType;
    }
  }
}

// Extend Mongoose Document interface
declare module "mongoose" {
  export interface Document {
    _id: string;
  }
}

// custom types
export type CreateUserType = {
  name: string;
  email: string;
  password: string;
  username: string;
  role: "host" | "client";
};

export type LoginUserType = {
  password: string;
  email: string;
};
