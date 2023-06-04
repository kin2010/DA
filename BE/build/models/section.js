"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var sectionSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
}, { timestamps: true });
var Section = (0, mongoose_1.model)("Section", sectionSchema);
exports.default = Section;
