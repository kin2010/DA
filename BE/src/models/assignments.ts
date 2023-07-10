import { Document, Schema, model } from "mongoose";
export interface IAssignment extends Document {
  _id: string;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  mark: number;
  attachments: string[];
  section: string;
  course: string;
  comments: string;
}

export const AssignmentSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    start_time: {
      type: String,
    },
    end_time: {
      type: String,
    },
    mark: {
      type: Number,
    },
    attachments: [
      {
        type: String,
      },
    ],
    section: {
      type: String,
    },
    course: {
      type: "ObjectId",
      ref: "Course",
    },
    comments: [
      {
        user: {
          type: "ObjectId",
          ref: "User",
        },
        comment: {
          type: String,
        },
        time: { type: String },
      },
    ],
  },
  { timestamps: true }
);
const Assignment = model<IAssignment>("Assignment", AssignmentSchema);
export default Assignment;
