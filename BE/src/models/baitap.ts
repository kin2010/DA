import { Document, Schema, model } from "mongoose";
export interface IBaitap extends Document {
  _id: string;
  time: Date;
  outdate: Date;
  status: string;
  link: string;
}

const roleSchema = new Schema(
  {
    roleName: {
      type: String,
    },
    role: {
      type: Number,
    },
    outdate: {
      type: String,
    },
    status: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);
const Baitap = model<IBaitap>("Baitap", roleSchema);
export default Baitap;
