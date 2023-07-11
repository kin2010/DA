"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var api_1 = require("../api");
router.route("/").post(api_1.GroupService.add);
router.route("/getbyuser/:id").get(api_1.GroupService.getByUser);
router.route("/:id").get(api_1.GroupService.getById);
router.route("/:id").put(api_1.GroupService.update);
router.route("/chat").post(api_1.GroupService.chat);
exports.default = router;
