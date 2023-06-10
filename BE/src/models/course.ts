import { Document, Schema, model } from "mongoose";
export interface ICourse extends Document {
  _id: string;
  teachers: string[];
  users: any;
  name: string;
  sections: string[];
  start: Date;
  end: Date;
  description: string;
  target: string;
  requirement: string;
  price: Number;
  status: string;
  image: String;
  lessions: string[];
  category: string;
}

const courseSchema = new Schema(
  {
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
    lessions: {
      type: "ObjectId",
      ref: "Lecture",
    },
  },
  { timestamps: true }
);
const Course = model<ICourse>("Course", courseSchema);
export default Course;
