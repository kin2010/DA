"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var api_1 = require("../api");
router.route("/").post(api_1.LessionService.create);
router.route("/").put(api_1.LessionService.update);
router.route("/:id").get(api_1.LessionService.getById);
router.route("/chapter").post(api_1.LessionService.addChapter);
router.route("/chapter:id").put(api_1.LessionService.addChapter);
router.route("/getchapter").get(api_1.LessionService.getChapters);
router.route("/chapterid/:id").get(api_1.LessionService.getChapter);
exports.default = router;
