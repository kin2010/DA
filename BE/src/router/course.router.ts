import express from "express";
const router = express.Router();
import CourseServce from "../api/course.api";

router.route("/").post(CourseServce.create);
router.route("/:id").get(CourseServce.getOne);
router.route("/:id").put(CourseServce.update);
router.route("/getteacher").get(CourseServce.getTeacher);

export default router;
