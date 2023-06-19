"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var courseSchema = new mongoose_1.Schema({
    owner: {
        type: "ObjectId",
        ref: "User",
    },
    teachers: [
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
    sections: [
        {
            type: "ObjectId",
            ref: "Section",
        },
    ],
    groups: [
        {
            type: "ObjectId",
            ref: "Group",
        },
    ],
    category: {
        type: "ObjectId",
        ref: "Category",
    },
    description: {
        type: String,
    },
    target: {
        type: String,
    },
    requirement: {
        type: String,
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
    sections_info: [
        {
            type: Object,
        },
    ],
    lessions: {
        type: "ObjectId",
        ref: "Lecture",
    },
    video: [
        {
            type: String,
        },
    ],
    thumbnail: [
        {
            type: String,
        },
    ],
    discount: {
        type: Number,
    },
    publish: {
        type: Boolean,
    },
    status: {
        type: String,
    },
    admin_comment: {
        type: String,
    },
}, { timestamps: true });
var Course = (0, mongoose_1.model)("Course", courseSchema);
exports.default = Course;
