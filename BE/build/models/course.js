"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var courseSchema = new mongoose_1.Schema({
    teacher: [
        {
            type: "ObjectId",
            ref: "User",
        },
    ],
    users: [
        {
            type: "ObjectId",
            ref: "User",
        },
    ],
    chapter: [
        {
            type: "ObjectId",
            ref: "Chapter",
        },
    ],
    // chapter: [
    //   {
    //     name: { type: String },
    //     lessions: [
    //       {
    //         type: "ObjectId",
    //         ref: "Lession",
    //       },
    //     ],
    //     baitaps: [
    //       {
    //         type: "ObjectId",
    //         ref: "Baitap",
    //       },
    //     ],
    //   },
    // ],
    description: {
        mota: {
            type: String,
        },
        yeucau: {
            type: String,
        },
        ketqua: {
            type: String,
        },
        doituong: {
            type: String,
        },
    },
    price: {
        type: Number,
    },
    start: {
        type: String,
    },
    name: {
        type: String,
    },
    end: {
        type: String,
    },
    image: {
        type: String,
    },
    lessions: {
        type: "ObjectId",
        ref: "Lession",
    },
}, { timestamps: true });
var Course = (0, mongoose_1.model)("Course", courseSchema);
exports.default = Course;
