"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentSchema = void 0;
var mongoose_1 = require("mongoose");
exports.AssignmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    start_time: {
        type: String,
    },
    end_time: {
        type: String,
    },
    mark: {
        type: Number,
    },
    attachments: [
        {
            type: String,
        },
    ],
    section: {
        type: String,
    },
    course: {
        type: "ObjectId",
        ref: "Course",
    },
    comments: [
        {
            user: {
                type: "ObjectId",
                ref: "User",
            },
            comment: {
                type: String,
            },
            time: { type: String },
        },
    ],
}, { timestamps: true });
var Assignment = (0, mongoose_1.model)("Assignment", exports.AssignmentSchema);
exports.default = Assignment;
