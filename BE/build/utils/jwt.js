"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var http_status_1 = __importDefault(require("http-status"));
var appConfig_1 = __importDefault(require("../configs/appConfig"));
var APIError_1 = __importDefault(require("./APIError"));
var JWT = /** @class */ (function () {
    function JWT() {
    }
    JWT.sign = function (payload) {
        return jsonwebtoken_1.default.sign(payload, appConfig_1.default.jwtPrivateKey);
    };
    JWT.get = function (req) {
        // const { authorization } = req.headers;
        // let token = "";
        // if (authorization) {
        //   const tokenArr = authorization.split("Bearer ");
        //   if (Array.isArray(tokenArr) && tokenArr.length === 2) {
        //     token = tokenArr[1];
        //   }
        // }
        return req;
    };
    JWT.verify = function (token) {
        try {
            return jsonwebtoken_1.default.verify(token, appConfig_1.default.jwtPrivateKey);
        }
        catch (e) {
            throw new APIError_1.default({
                status: http_status_1.default.UNAUTHORIZED,
                message: "Invalid token",
            });
        }
    };
    return JWT;
}());
exports.default = JWT;
