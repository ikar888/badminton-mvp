import express from "express";
import requireAuth from "../middleware/authMiddleware.js";
import { createSession, joinSession, getSessionById, getUpcomingSessions } from "../controllers/sessionController.js";

const router = express.Router();

router.use(requireAuth);

router.post("/", createSession);
router.patch("/:id/join", joinSession);
router.get("/upcoming", getUpcomingSessions);
router.get("/:sessionId", getSessionById);


export default router