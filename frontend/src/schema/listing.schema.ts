import { z } from "zod";

export const listingSchema = z
  .object({
    name: z.string({ required_error: "Name is required" }),
    description: z.string({ required_error: "Description is required" }),
    address: z.string().optional().default(""),
    location: z.string({ required_error: "Location is required" }),
    ratePerNight: z.coerce
      .number({ required_error: "Rate per night is required" })
      .positive({
        message: "Rate per night must be a positive number",
      }),
    minAvailableDate: z.coerce
      .date({
        errorMap: (issue, ctx) => {
          switch (issue.code) {
            case "invalid_date":
              return { message: "Available From date is required" };
            case "invalid_type":
              return {
                message: "Please choose a date",
              };
            default:
              return { message: "Please choose a date" };
          }
        },
      })
      .transform((date) => date.toISOString()),
    maxAvailableDate: z.coerce
      .date({
        errorMap: (issue, ctx) => {
          switch (issue.code) {
            case "invalid_date":
              return { message: "Available Until date is required" };
            case "invalid_type":
              return {
                message: "Please choose a date",
              };
            default:
              return { message: "Please choose a date" };
          }
        },
      })
      .transform((date) => date.toISOString()),
    minRentalTime: z.coerce
      .number()
      .positive({
        message: "Minimum rental time must be a positive number",
      })
      .default(1)
      .optional(),
    maxRentalTime: z.coerce
      .number()
      .positive({
        message: "Maximum rental time must be a positive number",
      })
      .default(7)
      .optional(),
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
    numberOfRooms: z.coerce.number({
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
    status: z
      .enum(["available", "unavailable"])
      .default("available")
      .optional(),
    isFeatured: z.boolean().default(false),
    rating: z.coerce.number().default(0),
    category: z.string().optional().default("others"),
    capacity: z.coerce.number().optional().default(0),
    amenities: z.string().optional().default("")
  })
  .superRefine((values, ctx) => {
    if (values.maxAvailableDate < values.minAvailableDate) {
      return ctx.addIssue({
        code: "custom",
        message: "Available From date cannot be after Available Until date",
        path: ["maxAvailableDate"],
      });
    }

    if (values.numberOfGuests === 0) {
      return ctx.addIssue({
        code: "custom",
        message: "Please select max number of people",
        path: ["numberOfGuests"],
      });
    }

    if (values.numberOfRooms === 0) {
      return ctx.addIssue({
        code: "custom",
        message: "Please select number of rooms available",
        path: ["numberOfRooms"],
      });
    }
  });

export type ListingType = z.infer<typeof listingSchema>;
