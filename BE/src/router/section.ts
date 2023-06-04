import express from "express";
const router = express.Router();
import { SectionService } from "../api";

router.route("/").post(SectionService.add);

export default router;
