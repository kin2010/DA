"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
var generateOTP = function () {
    return Math.floor(Math.random() * 100000);
};
exports.generateOTP = generateOTP;
