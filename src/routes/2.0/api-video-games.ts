import express from "express";
import * as controller from "../../controllers/2.0/Game";
import { asyncHandler } from "../../lib/asyncHandler";

const router = express.Router();
router.use("/2.0/api/video-games/:id", asyncHandler(controller.gameGet, "gameGet"));
router.use("/2.0/api/video-games", asyncHandler(controller.gameGet, "gameGet"));

export default router;