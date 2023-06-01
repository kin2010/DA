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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_1 = __importDefault(require("http-status"));
var models_1 = require("../models");
var APIError_1 = __importDefault(require("../utils/APIError"));
var CourseApi = /** @class */ (function () {
    function CourseApi() {
    }
    var _a;
    _a = CourseApi;
    CourseApi.create = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var course, error_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, models_1.Course.create(__assign({}, req.body))];
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
                            path: "chapter",
                            select: "lessions baitaps",
                            populate: [
                                {
                                    path: "lessions",
                                    select: "view time users",
                                },
                                {
                                    path: "baitaps",
                                    select: "link status outdate time",
                                },
                            ],
                        },
                    ])];
                case 2:
                    course = _b.sent();
                    res.json({ course: course, status: 200 }).status(http_status_1.default.OK);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    next();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    CourseApi.getOne = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, coures, cc, error_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    id = req.params.id;
                    console.log(id);
                    return [4 /*yield*/, models_1.Course.findById(id)];
                case 1:
                    coures = _b.sent();
                    if (!coures) {
                        throw new APIError_1.default({
                            message: "NOT FOUND !",
                            status: http_status_1.default.NOT_FOUND,
                        });
                    }
                    return [4 /*yield*/, coures.populate([
                            {
                                path: "teacher",
                                select: "fullName",
                            },
                            {
                                path: "users",
                                select: "avatar email fullName address phone online",
                            },
                            {
                                path: "chapter",
                                select: "lessions baitaps",
                                populate: [
                                    {
                                        path: "lessions",
                                        select: "view time users",
                                    },
                                    {
                                        path: "baitaps",
                                        select: "link status outdate time",
                                    },
                                ],
                            },
                        ])];
                case 2:
                    cc = _b.sent();
                    res.json({ course: cc, status: 200 }).status(http_status_1.default.OK);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    next(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    CourseApi.update = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, body, id, out, coures, error_3;
        var _c;
        return __generator(_a, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 4, , 5]);
                    _b = req.body, body = _b.body, id = _b.id;
                    return [4 /*yield*/, models_1.Course.findById(id)];
                case 1:
                    out = _d.sent();
                    if (!out) {
                        throw new APIError_1.default({
                            message: "Not found",
                            status: http_status_1.default.NOT_FOUND,
                        });
                    }
                    return [4 /*yield*/, models_1.Course.findByIdAndUpdate(id, body, {
                            new: true,
                        })];
                case 2: return [4 /*yield*/, ((_c = (_d.sent())) === null || _c === void 0 ? void 0 : _c.populate([
                        {
                            path: "teacher",
                            select: "avatar email fullName address phone online",
                        },
                        {
                            path: "users",
                            select: "avatar email fullName address phone online",
                        },
                        // {
                        //   path: "ralseHand",
                        //   select: "time user",
                        //   populate: {
                        //     path: "user",
                        //     select: "avatar email fullName address phone online",
                        //   },
                        // },
                        // {
                        //   path: "plusMark",
                        //   select: "time user",
                        //   populate: {
                        //     path: "user",
                        //     select: "avatar email fullName address phone online",
                        //   },
                        // },
                    ]))];
                case 3:
                    coures = _d.sent();
                    res
                        .json({
                        course: coures,
                        status: 200,
                    })
                        .status(http_status_1.default.OK);
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _d.sent();
                    next(error_3);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    CourseApi.getByRole = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, role_1, courseId, coures, courseUsers_1, users, dt, error_4;
        var _c;
        return __generator(_a, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 3, , 4]);
                    _b = req.query, role_1 = _b.role, courseId = _b.courseId;
                    coures = [];
                    return [4 /*yield*/, models_1.Course.findById(courseId)];
                case 1:
                    // if (!courseId) {
                    //   coures = await User.find({
                    //     "role.roleName": role,
                    //   });
                    // } else {
                    // }
                    coures = _d.sent();
                    courseUsers_1 = [];
                    if (!!coures) {
                        courseUsers_1 = coures === null || coures === void 0 ? void 0 : coures.users;
                    }
                    return [4 /*yield*/, models_1.User.aggregate([
                            {
                                $lookup: {
                                    from: "roles",
                                    localField: "role",
                                    foreignField: "_id",
                                    as: "role",
                                },
                            },
                            {
                                $unwind: "$role",
                            },
                        ])];
                case 2:
                    users = _d.sent();
                    dt = (_c = users === null || users === void 0 ? void 0 : users.filter(function (user) {
                        var _b;
                        return !!role_1 ? ((_b = user === null || user === void 0 ? void 0 : user.role) === null || _b === void 0 ? void 0 : _b.roleName) === role_1 : true;
                    })) === null || _c === void 0 ? void 0 : _c.map(function (user) {
                        return __assign(__assign({}, user), { enrolled: !!(courseUsers_1 === null || courseUsers_1 === void 0 ? void 0 : courseUsers_1.includes(user === null || user === void 0 ? void 0 : user._id)) });
                    });
                    res
                        .json({
                        users: dt,
                        status: 200,
                    })
                        .status(http_status_1.default.OK);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _d.sent();
                    next(error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    CourseApi.allCourse = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, limit, skip, count, courses, error_5;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    _b = req.query, limit = _b.limit, skip = _b.skip;
                    return [4 /*yield*/, models_1.Course.find({})];
                case 1:
                    count = _c.sent();
                    return [4 /*yield*/, models_1.Course.find({})
                            .limit(parseInt(limit))
                            .skip(parseInt(skip))
                            .sort({ createdAt: -1 })
                            .populate([
                            {
                                path: "teacher",
                                select: "fullName",
                            },
                            {
                                path: "users",
                                select: "avatar email fullName address phone online",
                            },
                            {
                                path: "chapter",
                                select: "lessions baitaps",
                                populate: [
                                    {
                                        path: "lessions",
                                        select: "view time users",
                                    },
                                    {
                                        path: "baitaps",
                                        select: "link status outdate time",
                                    },
                                ],
                            },
                        ])];
                case 2:
                    courses = _c.sent();
                    res
                        .json({
                        courses: courses,
                        status: 200,
                        count: count === null || count === void 0 ? void 0 : count.length,
                    })
                        .status(http_status_1.default.OK);
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _c.sent();
                    next(error_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return CourseApi;
}());
exports.default = CourseApi;
