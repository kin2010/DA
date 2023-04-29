import express from "express";
const router = express.Router();
import { MeetingSerivce } from "../api";

router.route("/").post(MeetingSerivce.create);
router.route("/").get(MeetingSerivce.getRoom);
router.route("/").put(MeetingSerivce.update);
router.route("/online").post(MeetingSerivce.online);

export default router;
