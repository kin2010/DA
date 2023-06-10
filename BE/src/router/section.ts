import express from "express";
const router = express.Router();
import { SectionService } from "../api";

router.route("/").post(SectionService.add);
router.route("/:id").put(SectionService.update);

export default router;
