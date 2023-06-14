"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var api_1 = require("../api");
var router = express_1.default.Router();
router.route("/").post(api_1.AssignmentService.create);
router.route("/").put(api_1.AssignmentService.update);
exports.default = router;
