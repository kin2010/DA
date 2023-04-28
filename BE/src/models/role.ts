import { Document, Schema, model } from "mongoose";
export interface IRole extends Document {
  _id: string;
  roleName: string;
  role: number;
}

const roleSchema = new Schema(
  {
    roleName: {
      type: String,
    },
    role: {
      type: Number,
    },
  },
  { timestamps: true }
);
const Role = model<IRole>("Role", roleSchema);
export default Role;
