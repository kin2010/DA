import express from "express";
const router = express.Router();
import { LessionService } from "../api";

router.route("/").post(LessionService.create);
router.route("/").put(LessionService.update);
router.route("/:id").get(LessionService.getById);
router.route("/chapter").post(LessionService.addChapter);
router.route("/chapter:id").put(LessionService.addChapter);
router.route("/getchapter").get(LessionService.getChapters);
router.route("/chapterid/:id").get(LessionService.getChapter);

export default router;
