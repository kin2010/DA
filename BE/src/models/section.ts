import { Document, Schema, model } from "mongoose";
export interface ISection extends Document {
  _id: string;
  name: string;
}

const sectionSchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);
const Section = model<ISection>("Section", sectionSchema);
export default Section;
