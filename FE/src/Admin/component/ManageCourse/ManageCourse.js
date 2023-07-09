/* eslint-disable no-unused-vars */
import { SearchOutlined } from "@ant-design/icons";
import { Breadcrumb, Empty, Modal, Space, Table } from "antd";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import IconBreadcrumbs from "../BreadCrumb";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCourse, useCourseService } from "../../../hook/LessionHook";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
  Rating,
  Slide,
} from "@mui/material";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { openNotification } from "../../../Notification";
import TextArea from "antd/lib/input/TextArea";
import { Input } from "antd";
import React from "react";
import { getCourseRating } from "../../../ultis/course";
import AdminCourse from "../AdminCourse";
const { Search } = Input;
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Phanhoi = ({ setAdminComment, adminComment }) => {
  const handleChange = (e) => {
    setAdminComment(e?.target?.value || "");
  };
  return (
    <TextArea
      value={adminComment}
      style={{ width: "400px", height: "300px" }}
      onChange={handleChange}
    />
  );
};

export const getStatus = (status) => {
  let color = "";
  let label = "";
  switch (status) {
    case "pending":
      color = "primary";
      label = "Chờ xác nhận";

      break;
    case "published":
      color = "success";
      label = "Đã xác nhận";

      break;
    case "closed":
      color = "warning";
      label = "Đã kết thúc";

      break;
    case "decline":
      color = "error";
      label = "Không chấp thuận";

      break;
    case "draft":
      color = "warning";
      label = "Đang nháp ";

      break;

    default:
      color = "primary";
      label = "Chờ xác nhận";
      break;
  }
  return { label, color };
};

const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
const ManagerCourse = () => {
  const [page, setPage] = useState(1);
  const [queryparams, setQueryparams] = useState({
    limit: 5,
    skip: 5 * (page - 1),
  });
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(["courses", queryparams], getAllCourse);
  const [selectedId, setSelectedId] = useState("");
  const [action, setAction] = useState("");
  const courseService = useCourseService();
  const [selectedItems, setSelectedItems] = useState([]);
  const [edit, setEdit] = useState(false);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  const handlePaginationChange = (e, page) => {
    setPage(page);
    setQueryparams({
      limit: 5,
      skip: 5 * (page - 1),
    });
    window?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [open, setOpen] = useState(false);
  const [adminComment, setAdminComment] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!edit) {
      sessionStorage.removeItem("new_course");
    }
  }, []);

  const publish = async () => {
    console.log(selectedId);
    const res = await courseService.updateCourse({
      id: selectedId?._id,
      body: {
        status: "published",
      },
    });
    if (!res?.message) {
      queryClient.invalidateQueries(["courses", queryparams]);
      openNotification({
        type: "success",
        message: "Đã xác nhận",
      });
    } else {
      openNotification({
        type: "error",
        message: res?.message,
      });
    }
  };

  const decline = async () => {
    console.log(selectedId);
    const res = await courseService.updateCourse({
      id: selectedId?._id,
      body: {
        status: "decline",
      },
    });
    if (!res?.message) {
      queryClient.invalidateQueries(["courses", queryparams]);
      openNotification({
        type: "success",
        message: "Đã xác nhận",
      });
    } else {
      openNotification({
        type: "error",
        message: res?.message,
      });
    }
  };
  const comment = async () => {
    console.log(adminComment, 4242);
    const res = await courseService.updateCourse({
      id: selectedId?._id,
      body: {
        admin_comment: adminComment,
      },
    });
    if (!res?.message) {
      queryClient.invalidateQueries(["courses", queryparams]);
      openNotification({
        type: "success",
        message: "Đã xác nhận",
      });
      setAdminComment("");
    } else {
      openNotification({
        type: "error",
        message: res?.message,
      });
    }
  };

  const diglogContent = useMemo(() => {
    let text1 = " Bạn đồng ý khóa học:";
    let text2 = "Khóa học sẽ được phát hành và giảng dạy bởi giảng viên";
    switch (action) {
      case "1":
        break;
      case "2":
        text1 = "Bạn không ý khóa học";
        text2 = "Khóa học sẽ không được hoạt động";
        break;

      default:
        break;
    }
    return { text1, text2 };
  }, [selectedId, action]);
  const onSearch = (e) => {
    console.log(e?.target?.value);
    setQueryparams({
      ...queryparams,
      text: e?.target?.value,
    });
  };

  const handleCloseModal = () => {
    setEdit(false);
    queryClient.invalidateQueries(["courses", queryparams]);
    sessionStorage.removeItem("new_course");
  };

  return (
    <>
      <Modal
        onCancel={handleCloseModal}
        wrapClassName="antd-wrapper"
        open={edit}
        footer={<></>}
      >
        <AdminCourse edit={edit} />
      </Modal>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{action === "3" ? "Phản hồi" : "Xác nhận"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {action === "3" ? (
              <Phanhoi
                adminComment={adminComment}
                setAdminComment={setAdminComment}
              />
            ) : (
              <>
                {diglogContent.text1}
                <Link className="link" to={"/course/" + selectedId?._id}>
                  {selectedId?.name}
                </Link>{" "}
                .
                <br /> {diglogContent.text2}
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Từ chối
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleClose();
              if (action === "1") {
                publish();
              }
              if (action === "2") {
                decline();
              }
              if (action === "3") {
                comment();
              }
            }}
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
      <IconBreadcrumbs />
      <h4> Quản lí khóa học</h4>
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
          </Breadcrumb>
        </ul>
      </div>
      <div>
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
              <Search placeholder="Tìm kiếm" onChange={onSearch} enterButton />
            </div>
          </div>
        </div>
      </div>
      <div>
        {data?.courses?.length ? (
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
                    <Link to={"/course/" + course?._id}>{course?.name}</Link>
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
                      <Rating
                        readOnly
                        value={getCourseRating(course?.comments)}
                      ></Rating>
                    </li>
                    <li className="card-courses-stats">
                      <Chip
                        label={getStatus(course?.status)?.label}
                        color={getStatus(course?.status)?.color}
                        variant="contained"
                      />
                    </li>
                    <li className="card-courses-price">
                      <del>{course?.descount}</del>
                      <h5 className="text-primary">{course?.price || 0}₫</h5>
                    </li>
                  </ul>
                </div>
                <h6 className="m-b10">
                  Ngày tạo :{" "}
                  {format(new Date(course?.createdAt), "yyyy-MM-dd hh:mm")}
                </h6>
                <div className="row card-courses-dec">
                  <div className="col-md-12">
                    <h6 className="m-b10">Mô tả khóa học</h6>
                    <p
                      style={{ maxHeight: "150px", overflowY: "hidden" }}
                      dangerouslySetInnerHTML={{ __html: course?.description }}
                    ></p>
                  </div>
                  <div className="col-md-12">
                    <Button
                      variant="contained"
                      className="me-2"
                      color="primary"
                      onClick={() => {
                        setSelectedId(course);
                        setOpen(true);
                        setAction("1");
                      }}
                      disabled={course?.publish}
                    >
                      Xác nhận
                    </Button>
                    <Button
                      variant="contained"
                      className="me-2"
                      color="error"
                      onClick={() => {
                        setSelectedId(course);
                        setOpen(true);
                        setAction("2");
                      }}
                    >
                      Từ chối
                    </Button>
                    <Button
                      variant="contained"
                      className="me-2"
                      color="warning"
                      onClick={() => {
                        setSelectedId(course);
                        setAction("3");
                        setOpen(true);
                      }}
                    >
                      Phản hồi
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        sessionStorage.setItem("new_course", course?._id);
                        setEdit(true);
                      }}
                    >
                      Sửa
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};
export default ManagerCourse;
