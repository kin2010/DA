/* eslint-disable no-unused-vars */
export const mapError = (res) => {
  const { status, message, ...other } = res;
  console.log(res);
  const data = {};
  data.message = message || "";
  if (status === 200) {
    data.severity = "success";
  } else data.severity = "error";
  return data;
};
