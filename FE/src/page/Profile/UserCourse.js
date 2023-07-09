/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import {
  deleteDocument,
  getAllCourse,
  getUserData,
  useCourseService,
} from "../../hook/LessionHook";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Empty, Modal, Popconfirm } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Button, Chip, Dialog, Pagination, Rating } from "@mui/material";
import { getStatus } from "../../Admin/component/ManageCourse/ManageCourse";
import { format } from "date-fns";
import { Input } from "antd";
import { openNotification } from "../../Notification";
import AdminCourse from "../../Admin/component/AdminCourse";
import { getCourseRating } from "../../ultis/course";
const { Search } = Input;
const UserCourse = () => {
  const [page, setPage] = useState(1);
  const { data: USER } = useQuery(["user"], getUserData);
  const [queryparams, setQueryparams] = useState({
    limit: 5,
    skip: 5 * (page - 1),
    text: "",
    user_id: USER?.user?._id,
  });
  const queryClient = useQueryClient();
  const { data } = useQuery(["courses", queryparams], getAllCourse);
  const onSearch = (value) => console.log(value);
  const [active, setActive] = useState(0);
  const [edit, setEdit] = useState(false);

  const handlePaginationChange = (e, page) => {
    setPage(page);
    setQueryparams({
      ...queryparams,
      limit: 5,
      skip: 5 * (page - 1),
    });
    window?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!edit) {
      sessionStorage.removeItem("new_course");
    }
  }, []);

  const handleRemove = async (id) => {
    const res = await deleteDocument({
      id: id,
      type: "course",
    });
    if (res?.deletedCount === 1) {
      openNotification({
        type: "success",
        message: "Xóa thành công",
      });
      setTimeout(() => {
        queryClient.invalidateQueries(["courses", queryparams]);
      }, 2000);
    }
  };
  const handleClose = () => {
    setEdit(false);
    queryClient.invalidateQueries(["courses", queryparams]);
  };
  const interval = useRef();
  const [search, searchSearch] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    searchSearch(e?.target?.value);
  };

  useEffect(() => {
    if (queryparams?.text !== search) {
      interval.current = setInterval(() => {
        setQueryparams({
          ...queryparams,
          text: search,
        });
      }, 1000);
    } else {
      clearInterval(interval.current);
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [queryparams, search]);

  return (
    <div>
      <Modal
        onCancel={handleClose}
        wrapClassName="antd-wrapper"
        open={edit}
        footer={<></>}
      >
        <AdminCourse edit={edit} />
      </Modal>
      <div className="profile-head">
        <h3>Khóa học của tôi</h3>

        <div className="feature-filters style1 ml-auto">
          <ul className="filters" data-toggle="buttons">
            <Breadcrumb>
              <Breadcrumb.Item
                href="#"
                className=""
                onClick={() => {
                  setQueryparams({
                    ...queryparams,
                    status: "",
                  });
                }}
              >
                <span>Tất cả</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item
                href="#"
                onClick={() => {
                  setQueryparams({
                    ...queryparams,
                    status: "published",
                  });
                }}
              >
                <span>Đã phát hành</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item
                href="#"
                onClick={() => {
                  setQueryparams({
                    ...queryparams,
                    status: "pending",
                  });
                }}
              >
                <span>Chờ xác nhận</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item
                href="#"
                onClick={() => {
                  setQueryparams({
                    ...queryparams,
                    status: "draft",
                  });
                }}
              >
                <span>Bản nháp</span>
              </Breadcrumb.Item>
            </Breadcrumb>
          </ul>
        </div>
      </div>
      <div className="courses-filter">
        <div className="col-lg-12 m-b20">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <Pagination
                onChange={handlePaginationChange}
                count={!!data?.count ? Math.round(data?.count / 5) : 1}
                color="primary"
              />
            </div>
            <div>
              <Search
                placeholder="Tìm kiếm"
                onChange={handleChange}
                enterButton
              />
            </div>
          </div>
        </div>
        <div className="clearfix">
          <ul id="masonry" className="ttr-gallery-listing magnific-image row">
            {!!data?.courses?.length ? (
              data?.courses?.map((course) => (
                <div className="card-courses-list admin-courses">
                  <div className="card-courses-media">
                    <img
                      src={
                        !!course?.thumbnail?.length
                          ? course?.thumbnail[0]
                          : "../images/course.jpg"
                      }
                      alt=""
                    />
                  </div>
                  <div className="card-courses-full-dec">
                    <div className="card-courses-title">
                      <h4>
                        <Link to={"/course/" + course?._id}>
                          {course?.name}
                        </Link>
                      </h4>
                    </div>
                    <div className="card-courses-list-bx">
                      <ul className="card-courses-view">
                        <li className="card-courses-user">
                          <div className="card-courses-user-pic">
                            <img
                              src={
                                !!course?.owner?.avatar?.length
                                  ? !!course?.owner?.avatar[0]
                                  : "../images/user.jpg"
                              }
                              alt=""
                            />
                          </div>
                          <div className="card-courses-user-info">
                            <h5>Giảng viên</h5>
                            <h4> {course?.owner?.fullName}</h4>
                          </div>
                        </li>
                        <li className="card-courses-categories">
                          <h5>Thể loại</h5>
                          <h4>Backend</h4>
                        </li>
                        <li className="card-courses-review">
                          <h5>Đánh giá</h5>
                          <ul className="cours-star">
                            <Rating
                              value={getCourseRating(course?.comments)}
                              readOnly
                            />
                          </ul>
                        </li>
                        {/* <li className="card-courses-stats">
                          <Chip
                            label={getStatus(course?.status)?.label}
                            color={getStatus(course?.status)?.color}
                            variant="contained"
                          />
                        </li>
                        <li className="card-courses-price">
                          <del>{course?.descount}</del>
                          <h5 className="text-primary">
                            {course?.price || 0}₫
                          </h5>
                        </li> */}
                      </ul>
                    </div>
                    <h6 className="m-b10">
                      Ngày mua :{" "}
                      {format(new Date(course?.createdAt), "yyyy-MM-dd hh:mm")}
                    </h6>
                    <div className="row card-courses-dec">
                      <div className="col-md-12">
                        <h6 className="m-b10">Mô tả khóa học</h6>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: course?.description,
                          }}
                          style={{
                            maxHeight: "150px",
                            overflowY: "hidden",
                          }}
                        ></p>
                      </div>
                      <div className="col-md-12">
                        <Button
                          variant="contained"
                          className="me-2"
                          color="primary"
                          onClick={() => {
                            // sessionStorage.setItem("new_course", course?._id);
                            // setEdit(true);
                            navigate("/course/" + course?._id);
                          }}
                        >
                          Truy cập
                        </Button>
                        {/* <Popconfirm
                          title="Xác nhận"
                          description="Bạn chắc chắn muốn xóa ?"
                          onConfirm={() => handleRemove(course?._id)}
                          onOpenChange={() => console.log("open change")}
                        >
                          <Button
                            variant="contained"
                            className="me-2"
                            color="error"
                          >
                            Xóa
                          </Button>
                        </Popconfirm> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Empty />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserCourse;
