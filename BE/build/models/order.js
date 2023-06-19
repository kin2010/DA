"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var orderSchena = new mongoose_1.Schema({
    user: {
        type: "ObjectId",
        ref: "User",
    },
    courses: [
        {
            type: "ObjectId",
            ref: "Course",
        },
    ],
    total: {
        type: Number,
    },
    paidTime: {
        type: String,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
var Order = (0, mongoose_1.model)("Order", orderSchena);
exports.default = Order;
