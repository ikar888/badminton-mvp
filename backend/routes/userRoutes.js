import express from "express";
import { updateUser, getProfile } from "../controllers/userController.js";
import requireAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", requireAuth, getProfile);
router.put("/me", requireAuth, updateUser);

export default router;
