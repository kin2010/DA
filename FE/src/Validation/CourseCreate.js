import * as Yup from "yup";

export const courseCreateSchema = Yup.object({
  name: Yup.string().min(3).required("Tên khóa học không được để trống"),
  target: Yup.string().required("Nhập mục tiêu khóa học"),
  requirement: Yup.string().required("Nhập yêu cầu khóa học"),
  description: Yup.string().required("Nhập mô tả"),
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
  name: Yup.string().min(3).required("Nhập tên group"),
  description: Yup.string().required("Nhập mô tả"),
});
export const createScheduleSchema = Yup.object({
  name: Yup.string().min(3).required(),
  description: Yup.string().required(),
  start_time: Yup.string().required(),
  end_time: Yup.string().required(),
});

export const createCategorySchema = Yup.object({
  name: Yup.string().min(3).required(),
  group: Yup.string().min(3).required(),
});

export const updatePasswordSchema = Yup.object({
  new_password: Yup.string().min(3).required("Không được để trống"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("new_password"), null],
    "Phải giống password nhập ở trên"
  ),
});
