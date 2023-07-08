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
var models_1 = require("../models");
var APIError_1 = __importDefault(require("../utils/APIError"));
var date_fns_1 = require("date-fns");
var OrderApi = /** @class */ (function () {
    function OrderApi() {
    }
    var _a;
    _a = OrderApi;
    OrderApi.add = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var group, error_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, models_1.Order.create(__assign({}, req.body))];
                case 1: return [4 /*yield*/, (_b.sent()).populate([
                        {
                            path: "courses",
                            select: "",
                        },
                    ])];
                case 2:
                    group = _b.sent();
                    res
                        .json({
                        data: group,
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
    OrderApi.update = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, id, other, out, chapter, error_2;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    _b = req.body, id = _b.id, other = __rest(_b, ["id"]);
                    return [4 /*yield*/, models_1.Order.findById(id)];
                case 1:
                    out = _c.sent();
                    if (!out) {
                        throw new APIError_1.default({
                            message: "Not found",
                            status: http_status_1.default.NOT_FOUND,
                        });
                    }
                    return [4 /*yield*/, models_1.Order.findByIdAndUpdate(id, __assign({}, other), {
                            new: true,
                        })];
                case 2: return [4 /*yield*/, _c.sent()];
                case 3:
                    chapter = _c.sent();
                    res
                        .json({
                        data: chapter,
                        status: 200,
                    })
                        .status(http_status_1.default.OK);
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _c.sent();
                    next(error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    OrderApi.getById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, group, groupRes, error_3;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    id = (req === null || req === void 0 ? void 0 : req.params).id;
                    return [4 /*yield*/, models_1.Order.findById(id)];
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
                                path: "courses",
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
                                path: "user",
                                select: "",
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
    OrderApi.getAllOrder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, limit, skip, count, groups, error_4;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    _b = req.query, limit = _b.limit, skip = _b.skip;
                    return [4 /*yield*/, models_1.Order.find({})];
                case 1:
                    count = _c.sent();
                    return [4 /*yield*/, models_1.Order.find({})
                            .limit(parseInt(limit))
                            .skip(parseInt(skip))
                            .sort({ createdAt: -1 })
                            .populate([
                            {
                                path: "courses",
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
                                    {
                                        path: "category",
                                        select: "",
                                    },
                                    {
                                        path: "comments",
                                        select: "",
                                    },
                                ],
                            },
                            {
                                path: "user",
                                select: "",
                            },
                        ])];
                case 2:
                    groups = _c.sent();
                    res
                        .json({
                        data: groups,
                        status: 200,
                        count: count,
                    })
                        .status(http_status_1.default.OK)
                        .end();
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _c.sent();
                    next(error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    OrderApi.revenue = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, limit, skip, start, end, type, starttime1, endtime1, starttime2, endtime2, response, dt, count, error_5;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 6, , 7]);
                    _b = req.query, limit = _b.limit, skip = _b.skip, start = _b.start, end = _b.end, type = _b.type;
                    console.log(req.query);
                    starttime1 = null;
                    endtime1 = null;
                    starttime2 = null;
                    endtime2 = null;
                    if (type === "month") {
                        starttime1 = (0, date_fns_1.startOfMonth)(new Date(start));
                        endtime1 = (0, date_fns_1.endOfMonth)(new Date(start));
                        starttime2 = (0, date_fns_1.startOfMonth)(new Date(end));
                        endtime2 = (0, date_fns_1.endOfMonth)(new Date(end));
                    }
                    if (type === "year") {
                        starttime1 = (0, date_fns_1.startOfYear)(new Date(start));
                        endtime1 = (0, date_fns_1.endOfYear)(new Date(start));
                        starttime2 = (0, date_fns_1.startOfYear)(new Date(end));
                        endtime2 = (0, date_fns_1.endOfYear)(new Date(end));
                    }
                    if (type === "week") {
                        starttime1 = (0, date_fns_1.startOfWeek)(new Date(start));
                        endtime1 = (0, date_fns_1.endOfWeek)(new Date(start));
                        starttime2 = (0, date_fns_1.startOfWeek)(new Date(end));
                        endtime2 = (0, date_fns_1.endOfWeek)(new Date(end));
                    }
                    response = "";
                    console.log(starttime1, endtime1);
                    dt = "";
                    return [4 /*yield*/, models_1.User.aggregate([
                            {
                                $match: {
                                    createdAt: {
                                        $gte: starttime1,
                                        $lt: endtime1,
                                    },
                                },
                            },
                        ])];
                case 1:
                    count = _c.sent();
                    if (!(type === "year")) return [3 /*break*/, 3];
                    return [4 /*yield*/, models_1.Order.aggregate([
                            {
                                $match: {
                                    createdAt: {
                                        $gte: starttime1,
                                        $lt: endtime1,
                                    },
                                },
                            },
                            {
                                $group: {
                                    _id: { $month: "$createdAt" },
                                    total_price: { $sum: "$total" },
                                },
                            },
                            {
                                $group: {
                                    _id: null,
                                    data: {
                                        $push: {
                                            time: "$_id",
                                            total_price: "$total_price",
                                        },
                                    },
                                },
                            },
                            // {
                            //   $project: {
                            //     _id: 0,
                            //     month: {
                            //       $range: [1, 13],
                            //     },
                            //     total_price: {
                            //       $map: {
                            //         input: { $range: [1, 13] },
                            //         as: "m",
                            //         in: {
                            //           $cond: [
                            //             { $in: ["$$m", "$data.month"] },
                            //             {
                            //               $arrayElemAt: [
                            //                 {
                            //                   $filter: {
                            //                     input: "$data",
                            //                     cond: { $eq: ["$$this.month", "$$m"] },
                            //                   },
                            //                 },
                            //                 0,
                            //               ],
                            //             },
                            //             { month: "$$m", total_price: 0 },
                            //           ],
                            //         },
                            //       },
                            //     },
                            //   },
                            // },
                            // {
                            //   $unwind: "$total_price",
                            // },
                            // {
                            //   $replaceRoot: {
                            //     newRoot: {
                            //       $mergeObjects: ["$total_price", { month: "$total_price.month" }],
                            //     },
                            //   },
                            // },
                            {
                                $sort: {
                                    "data.time": -1,
                                },
                            },
                        ])];
                case 2:
                    dt = _c.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, models_1.Order.aggregate([
                        {
                            $match: {
                                createdAt: {
                                    $gte: starttime1,
                                    $lt: endtime1,
                                },
                            },
                        },
                        {
                            $group: {
                                _id: { $dayOfMonth: "$createdAt" },
                                total_price: { $sum: "$total" },
                            },
                        },
                        {
                            $group: {
                                _id: null,
                                data: {
                                    $push: {
                                        time: "$_id",
                                        total_price: "$total_price",
                                    },
                                },
                            },
                        },
                        {
                            $sort: {
                                time: 1,
                            },
                        },
                    ])];
                case 4:
                    dt = _c.sent();
                    _c.label = 5;
                case 5:
                    res
                        .json({
                        data: __assign(__assign({}, dt[0]), { count: (count === null || count === void 0 ? void 0 : count.length) || 0 }),
                        status: 200,
                    })
                        .status(http_status_1.default.OK)
                        .end();
                    return [3 /*break*/, 7];
                case 6:
                    error_5 = _c.sent();
                    next(error_5);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return OrderApi;
}());
exports.default = OrderApi;
