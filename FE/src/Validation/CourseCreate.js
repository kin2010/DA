import * as Yup from "yup";

export const courseCreateSchema = Yup.object({
  name: Yup.string().min(3).required(),
  target: Yup.string().required(),
  requirement: Yup.string().required(),
  description: Yup.string().required(),
});

export const createLectureSchema = Yup.object({
  name: Yup.string().min(3).required(),
  youtube_url: Yup.string().matches(
    /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    "Must is youtube link"
  ),
});
export const createAssignmentSchema = Yup.object({
  name: Yup.string().min(3).required(),
});
export const createGroupSchema = Yup.object({
  name: Yup.string().min(3).required(),
  description: Yup.string().required(),
});
