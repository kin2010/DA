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
var APIError_1 = __importDefault(require("../utils/APIError"));
var models_1 = require("../models");
var AssignmentService = /** @class */ (function () {
    function AssignmentService() {
    }
    var _a;
    _a = AssignmentService;
    AssignmentService.create = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var section, ch, assignment, error_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    section = req.body.section;
                    console.log(section, 3);
                    return [4 /*yield*/, models_1.Section.findById(section)];
                case 1:
                    ch = _b.sent();
                    if (!ch) {
                        throw new APIError_1.default({
                            message: "Section Id is required",
                            status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        });
                    }
                    return [4 /*yield*/, models_1.Assignment.create(__assign({}, req.body))];
                case 2:
                    assignment = _b.sent();
                    //   .populate([
                    //     {
                    //       path: "teacher",
                    //       select: "fullName",
                    //     },
                    //     {
                    //       path: "users",
                    //       select: "avatar email fullName address phone online",
                    //     },
                    //     {
                    //       path: "ralseHand",
                    //       select: "time user",
                    //       populate: {
                    //         path: "user",
                    //         select: "avatar email fullName address phone online",
                    //       },
                    //     },
                    //     {
                    //       path: "plusMark",
                    //       select: "time user",
                    //       populate: {
                    //         path: "user",
                    //         select: "avatar email fullName address phone online",
                    //       },
                    //     },
                    //   ]);
                    return [4 /*yield*/, ch.updateOne({
                            $set: { assignments: __spreadArray(__spreadArray([], ch.assignments, true), [assignment === null || assignment === void 0 ? void 0 : assignment._id], false) },
                        })];
                case 3:
                    //   .populate([
                    //     {
                    //       path: "teacher",
                    //       select: "fullName",
                    //     },
                    //     {
                    //       path: "users",
                    //       select: "avatar email fullName address phone online",
                    //     },
                    //     {
                    //       path: "ralseHand",
                    //       select: "time user",
                    //       populate: {
                    //         path: "user",
                    //         select: "avatar email fullName address phone online",
                    //       },
                    //     },
                    //     {
                    //       path: "plusMark",
                    //       select: "time user",
                    //       populate: {
                    //         path: "user",
                    //         select: "avatar email fullName address phone online",
                    //       },
                    //     },
                    //   ]);
                    _b.sent();
                    res
                        .json({
                        data: assignment,
                        status: 200,
                    })
                        .status(http_status_1.default.OK);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    next(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    AssignmentService.getById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var assignment, sectionId, section, courseData, error_2;
        var _b;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, ((_b = models_1.Assignment.findById(req.params.id)) === null || _b === void 0 ? void 0 : _b.populate([
                            {
                                path: "",
                                select: "",
                                // populate:[
                                //   path:'user',
                                //   select:""
                                // ]
                            },
                        ]))];
                case 1:
                    assignment = _c.sent();
                    sectionId = assignment === null || assignment === void 0 ? void 0 : assignment.section;
                    return [4 /*yield*/, models_1.Section.findById(sectionId)];
                case 2:
                    section = _c.sent();
                    courseData = void 0;
                    if (!(section === null || section === void 0 ? void 0 : section.course)) return [3 /*break*/, 4];
                    return [4 /*yield*/, models_1.Course.findById(section.course)];
                case 3:
                    courseData = _c.sent();
                    _c.label = 4;
                case 4:
                    if (assignment) {
                        assignment.course = courseData;
                    }
                    res
                        .json({
                        data: assignment,
                        status: 200,
                    })
                        .status(http_status_1.default.OK);
                    return [3 /*break*/, 6];
                case 5:
                    error_2 = _c.sent();
                    next(error_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    AssignmentService.update = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, id, other, out, coures, error_3;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    _b = req.body, id = _b.id, other = __rest(_b, ["id"]);
                    console.log(req.body, 141414);
                    return [4 /*yield*/, models_1.Assignment.findById(id)];
                case 1:
                    out = _c.sent();
                    if (!out) {
                        throw new APIError_1.default({
                            message: "Not found",
                            status: http_status_1.default.NOT_FOUND,
                        });
                    }
                    return [4 /*yield*/, models_1.Assignment.findByIdAndUpdate(id, __assign({}, other), {
                            new: true,
                        })];
                case 2:
                    coures = _c.sent();
                    //   ?.populate([
                    //     {
                    //       path: "teacher",
                    //       select: "fullName",
                    //     },
                    //     {
                    //       path: "users",
                    //       select: "avatar email fullName address phone online",
                    //     },
                    //     {
                    //       path: "ralseHand",
                    //       select: "time user",
                    //       populate: {
                    //         path: "user",
                    //         select: "avatar email fullName address phone online",
                    //       },
                    //     },
                    //     {
                    //       path: "plusMark",
                    //       select: "time user",
                    //       populate: {
                    //         path: "user",
                    //         select: "avatar email fullName address phone online",
                    //       },
                    //     },
                    //   ]);
                    res
                        .json({
                        data: coures,
                        status: 200,
                    })
                        .status(http_status_1.default.OK);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _c.sent();
                    next(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return AssignmentService;
}());
exports.default = AssignmentService;
