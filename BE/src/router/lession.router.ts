import express from "express";
const router = express.Router();
import { LessionService } from "../api";

router.route("/").post(LessionService.create);
router.route("/").put(LessionService.update);
router.route("/:id").get(LessionService.getById);
router.route("/chapter").post(LessionService.addChapter);
router.route("/chapter:id").put(LessionService.addChapter);
router.route("/getchapter").post(LessionService.getChapters);
router.route("/chapterid").get(LessionService.getChapter);

export default router;
