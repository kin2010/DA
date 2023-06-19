import { Document, ObjectId, Schema, model } from "mongoose";
export interface IMeeting extends Document {
  _id: string;
  url: string;
  teacher: string[];
  users: ObjectId[];
  start_time: string;
  end_time: string;
  chat: Object[];
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
  time: number;
  status: string;
  group: string;
  attendance: [
    {
      user: string;
      time: string;
      status: string;
    }
  ];
  createdby: string;
}
type STATUS = "end" | "incomming" | "starting";
const meetingSchema = new Schema(
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
    url: {
      type: String,
    },
    start_time: {
      type: String,
    },
    end_time: {
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
    video: {
      type: String,
    },
    name: {
      type: String,
    },
    createdby: {
      type: "ObjectId",
      ref: "User",
    },
    group: {
      type: "ObjectId",
      ref: "Group",
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
    chat: [
      {
        user: {
          type: "ObjectId",
          ref: "User",
        },
        time: { type: Date },
        msg: { type: String },
      },
    ],
    attendance: [
      {
        user: {
          type: "ObjectId",
          ref: "User",
        },
        time: { type: Date },
        status: { type: String },
      },
    ],
    status: {
      type: String,
      enum: ["end", "incomming", "starting"],
    },
  },
  { timestamps: true }
);
const Meeting = model<IMeeting>("Meeting", meetingSchema);
export default Meeting;
