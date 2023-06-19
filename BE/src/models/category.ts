import { Document, Schema, model } from "mongoose";
export interface ICategory extends Document {
  _id: string;
  name: string;
  group: string;
}

const categorySchema = new Schema(
  {
    name: {
      type: String,
    },
    group: {
      type: "ObjectId",
      ref: "category_group",
    },
  },
  { timestamps: true }
);
const Category = model<ICategory>("Category", categorySchema);
export default Category;
