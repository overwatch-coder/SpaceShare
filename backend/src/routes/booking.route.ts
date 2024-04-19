import { Router } from "express";
import { protectUser } from "@/middleware/auth.middleware";
import {
  getAllBookings,
  getSingleBooking,
  createBooking,
  updateBooking,
  deleteBooking,
} from "@/controllers/booking.controller";

const router = Router();

// check if user is authorized to access this route
router.use(protectUser);

router.get("/", getAllBookings);
router.get("/:id", getSingleBooking);
router.post("/", createBooking);
router.patch("/:id", updateBooking);
router.delete("/:id", deleteBooking);

export default router;
