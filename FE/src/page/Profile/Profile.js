import React, { useState } from "react";
import HeaderAppBar from "../Header/AppBar";
import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../../hook/LessionHook";
import AdminCourse from "../../Admin/component/AdminCourse";
import TeacherCourse from "./TeacherCourse";
import UserInfo from "./UserInfo";
import ChangePassword from "./ChangePass";
import { getRoleID } from "../../ultis/Common";
import { ROLE_ID } from "../../ultis/PrivateRoute";
import UserCourse from "./UserCourse";
import MyGroup from "./MyGroup";

const Profile = () => {
  const { data } = useQuery(["user"], getUserData);
  const [value, setValue] = React.useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <>
      <HeaderAppBar />
      <div className="content-block">
        {/* About Us */}
        <div className="section-area section-sp1">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-12 m-b30">
                <div className="profile-bx text-center">
                  <div className="user-profile-thumb">
                    <img
                      src={
                        data?.user?.avatar
                          ? data?.user?.avatar
                          : "../images/user.jpg"
                      }
                      alt=""
                    />
                  </div>
                  <div className="profile-info">
                    <h4>{data?.user?.fullName}</h4>
                    <span>{data?.user?.email}</span>
                  </div>
                  <div className="profile-tabnav">
                    <Tabs
                      orientation="vertical"
                      variant="scrollable"
                      value={value}
                      onChange={handleChange}
                      aria-label="Vertical tabs example"
                      sx={{
                        borderRight: 1,
                        borderColor: "divider",
                        textAlign: "left",
                      }}
                    >
                      {getRoleID() === ROLE_ID.TEACHER && (
                        <Tab
                          style={{ alignItems: "start" }}
                          label="Tạo khóa học"
                          onClick={() => {
                            sessionStorage.removeItem("new_course");
                          }}
                        />
                      )}
                      <Tab
                        style={{ alignItems: "start" }}
                        label="Khóa học của tôi"
                      />
                      <Tab
                        style={{ alignItems: "start" }}
                        label="Nhóm của tôi"
                      />
                      <Tab
                        style={{ alignItems: "start" }}
                        label="Thông tin cá nhân"
                      />
                      <Tab
                        style={{ alignItems: "start" }}
                        label="Đổi mật khẩu"
                      />
                    </Tabs>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-8 col-sm-12 m-b30">
                <div className="profile-content-bx">
                  <div className="tab-content">
                    {getRoleID() === ROLE_ID.TEACHER && (
                      <>
                        {value === 0 && <AdminCourse />}
                        {value === 1 && <TeacherCourse />}
                        {value === 2 && <MyGroup />}
                        {value === 3 && <UserInfo />}
                        {value === 4 && <ChangePassword />}
                      </>
                    )}
                    {getRoleID() === ROLE_ID.USER && (
                      <>
                        {value === 0 && <UserCourse />}
                        {value === 1 && <MyGroup />}
                        {value === 2 && <UserInfo />}
                        {value === 3 && <ChangePassword />}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* contact area END */}
    </>
  );
};

export default Profile;
