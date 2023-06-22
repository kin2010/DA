import express from "express";
const router = express.Router();
import CourseServce from "../api/course.api";

router.route("/").post(CourseServce.create);
router.route("/all").get(CourseServce.allCourse);
router.route("/getbyrole").get(CourseServce.getByRole);
router.route("/comment").post(CourseServce.postComment);
router.route("/:id").get(CourseServce.getOne);
router.route("/:id").put(CourseServce.update);

export default router;
