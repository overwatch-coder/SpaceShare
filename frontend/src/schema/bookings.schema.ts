import { z } from "zod";

export const initialBookFormSchema = z.object({
  checkInDate: z.coerce
    .date({
      errorMap: (issue, ctx) => {
        switch (issue.code) {
          case "invalid_date":
            return { message: "Check In date is required" };
          case "invalid_type":
            return {
              message: "Please choose a date",
            };
          default:
            return { message: "Please choose a date" };
        }
      },
    })
    .transform((date) => date.toLocaleString()),
  checkOutDate: z.coerce
    .date({
      errorMap: (issue, ctx) => {
        switch (issue.code) {
          case "invalid_date":
            return { message: "Check Out date is required" };
          case "invalid_type":
            return {
              message: "Please choose a date",
            };
          default:
            return { message: "Please choose a date" };
        }
      },
    })
    .transform((date) => date.toLocaleString()),
  numberOfGuests: z.coerce.number({
    errorMap: (issue, ctx) => {
      switch (issue.code) {
        case "invalid_type":
          return {
            message: "Please choose a number",
          };
        default:
          return { message: "Please choose a number" };
      }
    },
  }),
});

export const createBookingSchema = initialBookFormSchema.extend({
  property: z.string({ required_error: "Property id is required" }),
  client: z.string({ required_error: "Client id is required" }),
});

export const bookFormSchema = initialBookFormSchema.superRefine(
  (values, ctx) => {
    if (values.checkOutDate < values.checkInDate) {
      return ctx.addIssue({
        code: "custom",
        message: "Check Out date cannot be before Check In date",
        path: ["checkOutDate"],
      });
    }
  }
);

export type BookingFormType = z.infer<typeof bookFormSchema>;
