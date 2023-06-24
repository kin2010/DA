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

const UserInfo = () => {
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
      <h3 className="text-primary">Thông tin cá nhân</h3>
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
                <div className="col-6">
                  <FormControl label="Tên *" name="fullName"></FormControl>
                  <FormControl label="Email *" name="email"></FormControl>
                  <FormControl
                    type="input_number"
                    label="Số điện thoại *"
                    name="phone"
                  ></FormControl>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center justify-content-center">
                    <div
                      className=""
                      style={{
                        width: "200px",
                        height: "200px",
                        border: "1px solid gray",
                        borderRadius: "5px",
                      }}
                    >
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                        src={src || "../images/user.jpg"}
                        alt="#"
                      />
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    <label style={{ cursor: "pointer" }} htmlFor="file">
                      Đổi ảnh
                    </label>
                    <input
                      accept="image/*"
                      type="file"
                      id="file"
                      style={{ opacity: 0 }}
                      onChange={changeFile}
                    />
                  </div>
                </div>
              </div>
              <FormControl
                label="Giới thiệu bản thân *"
                name="information"
                type={"editor"}
              ></FormControl>
              <Button type="submit4" variant="contained">
                Cập nhật{" "}
              </Button>
            </form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default UserInfo;
{
  /* <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="primary"
            label="Tên"
            onChange={handleChange}
            value={form.fullName}
            fullWidth
            name="fullName"
            required
          />
        </Stack>
        <TextField
          name="email"
          type="email"
          variant="outlined"
          color="primary"
          label="Email"
          onChange={handleChange}
          value={form.email}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        <TextField
          type="number"
          name="phone"
          variant="outlined"
          color="primary"
          label="Số điện thoại"
          onChange={handleChange}
          value={form.phone}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        <lebel>Giới thiệu bản thân</lebel>
        <TextArea
          type="number"
          name="information"
          onChange={handleChange}
          value={form.information}
          fullWidth
          required
          sx={{ mb: 4 }}
          m
        />
        {/* <TextField
          type="password"
          variant="outlined"
          color="primary"
          label="Password"
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 4 }}
        />
        <TextField
          type="date"
          variant="outlined"
          color="primary"
          label="Date of Birth"
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 4 }}
        /> */
}
