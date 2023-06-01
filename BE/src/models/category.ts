import { Document, Schema, model } from "mongoose";
export interface ICategory extends Document {
  _id: string;
  name: string;
}

const categorySchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);
const Category = model<ICategory>("Category", categorySchema);
export default Category;
