"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var groupSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    course: {
        type: "ObjectId",
        ref: "Course",
    },
    meetings: [
        {
            type: "ObjectId",
            ref: "Meeting",
        },
    ],
    chats: [
        {
            user: {
                type: "ObjectId",
                ref: "User",
            },
            time: {
                type: String,
            },
            msg: {
                type: String,
            },
        },
    ],
}, { timestamps: true });
var Group = (0, mongoose_1.model)("Group", groupSchema);
exports.default = Group;
