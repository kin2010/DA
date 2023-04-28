import { Document, Schema, model } from "mongoose";
export interface ILession extends Document {
  _id: string;
  teacher: string;
  users: string[];
  start: Date;
  end: Date;
  video: string;
  name: string;
  desc: string;
  ralseHand: [
    {
      time: Date;
      user: string;
    }
  ];
  plusMark: [
    {
      user: string;
      mark: number;
    }
  ];
  baitap: string[];
  time: number;
  view: number;
}

const roleSchema = new Schema(
  {
    teacher: {
      type: "ObjectId",
      ref: "User",
    },
    users: [
      {
        type: "ObjectId",
        ref: "User",
      },
    ],
    start: {
      type: String,
    },
    end: {
      type: String,
    },
    desc: {
      type: String,
    },
    time: {
      type: Number,
      default: 10,
    },
    view: {
      type: Number,
      default: 1,
    },
    video: {
      type: String,
    },
    name: {
      type: String,
    },
    ralseHand: [
      {
        user: {
          type: "ObjectId",
          ref: "User",
        },
        time: {
          type: String,
        },
      },
    ],
    plusMark: [
      {
        user: {
          type: "ObjectId",
          ref: "User",
        },
        mark: {
          type: Number,
        },
      },
    ],
    baitap: [
      {
        type: "ObjectId",
        ref: "Baitap",
      },
    ],
  },
  { timestamps: true }
);
const Lession = model<ILession>("Lession", roleSchema);
export default Lession;
