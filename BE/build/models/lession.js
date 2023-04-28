"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var roleSchema = new mongoose_1.Schema({
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
    view: {
        type: Number,
        default: 1,
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
    baitap: [
        {
            type: "ObjectId",
            ref: "Baitap",
        },
    ],
}, { timestamps: true });
var Lession = (0, mongoose_1.model)("Lession", roleSchema);
exports.default = Lession;
