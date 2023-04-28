"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_1 = __importDefault(require("http-status"));
var responseError = function (res, error) {
    res.status(error.status).json(error);
};
var handler = function (err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) {
    var error = {
        message: err.message,
        status: err.status || http_status_1.default.INTERNAL_SERVER_ERROR,
    };
    if (err.details) {
        error = {
            message: 'Validation error!',
            status: err.status || http_status_1.default.BAD_REQUEST,
            errors: err.details.body || err.details.query || err.details.params,
        };
    }
    return responseError(res, error);
};
var routeNotFound = function (req, res) {
    var error = {
        message: 'API not found!',
        status: http_status_1.default.NOT_FOUND,
    };
    return responseError(res, error);
};
exports.default = {
    routeNotFound: routeNotFound,
    handler: handler,
};
