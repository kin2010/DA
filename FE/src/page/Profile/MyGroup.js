/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Formik } from "formik";
import FormControl from "../../component/FormControl";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changePass,
  getGroupByUser,
  getUserData,
} from "../../hook/LessionHook";
import {
  createCategorySchema,
  updatePasswordSchema,
} from "../../Validation/CourseCreate";
import { openNotification } from "../../Notification";
import { Empty } from "antd";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { Input } from "antd";

const { Search } = Input;
const MyGroup = () => {
  const queryClient = useQueryClient();
  const { data: user } = useQuery(["user"], getUserData);
  const { data } = useQuery(
    ["user_group", { id: user?.user?._id }],
    getGroupByUser
  );
  const onSearch = () => {
    //
  };
  const navigate = useNavigate();
  return (
    <div className="px-4" style={{ minHeight: "430px" }}>
      <h3 className="text-primary">Nhóm của tôi: </h3>
      <p className="mb-5">Tất cả các nhóm mà bạn đã tham gia</p>
      <div className="text-end mb-5">
        <Search
          style={{ maxWidth: "300px" }}
          placeholder="Tìm kiếm"
          onChange={onSearch}
          enterButton
        />
      </div>
      <div>
        {!!data?.length ? (
          <div>
            {data?.map((gr) => (
              <div
                key={gr?._id}
                style={{
                  padding: "10px",
                  boxShadow: " rgba(0, 0, 0, 0.63) -15px 7px 15px -12px",
                  marginBottom: "20px",
                  borderRadius: "5px",
                  borderTop: "0.5px solid gray",
                  borderRight: "0.5px solid gray",
                }}
              >
                <h5 className="text-primary">
                  <PeopleAltIcon
                    className="me-2"
                    style={{ fontSize: "40px" }}
                  />
                  {gr?.name}
                </h5>
                <p
                  className="mt-2"
                  onClick={() => {
                    navigate("/course/" + gr?.course?._id);
                  }}
                >
                  Khóa học:
                  <i
                    className="ms-2 "
                    style={{
                      fontWeight: "500",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    {gr?.course?.name}
                  </i>
                </p>
                <p className="d-flex align-items-center">
                  <PersonIcon
                    className="me-3"
                    color="primary"
                    style={{ fontSize: "20px" }}
                  />
                  <span>{gr?.course?.users?.length} thành viên</span>
                </p>
                <Button
                  onClick={() => {
                    navigate("/group/" + gr?._id);
                  }}
                  color="primary"
                  variant="contained"
                >
                  Truy cập
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <>
            <Empty className="mt-5" />
          </>
        )}
      </div>
    </div>
  );
};

export default MyGroup;
