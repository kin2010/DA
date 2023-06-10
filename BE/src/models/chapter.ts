import { Document, Schema, model } from "mongoose";
export interface Ichapter extends Document {
  _id: string;
  name: string;
  lessions: string[];
  baitaps: string[];
  mota: string;
  course: string;
}

const roleSchema = new Schema(
  {
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
  },
  { timestamps: true }
);
const Chapter = model<Ichapter>("Chapter", roleSchema);
export default Chapter;
