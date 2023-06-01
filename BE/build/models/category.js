"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
}, { timestamps: true });
var Category = (0, mongoose_1.model)("Category", categorySchema);
exports.default = Category;
