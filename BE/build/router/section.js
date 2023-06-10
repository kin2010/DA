"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var api_1 = require("../api");
router.route("/").post(api_1.SectionService.add);
router.route("/:id").put(api_1.SectionService.update);
exports.default = router;
