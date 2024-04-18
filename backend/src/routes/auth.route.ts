import {
  hostProfile,
  clientProfile,
  userDelete,
  userUpdate,
  uploadAvatar,
} from "@/controllers/auth.controller";
import { protectHost, protectUser } from "@/middleware/auth.middleware";
import express from "express";

const router = express.Router();

// check if user is authorized
router.use(protectUser);

router.get("/client", clientProfile);
router.get("host", protectHost, hostProfile);
router.patch("/update", userUpdate);
router.post("/upload", uploadAvatar);
router.delete("/delete", userDelete);

export default router;
