import express from "express";
import requireAuth from "../middleware/authMiddleware.js";
import { createMatchFromSession, startMatch, completeMatch, substitutePlayer, getMatchesBySession,
} from "../controllers/matchController.js";

const router = express.Router();

router.use(requireAuth);

router.post("/sessions/:sessionId", createMatchFromSession);
router.get("/sessions/:sessionId", getMatchesBySession);

router.patch("/:id/start", startMatch);
router.patch("/:id/complete", completeMatch);
router.patch("/:id/substitute", substitutePlayer);


export default router;
