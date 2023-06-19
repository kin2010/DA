import express from "express";
const router = express.Router();
import { MeetingSerivce } from "../api";

router.route("/").post(MeetingSerivce.create);
router.route("/:id").get(MeetingSerivce.getRoom);
router.route("/get/:id").get(MeetingSerivce.getById);
router.route("/").put(MeetingSerivce.update);
router.route("/online").post(MeetingSerivce.online);
router.route("/chat").post(MeetingSerivce.chat);

export default router;
