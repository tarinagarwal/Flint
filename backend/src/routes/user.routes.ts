import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/profile/:username",
  authMiddleware,
  userController.getProfileByUsername
);

export default router;
