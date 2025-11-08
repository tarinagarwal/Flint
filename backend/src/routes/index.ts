import { Router } from "express";
import authRoutes from "./auth.routes";
import collegeRoutes from "./college.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/colleges", collegeRoutes);

export default router;
