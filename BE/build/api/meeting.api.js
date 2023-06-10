"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_1 = __importDefault(require("http-status"));
var models_1 = require("../models");
var APIError_1 = __importDefault(require("../utils/APIError"));
var MeetingApi = /** @class */ (function () {
    function MeetingApi() {
    }
    var _a;
    _a = MeetingApi;
    MeetingApi.create = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var mtg, error_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, models_1.Meeting.create(__assign({}, req.body))];
                case 1: return [4 /*yield*/, (_b.sent()).populate([
                        {
                            path: "teacher",
                            select: "fullName",
                        },
                        {
                            path: "users",
                            select: "avatar email fullName address phone online",
                        },
                        {
                            path: "ralseHand",
                            select: "time user",
                            populate: {
                                path: "user",
                                select: "avatar email fullName address phone online",
                            },
                        },
                        {
                            path: "plusMark",
                            select: "time user",
                            populate: {
                                path: "user",
                                select: "avatar email fullName address phone online",
                            },
                        },
                        {
                            path: "chat",
                            select: "user time msg",
                            populate: {
                                path: "user",
                                select: "avatar email fullName address phone online",
                            },
                        },
                    ])];
                case 2:
                    mtg = _b.sent();
                    res
                        .json({
                        meeting: mtg,
                        message: "Create successfully ",
                        status: 200,
                    })
                        .status(http_status_1.default.OK);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    next(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    MeetingApi.getRoom = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var url, mtg, error_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    url = req.body.url;
                    if (!url) {
                        throw new APIError_1.default({
                            message: "Room not found",
                            status: 404,
                        });
                    }
                    return [4 /*yield*/, models_1.Meeting.findOne({ url: url })];
                case 1:
                    mtg = _b.sent();
                    if (!mtg) {
                        throw new APIError_1.default({
                            message: "Room not found",
                            status: 404,
                        });
                    }
                    res
                        .json({
                        meeting: mtg,
                        status: 200,
                    })
                        .status(200)
                        .end();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    next(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    MeetingApi.update = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, _id, data, mtg, error_3;
        var _c;
        return __generator(_a, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 3, , 4]);
                    _b = req.body, _id = _b._id, data = _b.data;
                    if (!_id) {
                        throw new APIError_1.default({
                            message: "Room not found",
                            status: 404,
                        });
                    }
                    return [4 /*yield*/, models_1.Meeting.findOneAndUpdate({ _id: _id }, __assign({}, data), { new: true })];
                case 1: return [4 /*yield*/, ((_c = (_d.sent())) === null || _c === void 0 ? void 0 : _c.populate([
                        {
                            path: "teacher",
                            select: "fullName",
                        },
                        {
                            path: "users",
                            select: "avatar email fullName address phone online",
                        },
                        {
                            path: "ralseHand",
                            select: "time user",
                            populate: {
                                path: "user",
                                select: "avatar email fullName address phone online",
                            },
                        },
                        {
                            path: "plusMark",
                            select: "time user",
                            populate: {
                                path: "user",
                                select: "avatar email fullName address phone online",
                            },
                        },
                        {
                            path: "chat",
                            select: "user time msg",
                            populate: {
                                path: "user",
                                select: "avatar email fullName address phone online",
                            },
                        },
                    ]))];
                case 2:
                    mtg = _d.sent();
                    if (!mtg) {
                        throw new APIError_1.default({
                            message: "Room not found",
                            status: 404,
                        });
                    }
                    res
                        .json({
                        meeting: mtg,
                        status: 200,
                    })
                        .status(200)
                        .end();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _d.sent();
                    next(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    //
    MeetingApi.online = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, userId, room, type, roomExist, rs, r, users, set, error_4;
        var _c, _d;
        return __generator(_a, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 9, , 10]);
                    _b = req.body, userId = _b.userId, room = _b.room, type = _b.type;
                    return [4 /*yield*/, models_1.Meeting.findOne({
                            url: room,
                        })];
                case 1:
                    roomExist = _e.sent();
                    rs = void 0;
                    if (!!roomExist) return [3 /*break*/, 4];
                    return [4 /*yield*/, models_1.Meeting.create({
                            user: [userId],
                        })];
                case 2: return [4 /*yield*/, (_e.sent()).populate([
                        {
                            path: "teacher",
                            select: "fullName",
                        },
                        {
                            path: "users",
                            select: "avatar email fullName address phone online",
                        },
                        {
                            path: "ralseHand",
                            select: "time user",
                            populate: {
                                path: "user",
                                select: "avatar email fullName address phone online",
                            },
                        },
                        {
                            path: "plusMark",
                            select: "time user",
                            populate: {
                                path: "user",
                                select: "avatar email fullName address phone online",
                            },
                        },
                        {
                            path: "chat",
                            select: "user time msg",
                            populate: {
                                path: "user",
                                select: "avatar email fullName address phone online",
                            },
                        },
                    ])];
                case 3:
                    rs = _e.sent();
                    return [3 /*break*/, 8];
                case 4: return [4 /*yield*/, models_1.Meeting.findOne({ url: room })];
                case 5:
                    r = _e.sent();
                    users = (_c = r === null || r === void 0 ? void 0 : r.users) === null || _c === void 0 ? void 0 : _c.map(function (vl) { return vl === null || vl === void 0 ? void 0 : vl.valueOf(); });
                    set = new Set(users);
                    if (type === "delete") {
                        console.log(22, users);
                        set.delete(userId);
                    }
                    else {
                        set.add(userId);
                    }
                    console.log("after", set);
                    return [4 /*yield*/, models_1.Meeting.findOneAndUpdate({
                            url: room,
                        }, {
                            users: Array.from(set),
                        }, { new: true })];
                case 6: return [4 /*yield*/, ((_d = (_e.sent())) === null || _d === void 0 ? void 0 : _d.populate([
                        {
                            path: "teacher",
                            select: "fullName",
                        },
                        {
                            path: "users",
                            select: "avatar email fullName address phone online",
                        },
                        {
                            path: "ralseHand",
                            select: "time user",
                            populate: {
                                path: "user",
                                select: "avatar email fullName address phone online",
                            },
                        },
                        {
                            path: "plusMark",
                            select: "time user",
                            populate: {
                                path: "user",
                                select: "avatar email fullName address phone online",
                            },
                        },
                        {
                            path: "chat",
                            select: "user time msg",
                            populate: {
                                path: "user",
                                select: "avatar email fullName address phone online",
                            },
                        },
                    ]))];
                case 7:
                    rs = _e.sent();
                    _e.label = 8;
                case 8:
                    res
                        .json({
                        meeting: rs,
                        status: 200,
                    })
                        .status(200)
                        .end();
                    return [3 /*break*/, 10];
                case 9:
                    error_4 = _e.sent();
                    next(error_4);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); };
    MeetingApi.chat = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, room, userId, message, time, r, user, messages, newChats, rs, error_5;
        var _c;
        return __generator(_a, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, , 6]);
                    _b = req.body, room = _b.room, userId = _b.userId, message = _b.message, time = _b.time;
                    return [4 /*yield*/, models_1.Meeting.findOne({ url: room })];
                case 1:
                    r = _d.sent();
                    if (!r) {
                        throw new APIError_1.default({
                            status: http_status_1.default.NOT_FOUND,
                            message: "Room is not exist!",
                        });
                    }
                    return [4 /*yield*/, models_1.User.findById(userId)];
                case 2:
                    user = _d.sent();
                    if (!user) {
                        throw new APIError_1.default({
                            status: http_status_1.default.NOT_FOUND,
                            message: "User not found",
                        });
                    }
                    messages = r.chat;
                    console.log(22, messages);
                    newChats = __spreadArray(__spreadArray([], messages, true), [
                        {
                            user: userId,
                            time: time || new Date(),
                            msg: message,
                        },
                    ], false);
                    return [4 /*yield*/, models_1.Meeting.findOneAndUpdate({ url: room }, { chat: newChats }, { new: true })];
                case 3: return [4 /*yield*/, ((_c = (_d.sent())) === null || _c === void 0 ? void 0 : _c.populate([
                        {
                            path: "teacher",
                            select: "fullName",
                        },
                        {
                            path: "users",
                            select: "avatar email fullName address phone online",
                        },
                        {
                            path: "ralseHand",
                            select: "time user",
                            populate: {
                                path: "user",
                                select: "avatar email fullName address phone online",
                            },
                        },
                        {
                            path: "plusMark",
                            select: "time user",
                            populate: {
                                path: "user",
                                select: "avatar email fullName address phone online",
                            },
                        },
                        {
                            path: "chat",
                            select: "user time msg",
                            populate: {
                                path: "user",
                                select: "avatar email fullName address phone online",
                            },
                        },
                    ]))];
                case 4:
                    rs = _d.sent();
                    res
                        .json({
                        msg: rs,
                        status: 200,
                    })
                        .status(200)
                        .end();
                    return [3 /*break*/, 6];
                case 5:
                    error_5 = _d.sent();
                    next(error_5);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return MeetingApi;
}());
exports.default = MeetingApi;
