import { Document, Schema, model } from "mongoose";
export interface ISection extends Document {
  _id: string;
  name: string;
  lessions: string[];
  baitaps: string[];
  mota: string;
  course: string;
}

const sectionSchema = new Schema(
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

const Section = model<ISection>("Section", sectionSchema);
export default Section;
