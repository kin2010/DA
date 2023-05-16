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
var chapter_1 = __importDefault(require("../models/chapter"));
var APIError_1 = __importDefault(require("../utils/APIError"));
var LessionApi = /** @class */ (function () {
    function LessionApi() {
    }
    var _a;
    _a = LessionApi;
    LessionApi.create = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var chapter, ch, coures, error_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    chapter = req.body.chapter;
                    return [4 /*yield*/, chapter_1.default.findById(chapter)];
                case 1:
                    ch = _b.sent();
                    if (!ch) {
                        throw new APIError_1.default({
                            message: "Id Chapter is required",
                            status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        });
                    }
                    return [4 /*yield*/, models_1.Lession.create(__assign({}, req.body))];
                case 2: return [4 /*yield*/, (_b.sent()).populate([
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
                    ])];
                case 3:
                    coures = _b.sent();
                    return [4 /*yield*/, ch.updateOne({ $set: { lessions: __spreadArray(__spreadArray([], ch.lessions, true), [coures === null || coures === void 0 ? void 0 : coures._id], false) } })];
                case 4:
                    _b.sent();
                    res
                        .json({
                        lession: coures,
                        message: "Create successfully ",
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
    LessionApi.getById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var coures, error_2;
        var _b;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, models_1.Lession.findById(req.params.id)];
                case 1: return [4 /*yield*/, ((_b = (_c.sent())) === null || _b === void 0 ? void 0 : _b.populate([
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
                    ]))];
                case 2:
                    coures = _c.sent();
                    res
                        .json({
                        lession: coures,
                        status: 200,
                    })
                        .status(http_status_1.default.OK);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _c.sent();
                    next();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    LessionApi.update = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, id, other, out, coures, error_3;
        var _c;
        return __generator(_a, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 4, , 5]);
                    _b = req.body, id = _b.id, other = __rest(_b, ["id"]);
                    return [4 /*yield*/, models_1.Lession.findById(id)];
                case 1:
                    out = _d.sent();
                    if (!out) {
                        throw new APIError_1.default({
                            message: "Not found",
                            status: http_status_1.default.NOT_FOUND,
                        });
                    }
                    return [4 /*yield*/, models_1.Lession.findByIdAndUpdate(id, __assign({}, other), {
                            new: true,
                        })];
                case 2: return [4 /*yield*/, ((_c = (_d.sent())) === null || _c === void 0 ? void 0 : _c.populate([
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
                    ]))];
                case 3:
                    coures = _d.sent();
                    res
                        .json({
                        lession: coures,
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
    LessionApi.updateChapter = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, idChapter, other, out, chapter, error_4;
        var _c;
        return __generator(_a, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 4, , 5]);
                    _b = req.body, idChapter = _b.idChapter, other = __rest(_b, ["idChapter"]);
                    return [4 /*yield*/, chapter_1.default.findById(idChapter)];
                case 1:
                    out = _d.sent();
                    if (!out) {
                        throw new APIError_1.default({
                            message: "Not found",
                            status: http_status_1.default.NOT_FOUND,
                        });
                    }
                    return [4 /*yield*/, chapter_1.default.findByIdAndUpdate(idChapter, __assign({}, other), {
                            new: true,
                        })];
                case 2: return [4 /*yield*/, ((_c = (_d.sent())) === null || _c === void 0 ? void 0 : _c.populate([
                        {
                            path: "lessions",
                            select: "teacher mota",
                        },
                    ]))];
                case 3:
                    chapter = _d.sent();
                    res
                        .json({
                        chapter: chapter,
                        status: 200,
                    })
                        .status(http_status_1.default.OK);
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _d.sent();
                    next();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    LessionApi.addChapter = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var idCourse, cc, data, chapter, error_5;
        var _b;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, , 6]);
                    idCourse = (req === null || req === void 0 ? void 0 : req.body).idCourse;
                    return [4 /*yield*/, models_1.Course.findById(idCourse)];
                case 1:
                    cc = _c.sent();
                    if (!cc) {
                        throw new APIError_1.default({
                            message: "Id Course is required",
                            status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        });
                    }
                    data = __assign(__assign({}, req.body), { course: idCourse });
                    return [4 /*yield*/, chapter_1.default.create(__assign({}, data))];
                case 2: return [4 /*yield*/, ((_b = (_c.sent())) === null || _b === void 0 ? void 0 : _b.populate([
                        {
                            path: "lessions",
                            select: "teacher mota",
                        },
                    ]))];
                case 3:
                    chapter = _c.sent();
                    return [4 /*yield*/, cc.update({
                            chapter: __spreadArray(__spreadArray([], cc.chapter, true), [chapter === null || chapter === void 0 ? void 0 : chapter._id], false),
                        })];
                case 4:
                    _c.sent();
                    res
                        .json({
                        chapter: chapter,
                        status: 200,
                    })
                        .status(http_status_1.default.OK);
                    return [3 /*break*/, 6];
                case 5:
                    error_5 = _c.sent();
                    next(error_5);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    LessionApi.getChapters = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var idCourse, cc, chapter, error_6;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    idCourse = (req === null || req === void 0 ? void 0 : req.body).idCourse;
                    console.log(2, idCourse);
                    return [4 /*yield*/, models_1.Course.findById(idCourse)];
                case 1:
                    cc = _b.sent();
                    if (!cc) {
                        throw new APIError_1.default({
                            message: "Id Course is required",
                            status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        });
                    }
                    return [4 /*yield*/, chapter_1.default.find({ course: idCourse }).populate([
                            {
                                path: "lessions",
                                select: "name mota teacher users ralseHand plusMark",
                                populate: [
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
                                ],
                            },
                        ])];
                case 2:
                    chapter = _b.sent();
                    res
                        .json({
                        chapters: chapter,
                        status: 200,
                    })
                        .status(http_status_1.default.OK);
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _b.sent();
                    next(error_6);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    LessionApi.getCha = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, chapter, error_7;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id = (req === null || req === void 0 ? void 0 : req.body).id;
                    return [4 /*yield*/, chapter_1.default.findById(id)];
                case 1:
                    chapter = _b.sent();
                    if (!chapter) {
                        throw new APIError_1.default({
                            message: "NOT FOUND !",
                            status: http_status_1.default.NOT_FOUND,
                        });
                    }
                    return [2 /*return*/, chapter.populate([
                            {
                                path: "lessions",
                                select: "teacher mota",
                            },
                        ])];
                case 2:
                    error_7 = _b.sent();
                    next(error_7);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return LessionApi;
}());
exports.default = LessionApi;
