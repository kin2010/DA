import * as Yup from "yup";

export const courseCreateSchema = Yup.object({
  name: Yup.string().min(3).required(),
  target: Yup.string().required(),
  requirement: Yup.string().required(),
});
