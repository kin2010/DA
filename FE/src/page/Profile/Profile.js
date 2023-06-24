import React, { useState } from "react";
import HeaderAppBar from "../Header/AppBar";
import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../../hook/LessionHook";
import AdminCourse from "../../Admin/component/AdminCourse";
import TeacherCourse from "./TeacherCourse";
import UserInfo from "./UserInfo";

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
                      <Tab
                        style={{ alignItems: "start" }}
                        label="Tạo khóa học"
                      />
                      <Divider></Divider>
                      <Tab
                        style={{ alignItems: "start" }}
                        label="Khóa học của tôi"
                      />
                      <Divider></Divider>
                      <Tab
                        style={{ alignItems: "start" }}
                        label="Thông tin cá nhân"
                      />{" "}
                      <Divider></Divider>
                      <Tab
                        style={{ alignItems: "start" }}
                        label="Đổi mật khẩu"
                      />{" "}
                      <Divider></Divider>
                    </Tabs>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-8 col-sm-12 m-b30">
                <div className="profile-content-bx">
                  <div className="tab-content">
                    {value === 0 && <AdminCourse />}
                    {value === 2 && <TeacherCourse />}
                    {value === 4 && <UserInfo />}
                    {/* <div className=" " id="courses">
                      <div className="profile-head">
                        <h3>My Courses</h3>
                        <div className="feature-filters style1 ml-auto">
                          <ul className="filters" data-toggle="buttons">
                            <li data-filter="" className="btn active">
                              <input type="radio" />
                              <a href="#">
                                <span>All</span>
                              </a>
                            </li>
                            <li data-filter="publish" className="btn">
                              <input type="radio" />
                              <a href="#">
                                <span>Publish</span>
                              </a>
                            </li>
                            <li data-filter="pending" className="btn">
                              <input type="radio" />
                              <a href="#">
                                <span>Pending</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                     
                    </div>
                    <div className="" id="quiz-results">
                      <div className="profile-head">
                        <h3>Quiz Results</h3>
                      </div>
                      <div className="courses-filter">
                        <div className="row">
                          <div className="col-md-6 col-lg-6">
                            <ul className="course-features">
                              <li>
                                <i className="ti-book" />{" "}
                                <span className="label">Lectures</span>{" "}
                                <span className="value">8</span>
                              </li>
                              <li>
                                <i className="ti-help-alt" />{" "}
                                <span className="label">Quizzes</span>{" "}
                                <span className="value">1</span>
                              </li>
                              <li>
                                <i className="ti-time" />{" "}
                                <span className="label">Duration</span>{" "}
                                <span className="value">60 hours</span>
                              </li>
                              <li>
                                <i className="ti-stats-up" />{" "}
                                <span className="label">Skill level</span>{" "}
                                <span className="value">Beginner</span>
                              </li>
                              <li>
                                <i className="ti-smallcap" />{" "}
                                <span className="label">Language</span>{" "}
                                <span className="value">English</span>
                              </li>
                              <li>
                                <i className="ti-user" />{" "}
                                <span className="label">Students</span>{" "}
                                <span className="value">32</span>
                              </li>
                              <li>
                                <i className="ti-check-box" />{" "}
                                <span className="label">Assessments</span>{" "}
                                <span className="value">Yes</span>
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-6 col-lg-6">
                            <ul className="course-features">
                              <li>
                                <i className="ti-book" />{" "}
                                <span className="label">Lectures</span>{" "}
                                <span className="value">8</span>
                              </li>
                              <li>
                                <i className="ti-help-alt" />{" "}
                                <span className="label">Quizzes</span>{" "}
                                <span className="value">1</span>
                              </li>
                              <li>
                                <i className="ti-time" />{" "}
                                <span className="label">Duration</span>{" "}
                                <span className="value">60 hours</span>
                              </li>
                              <li>
                                <i className="ti-stats-up" />{" "}
                                <span className="label">Skill level</span>{" "}
                                <span className="value">Beginner</span>
                              </li>
                              <li>
                                <i className="ti-smallcap" />{" "}
                                <span className="label">Language</span>{" "}
                                <span className="value">English</span>
                              </li>
                              <li>
                                <i className="ti-user" />{" "}
                                <span className="label">Students</span>{" "}
                                <span className="value">32</span>
                              </li>
                              <li>
                                <i className="ti-check-box" />{" "}
                                <span className="label">Assessments</span>{" "}
                                <span className="value">Yes</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                   
                    <div className="" id="change-password">
                      <div className="profile-head">
                        <h3>Change Password</h3>
                      </div>
                      <form className="edit-profile">
                        <div className="">
                          <div className="form-group row">
                            <div className="col-12 col-sm-8 col-md-8 col-lg-9 ml-auto">
                              <h3>Password</h3>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">
                              Current Password
                            </label>
                            <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                              <input
                                className="form-control"
                                type="password"
                                defaultValue=""
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">
                              New Password
                            </label>
                            <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                              <input
                                className="form-control"
                                type="password"
                                defaultValue=""
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">
                              Re Type New Password
                            </label>
                            <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                              <input
                                className="form-control"
                                type="password"
                                defaultValue=""
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-sm-4 col-md-4 col-lg-3"></div>
                          <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                            <button type="reset" className="btn">
                              Save changes
                            </button>
                            <button type="reset" className="btn-secondry">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </form>
                    </div> */}
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
