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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
var GroupApi = /** @class */ (function () {
    function GroupApi() {
    }
    var _a;
    _a = GroupApi;
    GroupApi.add = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var course, cc, data, group, error_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    course = (req === null || req === void 0 ? void 0 : req.body).course;
                    return [4 /*yield*/, models_1.Course.findById(course)];
                case 1:
                    cc = _b.sent();
                    if (!cc) {
                        throw new APIError_1.default({
                            message: "Course id is required",
                            status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        });
                    }
                    data = __assign(__assign({}, req.body), { course: course });
                    return [4 /*yield*/, models_1.Group.create(__assign({}, data))];
                case 2: return [4 /*yield*/, _b.sent()];
                case 3:
                    group = _b.sent();
                    return [4 /*yield*/, cc.update({
                            groups: __spreadArray(__spreadArray([], cc.groups, true), [group === null || group === void 0 ? void 0 : group._id], false),
                        })];
                case 4:
                    _b.sent();
                    res
                        .json({
                        data: group,
                        status: 200,
                    })
                        .status(http_status_1.default.OK);
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _b.sent();
                    next(error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    GroupApi.update = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, other, out, chapter, error_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    id = req.params.id;
                    other = __rest(req.body, []);
                    console.log(req.body, 22);
                    return [4 /*yield*/, models_1.Group.findById(id)];
                case 1:
                    out = _b.sent();
                    if (!out) {
                        throw new APIError_1.default({
                            message: "Not found",
                            status: http_status_1.default.NOT_FOUND,
                        });
                    }
                    return [4 /*yield*/, models_1.Group.findByIdAndUpdate(id, __assign({}, other), {
                            new: true,
                        })];
                case 2: return [4 /*yield*/, _b.sent()];
                case 3:
                    chapter = _b.sent();
                    res
                        .json({
                        data: chapter,
                        status: 200,
                    })
                        .status(http_status_1.default.OK);
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _b.sent();
                    next(error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    GroupApi.getById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, group, groupRes, error_3;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    id = (req === null || req === void 0 ? void 0 : req.params).id;
                    return [4 /*yield*/, models_1.Group.findById(id)];
                case 1:
                    group = _b.sent();
                    if (!group) {
                        throw new APIError_1.default({
                            message: "NOT FOUND !",
                            status: http_status_1.default.NOT_FOUND,
                        });
                    }
                    return [4 /*yield*/, group.populate([
                            {
                                path: "course",
                                select: "",
                                populate: [
                                    {
                                        path: "teachers",
                                        select: "",
                                    },
                                    {
                                        path: "users",
                                        select: "",
                                    },
                                ],
                            },
                            {
                                path: "chats",
                                select: "",
                                populate: [
                                    {
                                        path: "user",
                                        select: "",
                                    },
                                ],
                            },
                            {
                                path: "meetings",
                                select: "",
                                populate: [
                                    {
                                        path: "users",
                                        select: "",
                                    },
                                    {
                                        path: "attendance",
                                        select: "",
                                    },
                                    {
                                        path: "createdby",
                                        select: "",
                                    },
                                ],
                            },
                        ])];
                case 2:
                    groupRes = _b.sent();
                    res
                        .json({
                        data: groupRes,
                        status: 200,
                    })
                        .status(http_status_1.default.OK)
                        .end();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    next(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    GroupApi.getByUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id_1, group, resGr, error_4;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id_1 = (req === null || req === void 0 ? void 0 : req.params).id;
                    console.log(id_1, 21);
                    return [4 /*yield*/, models_1.Group.aggregate([
                            {
                                $lookup: {
                                    from: "courses",
                                    localField: "course",
                                    foreignField: "_id",
                                    as: "course",
                                },
                            },
                            {
                                $unwind: "$course",
                            },
                            // {
                            //   $match: {
                            //     "course.users": {
                            //       $elemMatch: { $eq: "63708cf77f4f6836c48bdb5f" },
                            //     },
                            //   },
                            // },
                        ])];
                case 1:
                    group = _b.sent();
                    resGr = (group === null || group === void 0 ? void 0 : group.filter(function (gr) {
                        var _b, _c;
                        var arr = (_c = (_b = gr === null || gr === void 0 ? void 0 : gr.course) === null || _b === void 0 ? void 0 : _b.users) === null || _c === void 0 ? void 0 : _c.map(function (z) { return z === null || z === void 0 ? void 0 : z.toString(); });
                        return arr === null || arr === void 0 ? void 0 : arr.includes(id_1);
                    })) || [];
                    res
                        .json({
                        data: resGr || [],
                        status: 200,
                    })
                        .status(http_status_1.default.OK)
                        .end();
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _b.sent();
                    next(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    GroupApi.chat = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, group, userId, msg, time, r, user, messages, newChats, rs, error_5;
        var _c;
        return __generator(_a, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, , 6]);
                    _b = req.body, group = _b.group, userId = _b.userId, msg = _b.msg, time = _b.time;
                    return [4 /*yield*/, models_1.Group.findById(group)];
                case 1:
                    r = _d.sent();
                    console.log(999, req.body);
                    if (!r) {
                        throw new APIError_1.default({
                            status: http_status_1.default.NOT_FOUND,
                            message: "Group is not exist!",
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
                    messages = r.chats || [];
                    newChats = __spreadArray(__spreadArray([], messages, true), [
                        {
                            user: userId,
                            time: time || new Date(),
                            msg: msg,
                        },
                    ], false);
                    return [4 /*yield*/, models_1.Group.findByIdAndUpdate(group, { chats: newChats }, { new: true })];
                case 3: return [4 /*yield*/, ((_c = (_d.sent())) === null || _c === void 0 ? void 0 : _c.populate([
                        {
                            path: "course",
                            select: "",
                        },
                        {
                            path: "chats",
                            select: "",
                            populate: {
                                path: "user",
                                select: "",
                            },
                        },
                    ]))];
                case 4:
                    rs = _d.sent();
                    res
                        .json({
                        data: rs,
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
    return GroupApi;
}());
exports.default = GroupApi;
