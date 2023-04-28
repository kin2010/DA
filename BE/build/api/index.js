"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingSerivce = exports.LessionService = exports.RoleSerice = exports.AuthService = void 0;
var auth_api_1 = require("./auth.api");
Object.defineProperty(exports, "AuthService", { enumerable: true, get: function () { return __importDefault(auth_api_1).default; } });
var role_api_1 = require("./role.api");
Object.defineProperty(exports, "RoleSerice", { enumerable: true, get: function () { return __importDefault(role_api_1).default; } });
var lession_api_1 = require("./lession.api");
Object.defineProperty(exports, "LessionService", { enumerable: true, get: function () { return __importDefault(lession_api_1).default; } });
var meeting_api_1 = require("./meeting.api");
Object.defineProperty(exports, "MeetingSerivce", { enumerable: true, get: function () { return __importDefault(meeting_api_1).default; } });
