"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var meetingSchema = new mongoose_1.Schema({
    teacher: {
        type: "ObjectId",
        ref: "User",
    },
    users: [
        {
            type: "ObjectId",
            ref: "User",
        },
    ],
    url: {
        type: String,
    },
    start: {
        type: String,
    },
    end: {
        type: String,
    },
    desc: {
        type: String,
    },
    time: {
        type: Number,
        default: 10,
    },
    video: {
        type: String,
    },
    name: {
        type: String,
    },
    ralseHand: [
        {
            user: {
                type: "ObjectId",
                ref: "User",
            },
            time: {
                type: String,
            },
        },
    ],
    plusMark: [
        {
            user: {
                type: "ObjectId",
                ref: "User",
            },
            mark: {
                type: Number,
            },
        },
    ],
    chat: [
        {
            user: {
                type: "ObjectId",
                ref: "User",
            },
            time: { type: Date },
            msg: { type: String },
        },
    ],
    status: {
        type: String,
        enum: ["end", "incomming", "starting"],
    },
}, { timestamps: true });
var Meeting = (0, mongoose_1.model)("Meeting", meetingSchema);
exports.default = Meeting;
