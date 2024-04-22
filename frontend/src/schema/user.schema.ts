import { z } from "zod";

export const loginSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .email()
      .trim()
      .transform((email) => email.toLowerCase()),
    password: z.string({ required_error: "Password is required" }).trim(),
    confirmPassword: z
      .string({
        required_error: "Confirm Password is required",
      })
      .trim(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const registerSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .email()
      .trim()
      .transform((email) => email.toLowerCase()),
    password: z.string({ required_error: "Password is required" }).trim(),
    confirmPassword: z
      .string({
        required_error: "Confirm Password is required",
      })
      .trim(),
    name: z.string({ required_error: "Name is required" }).trim(),
    role: z.enum(["host", "client"], {
      errorMap: (issue, ctx) => {
        switch (issue.code) {
          case "invalid_enum_value":
            return { message: "Select one of the reasons" };
          case "invalid_type":
            return { message: "Select one of the reasons" };
          default:
            return { message: "Select one of the reasons" };
        }
      },
    }),
    username: z.string({ required_error: "Username is required" }).trim(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type Login = z.infer<typeof loginSchema>;
export type Register = z.infer<typeof registerSchema>;
