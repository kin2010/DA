import { Document, Schema, model } from "mongoose";
export interface IOrder extends Document {
  _id: string;
  user: string;
  courses: string[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
  paidTime: string;
  isPaid: boolean;
}

const orderSchena = new Schema(
  {
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
  },
  { timestamps: true }
);
const Order = model<IOrder>("Order", orderSchena);
export default Order;
