import { Router } from "express";
import { collegeController } from "../controllers/college.controller";
import { authMiddleware, adminMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/approved", collegeController.getApprovedColleges);
router.post("/request", collegeController.requestCollege);
router.get(
  "/pending",
  authMiddleware,
  adminMiddleware,
  collegeController.getPendingRequests
);
router.patch(
  "/:id/approve",
  authMiddleware,
  adminMiddleware,
  collegeController.approveCollege
);
router.delete(
  "/:id/reject",
  authMiddleware,
  adminMiddleware,
  collegeController.rejectCollege
);

export default router;
