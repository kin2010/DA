/* eslint-disable no-lone-blocks */
import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { Formik } from "formik";
import FormControl from "../../component/FormControl";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { changePass, getUserData } from "../../hook/LessionHook";
import {
  createCategorySchema,
  updatePasswordSchema,
} from "../../Validation/CourseCreate";
import { openNotification } from "../../Notification";

const ChangePassword = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery(["user"], getUserData);

  useEffect(() => {
    if (data?.user) {
      // setSrc(data?.user?.avatar || "../images/user.jpg");
    }
  }, [data]);

  const handleFormSubmit = async (value) => {
    const params = {
      currentPassword: value?.password,
      newPassword: value?.new_password,
      id: data?.user?._id,
    };
    console.log(params);
    const res = await changePass(params);
    console.log(res);
    if (!res?.message) {
      openNotification({
        message: "Đã cập nhật",
        type: "success",
      });
    } else {
      openNotification({
        message: res?.message,
        type: "error",
      });
    }
    console.log(res, 14141);
    queryClient.invalidateQueries(["user"]);
  };

  return (
    <div className="px-4">
      <h3 className="text-primary">Thay đổi mật khẩu</h3>
      <Formik
        initialValues={{
          password: "",
          new_password: "",
          confirm_password: "",
        }}
        onSubmit={(value) => handleFormSubmit(value)}
        validationSchema={updatePasswordSchema}
      >
        {(props) => (
          <>
            <form onSubmit={props.handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <FormControl
                    label="Mật khẩu hiện tại *"
                    inputType={"password"}
                    name="password"
                  ></FormControl>
                  <FormControl
                    label="Mật khẩu mới *"
                    name="new_password"
                    inputType={"password"}
                  ></FormControl>
                  <FormControl
                    inputType={"password"}
                    label="Nhập lại mật khẩu *"
                    name="confirm_password"
                  ></FormControl>
                </div>
              </div>

              <Button className="mt-3" type="submit" variant="contained">
                Cập nhật{" "}
              </Button>
            </form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
