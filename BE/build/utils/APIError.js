"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line max-classes-per-file
var http_status_1 = __importDefault(require("http-status"));
var ExtendableError = /** @class */ (function (_super) {
    __extends(ExtendableError, _super);
    function ExtendableError(e) {
        var _this = _super.call(this, e.message) || this;
        _this.name = _this.constructor.name;
        _this.message = e.message;
        _this.code = e.code;
        _this.errors = e.errors;
        _this.status = e.status;
        _this.stack = e.stack;
        return _this;
    }
    return ExtendableError;
}(Error));
var APIError = /** @class */ (function (_super) {
    __extends(APIError, _super);
    function APIError(_a) {
        var message = _a.message, _b = _a.status, status = _b === void 0 ? http_status_1.default.INTERNAL_SERVER_ERROR : _b;
        return _super.call(this, {
            message: message,
            status: status,
        }) || this;
    }
    return APIError;
}(ExtendableError));
exports.default = APIError;
