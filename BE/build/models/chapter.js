"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var roleSchema = new mongoose_1.Schema({
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
var Chapter = (0, mongoose_1.model)("Chapter", roleSchema);
exports.default = Chapter;
