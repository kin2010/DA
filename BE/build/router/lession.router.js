"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var api_1 = require("../api");
router.route("/").post(api_1.LectureService.create);
router.route("/").put(api_1.LectureService.update);
router.route("/:id").get(api_1.LectureService.getById);
router.route("/section").post(api_1.LectureService.addChapter);
router.route("/section/:id").put(api_1.LectureService.updateChapter);
router.route("/sectionid/:id").get(api_1.LectureService.getChapter);
router.route("/allsection").get(api_1.LectureService.getChapters);
exports.default = router;
