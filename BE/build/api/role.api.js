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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_1 = __importDefault(require("http-status"));
var APIError_1 = __importDefault(require("../utils/APIError"));
var models_1 = require("../models");
var RoleService = /** @class */ (function () {
    function RoleService() {
    }
    var _a;
    _a = RoleService;
    RoleService.addRole = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var r, error_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, models_1.Role.findOne({ roleName: req.body.roleName })];
                case 1:
                    r = _b.sent();
                    if (!!r) {
                        throw new APIError_1.default({
                            message: "Role is adready exist",
                            status: http_status_1.default.BAD_REQUEST,
                        });
                    }
                    return [4 /*yield*/, models_1.Role.create({
                            roleName: req.body.roleName,
                            role: parseInt(req.body.role),
                        })];
                case 2:
                    _b.sent();
                    res.json({ status: 200 }).end();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    next(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    RoleService.addCategory = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, name_1, group, r, cate, error_2;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    _b = req.body, name_1 = _b.name, group = _b.group;
                    return [4 /*yield*/, models_1.Category.findOne({ name: req.body.name })];
                case 1:
                    r = _c.sent();
                    if (!group) {
                        throw new APIError_1.default({
                            message: "Please choose a category group",
                            status: http_status_1.default.BAD_REQUEST,
                        });
                    }
                    if (!!r) {
                        throw new APIError_1.default({
                            message: "Category is adready exist",
                            status: http_status_1.default.BAD_REQUEST,
                        });
                    }
                    return [4 /*yield*/, models_1.Category.create({
                            name: name_1,
                            group: group,
                        })];
                case 2:
                    cate = _c.sent();
                    res.json({ data: cate, status: 200 }).end();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _c.sent();
                    next(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    RoleService.updateCategory = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, id, other, r, error_3;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _b = req.body, id = _b.id, other = __rest(_b, ["id"]);
                    return [4 /*yield*/, models_1.Category.findByIdAndUpdate(id, __assign({}, other), { new: true })];
                case 1:
                    r = _c.sent();
                    // if (!group) {
                    //   throw new APIError({
                    //     message: "Please choose a category group",
                    //     status: httpStatus.BAD_REQUEST,
                    //   });
                    // }
                    res.json({ data: r, status: 200 }).end();
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _c.sent();
                    next(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    RoleService.updateCategoryGroup = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, id, other, r, error_4;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _b = req.body, id = _b.id, other = __rest(_b, ["id"]);
                    return [4 /*yield*/, models_1.CategoryGroup.findByIdAndUpdate(id, __assign({}, other), { new: true })];
                case 1:
                    r = _c.sent();
                    // if (!group) {
                    //   throw new APIError({
                    //     message: "Please choose a category group",
                    //     status: httpStatus.BAD_REQUEST,
                    //   });
                    // }
                    res.json({ data: r, status: 200 }).end();
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _c.sent();
                    next(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    RoleService.addCategoryGroup = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var r, groups, error_5;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, models_1.CategoryGroup.findOne({ name: req.body.name })];
                case 1:
                    r = _b.sent();
                    if (!!r) {
                        throw new APIError_1.default({
                            message: "Category Group is adready exist",
                            status: http_status_1.default.BAD_REQUEST,
                        });
                    }
                    return [4 /*yield*/, models_1.CategoryGroup.create({
                            name: req.body.name,
                        })];
                case 2:
                    groups = _b.sent();
                    res.json({ data: groups, status: 200 }).end();
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _b.sent();
                    next(error_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    RoleService.getCategory = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var categorys, error_6;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, models_1.Category.aggregate([
                            {
                                $lookup: {
                                    from: "category_groups",
                                    localField: "group",
                                    foreignField: "_id",
                                    as: "group",
                                },
                            },
                            {
                                $unwind: "$group",
                            },
                            {
                                $group: {
                                    _id: "$group",
                                    categories: { $push: "$$ROOT" },
                                },
                            },
                        ])];
                case 1:
                    categorys = _b.sent();
                    res.json({ data: categorys, status: 200 }).end();
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _b.sent();
                    next(error_6);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    RoleService.getAllCategory = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var categorys, error_7;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, models_1.Category.find({}).populate([
                            {
                                path: "group",
                                select: "",
                            },
                        ])];
                case 1:
                    categorys = _b.sent();
                    res.json({ data: categorys, status: 200 }).end();
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _b.sent();
                    next(error_7);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    RoleService.getAllCategoryGroup = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var categorys, error_8;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, models_1.CategoryGroup.find({})];
                case 1:
                    categorys = _b.sent();
                    res.json({ data: categorys, status: 200 }).end();
                    return [3 /*break*/, 3];
                case 2:
                    error_8 = _b.sent();
                    next(error_8);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    RoleService.deleteDocument = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, type, id, rs, _c, error_9;
        return __generator(_a, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 19, , 20]);
                    _b = req.query, type = _b.type, id = _b.id;
                    console.log(req.query);
                    rs = void 0;
                    _c = type;
                    switch (_c) {
                        case "category": return [3 /*break*/, 1];
                        case "category-group": return [3 /*break*/, 3];
                        case "group": return [3 /*break*/, 5];
                        case "section": return [3 /*break*/, 7];
                        case "lecture": return [3 /*break*/, 9];
                        case "assignment": return [3 /*break*/, 11];
                        case "course": return [3 /*break*/, 13];
                        case "order": return [3 /*break*/, 15];
                    }
                    return [3 /*break*/, 17];
                case 1: return [4 /*yield*/, models_1.Category.deleteOne({ _id: id })];
                case 2:
                    rs = _d.sent();
                    return [3 /*break*/, 18];
                case 3: return [4 /*yield*/, models_1.CategoryGroup.deleteOne({ _id: id })];
                case 4:
                    rs = _d.sent();
                    return [3 /*break*/, 18];
                case 5: return [4 /*yield*/, models_1.Group.deleteOne({ _id: id })];
                case 6:
                    rs = _d.sent();
                    return [3 /*break*/, 18];
                case 7: return [4 /*yield*/, models_1.Section.deleteOne({ _id: id })];
                case 8:
                    rs = _d.sent();
                    return [3 /*break*/, 18];
                case 9: return [4 /*yield*/, models_1.Lecture.deleteOne({ _id: id })];
                case 10:
                    rs = _d.sent();
                    return [3 /*break*/, 18];
                case 11: return [4 /*yield*/, models_1.Assignment.deleteOne({ _id: id })];
                case 12:
                    rs = _d.sent();
                    return [3 /*break*/, 18];
                case 13: return [4 /*yield*/, models_1.Course.deleteOne({ _id: id })];
                case 14:
                    rs = _d.sent();
                    return [3 /*break*/, 18];
                case 15: return [4 /*yield*/, models_1.Order.deleteOne({ _id: id })];
                case 16:
                    rs = _d.sent();
                    return [3 /*break*/, 18];
                case 17: return [3 /*break*/, 18];
                case 18:
                    res.json({ data: rs, status: 200 }).end();
                    return [3 /*break*/, 20];
                case 19:
                    error_9 = _d.sent();
                    next(error_9);
                    return [3 /*break*/, 20];
                case 20: return [2 /*return*/];
            }
        });
    }); };
    return RoleService;
}());
exports.default = RoleService;
