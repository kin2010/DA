"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var categoryGroupSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
}, { timestamps: true });
var CategoryGroup = (0, mongoose_1.model)("category_group", categoryGroupSchema);
exports.default = CategoryGroup;
