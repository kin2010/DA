/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Stack,
  TextareaAutosize,
  ButtonBase,
} from "@mui/material";
import { Link } from "react-router-dom";
import TextArea from "antd/lib/input/TextArea";
import { Formik } from "formik";
import FormControl from "../../component/FormControl";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData, updateUser, uploadFile } from "../../hook/LessionHook";
import { openNotification } from "../../Notification";

const ChangePassword = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    information: "",
  });
  const queryClient = useQueryClient();
  const { data } = useQuery(["user"], getUserData);
  const [src, setSrc] = useState("");
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const handleChange = (e, name) => {
    setForm({
      ...form,
      [e.target.name]: e?.target?.value,
    });
  };
  const handleSubmit = () => {
    //
  };

  useEffect(() => {
    if (data?.user) {
      setSrc(data?.user?.avatar || "../images/user.jpg");
    }
  }, [data]);

  const changeFile = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();

      reader.onload = function () {
        setSrc(reader.result);
      };
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "dzvpbt10");
      formData.append("api_key", "772276885786162");
      const res = await uploadFile(formData);
      console.log(res, 141);
      if (res?.data?.url) {
        setSrc(res.data.url);
        setImage(res.data.url);
      }
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (value) => {
    let params = { ...value, id: data?.user?._id };
    if (src !== data?.user?.avatar) {
      params = {
        ...params,
        avatar: image,
      };
    }
    const res = await updateUser(params);
    if (res?.user?._id) {
      openNotification({
        type: "success",
        message: "Đã cập nhật",
      });
    } else {
      openNotification({
        type: "error",
        message: "Có lỗi",
      });
    }
    queryClient.invalidateQueries(["user"]);
  };

  return (
    <div className="px-4">
      <h3 className="text-primary">Thay đổi mật khẩu</h3>
      <Formik
        initialValues={{
          fullName: data?.user?.fullName || "",
          email: data?.user?.email || "",
          phone: data?.user?.phone || "",
          information: data?.user?.information || "",
        }}
        onSubmit={(value) => handleFormSubmit(value)}
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

              <Button className="mt-3" type="submit4" variant="contained">
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
