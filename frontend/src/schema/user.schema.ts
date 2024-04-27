import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email()
    .trim()
    .transform((email) => email.toLowerCase()),
  password: z.string({ required_error: "Password is required" }).trim(),
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

const userSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  username: z.string().optional(),
  age: z.string().optional(),
  gender: z.string().optional(),
  hobbies: z.string().optional(),
  interests: z.string().optional(),
  smoker: z.coerce
    .string()
    .transform((value) => (value ? (value === "true" ? true : false) : false)),
  pets: z.coerce
    .string()
    .transform((value) => (value ? (value === "true" ? true : false) : false)),
  drinker: z.coerce
    .string()
    .transform((value) => (value ? (value === "true" ? true : false) : false)),
  phone: z.string().optional(),
});

export const updateUserSchema = userSchema.partial();

export type Login = z.infer<typeof loginSchema>;
export type Register = z.infer<typeof registerSchema>;
export type UpdateUserType = z.infer<typeof updateUserSchema>;
