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
  lectures: string[];
  category: string;
  owner: string;
  sections_info: Object[];
  video: string[];
  thumbnail: string[];
}

const courseSchema = new Schema(
  {
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
  },
  { timestamps: true }
);
const Course = model<ICourse>("Course", courseSchema);
export default Course;
