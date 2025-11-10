import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/me", authMiddleware, authController.getMe);
router.patch(
  "/profile-setup",
  authMiddleware,
  authController.updateProfileSetup
);
router.patch("/preferences", authMiddleware, authController.updatePreferences);
router.patch("/update-profile", authMiddleware, authController.updateProfile);

export default router;
