"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pino_1 = __importDefault(require("pino"));
var moment_1 = __importDefault(require("moment"));
var log = (0, pino_1.default)({
    prettyPrint: true,
    base: {
        pid: false,
    },
    timestamp: function () {
        return ",\"time\":\"".concat((0, moment_1.default)().format(), "\"");
    },
});
exports.default = log;
