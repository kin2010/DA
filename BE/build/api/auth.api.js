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
var jwt_1 = __importDefault(require("../utils/jwt"));
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    var _a;
    _a = AuthService;
    AuthService.login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, email, password, user, isMatchPassword, token, error_1;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _b = req.body, email = _b.email, password = _b.password;
                    return [4 /*yield*/, models_1.User.findOne({ email: email })];
                case 1:
                    user = _c.sent();
                    if (!user) {
                        throw new APIError_1.default({
                            message: "User not found",
                            status: http_status_1.default.NOT_FOUND,
                        });
                    }
                    isMatchPassword = password === (user === null || user === void 0 ? void 0 : user.password);
                    if (!isMatchPassword) {
                        throw new APIError_1.default({
                            message: "Invalid Password",
                            status: http_status_1.default.BAD_REQUEST,
                        });
                    }
                    token = jwt_1.default.sign({ _id: user._id });
                    res
                        .json({
                        status: 200,
                        message: "Login successfully",
                        user: user,
                        token: token,
                    })
                        .status(http_status_1.default.CREATED)
                        .end();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _c.sent();
                    next(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    AuthService.register = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, email, password, role, fullName, user, r, newUser, res1, token, error_2;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    _b = req.body, email = _b.email, password = _b.password, role = _b.role, fullName = _b.fullName;
                    return [4 /*yield*/, models_1.User.findOne({ email: email })];
                case 1:
                    user = _c.sent();
                    if (user) {
                        throw new APIError_1.default({
                            message: "Email already exists",
                            status: http_status_1.default.BAD_REQUEST,
                        });
                    }
                    return [4 /*yield*/, models_1.Role.findOne({ _id: role })];
                case 2:
                    r = _c.sent();
                    if (!r) {
                        throw new APIError_1.default({
                            message: "Internal server error",
                            status: http_status_1.default.INTERNAL_SERVER_ERROR,
                        });
                    }
                    newUser = {
                        email: email,
                        password: password,
                        fullName: fullName,
                        role: r._id,
                    };
                    return [4 /*yield*/, models_1.User.create(newUser)];
                case 3:
                    res1 = _c.sent();
                    token = jwt_1.default.sign({ _id: res1._id });
                    res.json({ data: res1, token: token }).status(http_status_1.default.CREATED).end();
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _c.sent();
                    next(error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    AuthService.getUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var token, tokenPayload, user, error_3;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    token = req.body.token;
                    if (!token) {
                        throw new APIError_1.default({
                            status: http_status_1.default.UNAUTHORIZED,
                            message: "Unauthorizedccc",
                        });
                    }
                    tokenPayload = jwt_1.default.verify(token);
                    if (!tokenPayload) {
                        throw new APIError_1.default({
                            status: http_status_1.default.UNAUTHORIZED,
                            message: "Unauthorized",
                        });
                    }
                    return [4 /*yield*/, models_1.User.findOne({
                            _id: tokenPayload._id,
                        }).populate([{ path: "role", select: "roleName" }])];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        throw new APIError_1.default({
                            status: http_status_1.default.NOT_FOUND,
                            message: "User not found",
                        });
                    }
                    res.json({ user: user.show() }).status(http_status_1.default.OK).end();
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _b.sent();
                    next(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    AuthService.update = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var id, user, error_4;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    return [4 /*yield*/, models_1.User.findByIdAndUpdate(id, __assign({}, req.body), { new: true })];
                case 1:
                    user = _b.sent();
                    res.json({ user: user }).status(http_status_1.default.OK).end();
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _b.sent();
                    next(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    AuthService.changePassword = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, currentPassword, newPassword, id, user, Update, error_5;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    _b = req.body, currentPassword = _b.currentPassword, newPassword = _b.newPassword;
                    id = req.params.id;
                    return [4 /*yield*/, models_1.User.findById(id)];
                case 1:
                    user = _c.sent();
                    console.log(user === null || user === void 0 ? void 0 : user.password, currentPassword);
                    if ((user === null || user === void 0 ? void 0 : user.password) !== currentPassword) {
                        throw new APIError_1.default({
                            message: "Mật khẩu hiện tại không đúng",
                            status: 500,
                        });
                    }
                    return [4 /*yield*/, user.update({
                            password: newPassword,
                        }, { new: true })];
                case 2:
                    Update = _c.sent();
                    res.json({ user: Update }).status(http_status_1.default.OK).end();
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _c.sent();
                    next(error_5);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    AuthService.getAll = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var users, error_6;
        var _b;
        return __generator(_a, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, ((_b = models_1.User.find({})) === null || _b === void 0 ? void 0 : _b.populate([
                            {
                                path: "role",
                                select: "",
                            },
                        ]))];
                case 1:
                    users = _c.sent();
                    res.json({ user: users }).status(http_status_1.default.OK).end();
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _c.sent();
                    next(error_6);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return AuthService;
}());
exports.default = AuthService;
