import { Document, Schema, model } from "mongoose";
export interface ILecture extends Document {
  _id: string;
  teacher: string;
  users: string[];
  start: Date;
  end: Date;
  name: string;
  description: string;
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
  video: string[];
  attachments: string[];
  youtube_url: string;
  section: string;
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
    description: {
      type: String,
    },
    name: {
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
    video: [
      {
        type: String,
      },
    ],
    attachments: [
      {
        type: String,
      },
    ],
    youtube_url: {
      type: String,
    },
    section: {
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
const Lecture = model<ILecture>("Lecture", roleSchema);
export default Lecture;
