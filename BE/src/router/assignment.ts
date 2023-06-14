import express from "express";
import { AssignmentService } from "../api";
const router = express.Router();
router.route("/").post(AssignmentService.create);
router.route("/").put(AssignmentService.update);
export default router;
