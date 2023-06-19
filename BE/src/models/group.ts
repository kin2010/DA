import { Document, Schema, model } from "mongoose";
export interface IGroup extends Document {
  _id: string;
  name: string;
  description: number;
  course: string;
  chats: {
    user: string;
    time: string;
    msg: string;
  }[];
  meetings: string[];
}

const groupSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    course: {
      type: "ObjectId",
      ref: "Course",
    },
    meetings: [
      {
        type: "ObjectId",
        ref: "Meeting",
      },
    ],
    chats: [
      {
        user: {
          type: "ObjectId",
          ref: "User",
        },
        time: {
          type: String,
        },
        msg: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);
const Group = model<IGroup>("Group", groupSchema);
export default Group;
