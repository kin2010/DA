import express from "express";
import { AssignmentService } from "../api";
const router = express.Router();
router.route("/").post(AssignmentService.create);
router.route("/:id").get(AssignmentService.getById);
router.route("/").put(AssignmentService.update);
export default router;
