import { Document, model, Schema } from "mongoose";

export interface IComment extends Document {
  course: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  user: string;
}
const CommentSchema = new Schema(
  {
    course: { require: true, type: "ObjectId", ref: "Course" },
    rating: { type: Number, require: true },
    user: { require: true, type: "ObjectId", ref: "User" },
    comment: { type: String },
  },
  { timestamps: true }
);
const Comment = model<IComment>("Comment", CommentSchema);
export default Comment;
