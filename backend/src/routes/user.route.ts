import {
  loginUser,
  logoutUser,
  registerUser,
} from "@/controllers/user.controller";
import { Router } from "express";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
