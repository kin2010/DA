"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var roleSchema = new mongoose_1.Schema({
    roleName: {
        type: String,
    },
    role: {
        type: Number,
    },
    outdate: {
        type: String,
    },
    status: {
        type: String,
    },
    link: {
        type: String,
    },
}, { timestamps: true });
var Baitap = (0, mongoose_1.model)("Baitap", roleSchema);
exports.default = Baitap;
