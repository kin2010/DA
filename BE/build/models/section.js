"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var sectionSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    course: {
        type: "ObjectId",
        ref: "Course",
    },
    mota: {
        type: String,
    },
    lessions: [
        {
            type: "ObjectId",
            ref: "Lecture",
        },
    ],
    baitaps: [
        {
            type: "ObjectId",
            ref: "Baitap",
        },
    ],
}, { timestamps: true });
var Section = (0, mongoose_1.model)("Section", sectionSchema);
exports.default = Section;
