"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CommentSchema = new mongoose_1.Schema({
    course: { require: true, type: "ObjectId", ref: "Course" },
    rating: { type: Number, require: true },
    user: { require: true, type: "ObjectId", ref: "User" },
    comment: { type: String },
}, { timestamps: true });
var Comment = (0, mongoose_1.model)("Comment", CommentSchema);
exports.default = Comment;
