import { Document, Schema, model } from "mongoose";
export interface ICourse extends Document {
  _id: string;
  teacher: string[];
  users: any;
  name: string;
  chapter: string[];
  start: Date;
  end: Date;
  description: {
    mota?: string;
    yeucau?: string;
    ketqua?: string;
    doituong?: string;
  };
  price: Number;
  status: string;
  image: String;
  lessions: string[];
}

const courseSchema = new Schema(
  {
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
  },
  { timestamps: true }
);
const Course = model<ICourse>("Course", courseSchema);
export default Course;
