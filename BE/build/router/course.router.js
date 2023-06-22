"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var course_api_1 = __importDefault(require("../api/course.api"));
router.route("/").post(course_api_1.default.create);
router.route("/all").get(course_api_1.default.allCourse);
router.route("/getbyrole").get(course_api_1.default.getByRole);
router.route("/comment").post(course_api_1.default.postComment);
router.route("/:id").get(course_api_1.default.getOne);
router.route("/:id").put(course_api_1.default.update);
exports.default = router;
