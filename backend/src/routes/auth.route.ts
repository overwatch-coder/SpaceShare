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

router.get("/me", (req, res) => {
  res.status(200).json({
    message: "user retrieved successfully",
    success: true,
    data: req.user,
  });
});

router.get("/host", protectHost, hostProfile);
router.patch("/update-profile", userUpdate);
router.post("/upload-image", uploadAvatar);
router.delete("/delete", userDelete);

export default router;
