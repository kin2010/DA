import { Document, Schema, model } from "mongoose";
export interface ICategoryGroup extends Document {
  _id: string;
  name: string;
}

const categoryGroupSchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);
const CategoryGroup = model<ICategoryGroup>(
  "category_group",
  categoryGroupSchema
);
export default CategoryGroup;
