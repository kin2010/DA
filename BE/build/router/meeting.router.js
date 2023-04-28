"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var api_1 = require("../api");
router.route("/").post(api_1.MeetingSerivce.create);
router.route("/").get(api_1.MeetingSerivce.getRoom);
router.route("/").put(api_1.MeetingSerivce.update);
exports.default = router;
