import express from "express";
const router = express.Router();
import { GroupService } from "../api";
router.route("/").post(GroupService.add);
router.route("/getbyuser/:id").get(GroupService.getByUser);
router.route("/:id").get(GroupService.getById);
router.route("/:id").put(GroupService.update);
router.route("/chat").post(GroupService.chat);

export default router;
