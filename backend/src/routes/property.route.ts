import { Router } from "express";
import { protectHost, protectUser } from "@/middleware/auth.middleware";
import {
  getAllProperties,
  getSingleProperty,
  createProperty,
  updateProperty,
  deleteProperty,
} from "@/controllers/property.controller";

const router = Router();

// public routes
router.get("/", getAllProperties);
router.get("/:id", getSingleProperty);

// check if user is authorized to access this route
router.use(protectUser);
router.use(protectHost);
router.post("/", createProperty);
router.patch("/:id", updateProperty);
router.delete("/:id", deleteProperty);

export default router;