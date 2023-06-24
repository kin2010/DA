import { Document, Schema, model } from "mongoose";
export interface IUser extends Document {
  _id: string;
  email: string;
  gender: string;
  fullName: string;
  password: string;
  address: string;
  phone: string;
  avatar: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  online: boolean;
  schedule: Date;
  show: () => TUserShow;
  information: string;
}
export type TUserShow = Omit<IUser, "password">;
export const GENDER = {
  NOGENDER: 0,
  MALE: 0,
  FEMALE: 0,
};
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      min: 6,
    },
    role: {
      type: "ObjectId",
      ref: "Role",
      required: true,
    },
    gender: {
      type: String,
      enum: [GENDER.NOGENDER, GENDER.MALE, GENDER.FEMALE],
    },
    online: {
      type: Boolean,
    },
    schedule: {
      type: Date,
    },
    information: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.methods.show = function () {
  const user = this as IUser;
  return user;
};
const User = model<IUser>("User", UserSchema);
export default User;
