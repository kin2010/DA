"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userExit = exports.userStartMeeting = void 0;
var fetch_1 = require("../utils/fetch");
var userStartMeeting = function (socket, room, user) { return __awaiter(void 0, void 0, void 0, function () {
    var isRoomExist, newRoom, member, set, newuser, newmtg;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, (0, fetch_1.serviceFetch)({
                    url: "api/meeting",
                    method: "GET",
                    data: {
                        url: room,
                    },
                })];
            case 1:
                isRoomExist = _c.sent();
                if (!((isRoomExist === null || isRoomExist === void 0 ? void 0 : isRoomExist.status) !== 200)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, fetch_1.serviceFetch)({
                        url: "api/meeting",
                        method: "POST",
                        data: {
                            url: room,
                            users: [user],
                        },
                    })];
            case 2:
                newRoom = _c.sent();
                return [2 /*return*/, newRoom];
            case 3:
                member = (_a = isRoomExist === null || isRoomExist === void 0 ? void 0 : isRoomExist.meeting) === null || _a === void 0 ? void 0 : _a.users;
                set = new Set(member);
                set.add(user);
                console.log(333, set, user);
                newuser = Array.from(set);
                console.log(44, newuser, isRoomExist);
                return [4 /*yield*/, (0, fetch_1.serviceFetch)({
                        url: "api/meeting",
                        method: "PUT",
                        data: {
                            _id: (_b = isRoomExist === null || isRoomExist === void 0 ? void 0 : isRoomExist.meeting) === null || _b === void 0 ? void 0 : _b._id,
                            data: { users: newuser },
                        },
                    })];
            case 4:
                newmtg = _c.sent();
                return [2 /*return*/, newmtg];
        }
    });
}); };
exports.userStartMeeting = userStartMeeting;
var userExit = function (userId, room) { return __awaiter(void 0, void 0, void 0, function () {
    var newmtg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, fetch_1.serviceFetch)({
                    url: "api/meeting/online",
                    method: "POST",
                    data: {
                        userId: userId,
                        room: room,
                        type: "delete",
                    },
                })];
            case 1:
                newmtg = _a.sent();
                return [2 /*return*/, newmtg];
        }
    });
}); };
exports.userExit = userExit;
