import { Document, Schema, model } from "mongoose";
export interface ISection extends Document {
  _id: string;
  name: string;
  lectures: string[];
  baitaps: string[];
  mota: string;
  course: string;
  assignments: string[];
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
    lectures: [
      {
        type: "ObjectId",
        ref: "Lecture",
      },
    ],
    assignments: [
      {
        type: "ObjectId",
        ref: "Assignment",
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
