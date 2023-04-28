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
}, { timestamps: true });
var Role = (0, mongoose_1.model)("Role", roleSchema);
exports.default = Role;
