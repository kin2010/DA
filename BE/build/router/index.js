"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_router_1 = __importDefault(require("./auth.router"));
var lession_router_1 = __importDefault(require("./lession.router"));
var course_router_1 = __importDefault(require("../router/course.router"));
var meeting_router_1 = __importDefault(require("../router/meeting.router"));
var route = express_1.default.Router();
route.use("/auth", auth_router_1.default);
route.use("/lession", lession_router_1.default);
route.use("/course", course_router_1.default);
route.use("/meeting", meeting_router_1.default);
exports.default = route;
