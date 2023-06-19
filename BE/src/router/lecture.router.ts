import express from "express";
const router = express.Router();
import { LectureService } from "../api";
router.route("/").post(LectureService.create);
router.route("/").put(LectureService.update);
router.route("/:id").get(LectureService.getById);
router.route("/section").post(LectureService.addChapter);
router.route("/section/:id").put(LectureService.updateChapter);
router.route("/sectionid/:id").get(LectureService.getChapter);
router.route("/allsection").get(LectureService.getChapters);

export default router;
