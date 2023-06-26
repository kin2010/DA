/* eslint-disable no-script-url */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useMemo, useState } from "react";
import { getCourse } from "../../hook/LessionHook";
import { Link, useNavigate, useParams } from "react-router-dom";
import HeaderAppBar from "../Header/AppBar";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Groups2Icon from "@mui/icons-material/Groups2";
import { Avatar, Button, Divider, Rating } from "@mui/material";
import { AppContextProvider } from "../../Context/AppContext";
import CourseComment from "./CourseComment";
import { Col, Form, Row } from "react-bootstrap";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import { postComment } from "../../hook/LessionHook";
import { Empty } from "antd";
import { openNotification } from "../../Notification";
const CourseDetail = () => {
  const { id } = useParams();
  const { data } = useQuery(["course_detail", id], getCourse);
  const onChangeForm = (e) => {
    setFormvalue({ ...formValue, [e.target.name]: e.target.value });
  };
  const { data: user } = useQuery(["user"]);
  const naviagate = useNavigate();
  const { cart, setCart } = useContext(AppContextProvider);
  const handleCourse = () => {
    const index = cart.findIndex((c) => c._id === data?._id);
    if (index === -1) {
      setCart([...cart, data]);
    }
    naviagate("/checkout");
  };
  const queryClient = useQueryClient();
  const [formValue, setFormvalue] = useState({
    comment: "",
    rating: 0,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await postComment({
      rating: formValue?.rating,
      comment: formValue?.comment,
      course: id,
      user: user?.user?._id,
    });
    if (res?._id) {
      queryClient.invalidateQueries(["course_detail", id]);
      openNotification({
        type: "success",
        message: "Cảm ơn vì đánh giá khóa học",
      });
    }
  };

  const ratingCount = useMemo(() => {
    const countByrating =
      data?.comments?.reduce((acc, obj) => {
        const rating = obj.rating;
        acc[rating] = (acc[rating] || 0) + 1;
        return acc;
      }, {}) || {};
    return countByrating;
  }, [data?.comments]);

  const ratingAverage = useMemo(() => {
    const countByrating =
      data?.comments?.reduce((acc, obj) => {
        return acc + (!!obj?.rating ? parseInt(obj?.rating) : 0);
      }, 0) || 0;
    return !!data?.comments?.length
      ? countByrating / data?.comments?.length
      : 0;
  }, [data?.comments]);

  return (
    <>
      <HeaderAppBar></HeaderAppBar>
      <div className="page-content bg-white">
        {/* inner page banner */}
        <div
          className="page-banner ovbl-dark"
          style={{ backgroundImage: "url(assets/images/banner/banner2.jpg)" }}
        >
          <div className="container">
            <div className="page-banner-entry">
              <h1 className="text-white">{data?.name}</h1>
            </div>
          </div>
        </div>
        {/* Breadcrumb row */}
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href="#">Trang chủ</a>
              </li>
              <li>Chi tiết khóa học</li>
            </ul>
          </div>
        </div>
        {/* Breadcrumb row END */}
        {/* inner page banner END */}
        <div className="content-block">
          {/* About Us */}
          <div className="section-area section-sp1">
            <div className="container">
              <div className="row d-flex flex-row-reverse">
                <div className="col-lg-3 col-md-4 col-sm-12 m-b30">
                  <div className="course-detail-bx">
                    <div className="course-price">
                      {data?.discount ? (
                        <del>
                          {!!data?.discount
                            ? (data?.price - data?.discount)?.toLocaleString(
                                "en-US"
                              )
                            : 0}
                          &#x20AB;
                        </del>
                      ) : (
                        <></>
                      )}

                      <h4 className="ms-1 price">
                        {data?.price ? (
                          <>{data?.price?.toLocaleString("en-US")} &#x20AB;</>
                        ) : (
                          "Miễn phí"
                        )}
                      </h4>
                    </div>
                    <div className="course-buy-now text-center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          handleCourse();
                        }}
                      >
                        Đăng ký ngay
                      </Button>
                    </div>
                    <div className="teacher-bx">
                      <div className="teacher-info">
                        <div className="teacher-thumb">
                          <img
                            src="assets/images/testimonials/pic1.jpg"
                            alt=""
                          />
                        </div>
                        <div className="teacher-name">
                          <h5>Giảng viên</h5>
                          <span>{data?.owner?.fullName}</span>
                        </div>
                      </div>
                    </div>
                    <div className="cours-more-info">
                      <div className="review">
                        <span>{!!data?.comments?.length || 0} Đánh giá</span>
                        <Rating value={ratingAverage} />
                      </div>
                      <div className="price categories">
                        <span>Thể loại</span>
                        <h5 className="text-primary">{data?.category?.name}</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12">
                  <div className="courses-post">
                    <div className="ttr-post-media media-effect">
                      <a href="#">
                        <img
                          src="assets/images/blog/default/thum1.jpg"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="ttr-post-info">
                      <div className="ttr-post-title mb-3">
                        <h2 className="post-title text-primary">
                          {data?.name}
                        </h2>
                      </div>
                      <div className="ttr-post-text">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: data?.target,
                          }}
                        ></p>
                      </div>
                    </div>
                  </div>
                  <div className="courese-overview" id="overview">
                    <h4 className="text-primary">Tổng quan :</h4>
                    <div className="row">
                      <div className="col-md-12 col-lg-4">
                        <ul className="course-features">
                          <li>
                            <i className="ti-book" />
                            <span className="label">Số chương</span>
                            <span className="value">
                              {data?.sections?.length}
                            </span>
                          </li>
                          <li>
                            <i className="ti-book" />
                            <span className="label">Số bài giảng</span>
                            <span className="value">
                              {data?.sections?.reduce((a, b) => {
                                return a + b?.lectures?.length;
                              }, 0)}
                            </span>
                          </li>
                          <li>
                            <i className="ti-help-alt" />{" "}
                            <span className="label">Nhiệm vụ / Bài tập</span>{" "}
                            <span className="value">
                              {data?.sections?.reduce((a, b) => {
                                return a + b?.assignments?.length;
                              }, 0)}
                            </span>
                          </li>
                          <li>
                            <i className="ti-user" />{" "}
                            <span className="label">Số học viên</span>{" "}
                            <span className="value">{data?.users?.length}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-12 col-lg-8">
                        <h5 className="m-b5 text-primary">Mô tả khóa học</h5>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: data?.description,
                          }}
                        ></p>
                        <h5 className="m-b5 text-primary">Yêu cầu</h5>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: data?.requirement,
                          }}
                        ></p>
                        <h5 className="m-b5 text-primary">Kết quả khóa học</h5>
                        <ul className="list-checked primary">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: data?.target,
                            }}
                          ></p>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="m-b30" id="group">
                    <h4>Group </h4>
                    <ul className="curriculum-list">
                      {!!data?.groups?.length &&
                        data?.groups?.map((item) => (
                          <li key={item?._id}>
                            <h5>
                              <Link
                                className="d-flex align-items-center link"
                                to={`/group/${item?._id}`}
                              >
                                <Groups2Icon
                                  style={{ fontSize: "30px" }}
                                  className="me-3"
                                ></Groups2Icon>
                                {item?.name}
                              </Link>
                            </h5>
                            <Divider></Divider>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="m-b30" id="curriculum">
                    <h4>Đề cương </h4>
                    <ul className="curriculum-list">
                      {!!data?.sections_info?.length &&
                        data?.sections_info?.map((item) => (
                          <li key={item?.section?._id}>
                            <h5>{item?.section?.name}</h5>
                            <ul>
                              {!!item?.data?.length &&
                                item?.data?.map((lecture) => (
                                  <li
                                    key={lecture?.item?._id}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <div className="curriculum-list-box">
                                      <span>
                                        {lecture?.type === "lecture" && (
                                          <DescriptionIcon
                                            color="info"
                                            className="me-3"
                                          ></DescriptionIcon>
                                        )}
                                        {lecture?.type === "assignment" && (
                                          <AssignmentIcon
                                            color="success"
                                            className="me-3"
                                          ></AssignmentIcon>
                                        )}
                                      </span>

                                      <Link
                                        to={`/lecture/${lecture?.item?._id}`}
                                      >
                                        {lecture?.item?.name}
                                      </Link>
                                    </div>
                                    {/* <span>60 minutes</span> */}
                                  </li>
                                ))}
                            </ul>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="" id="instructor">
                    <h4>Giảng viên</h4>
                    <div className="instructor-bx">
                      <div className="instructor-author">
                        <img src="assets/images/testimonials/pic1.jpg" alt="" />
                      </div>
                      <div className="instructor-info">
                        <h6>{data?.owner?.fullName}</h6>
                        <span>{data?.owner?.email}</span>
                        <ul className="list-inline m-tb10">
                          <li>
                            <a href="#" className="btn sharp-sm facebook">
                              <i className="fa fa-facebook" />
                            </a>
                          </li>
                          <li>
                            <a href="#" className="btn sharp-sm twitter">
                              <i className="fa fa-twitter" />
                            </a>
                          </li>
                          <li>
                            <a href="#" className="btn sharp-sm linkedin">
                              <i className="fa fa-linkedin" />
                            </a>
                          </li>
                          <li>
                            <a href="#" className="btn sharp-sm google-plus">
                              <i className="fa fa-google-plus" />
                            </a>
                          </li>
                        </ul>
                        {/* <p className="m-b0">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries
                        </p> */}
                      </div>
                    </div>
                  </div>
                  <div className="" id="reviews">
                    <h4>Đánh giá</h4>
                    <div className="review-bx">
                      <div className="all-review">
                        <h2
                          className="rating-type text-primary"
                          style={{
                            fontWeight: 800,
                          }}
                        >
                          {data?.comments?.length || 0}
                        </h2>
                        <p>
                          <Rating readOnly value={ratingAverage} size="large" />
                        </p>
                        <span> {data?.comments?.length || 0} đánh giá</span>
                      </div>
                      <div className="review-bar">
                        {[5, 4, 3, 2, 1]?.map((i) => (
                          <div className="bar-bx" key={"process" + i}>
                            <div className="side">
                              <div>{i} sao</div>
                            </div>
                            <div className="middle">
                              <div className="bar-container">
                                <div
                                  className="bar-5"
                                  style={{
                                    width: `${
                                      !!data?.comments?.length &&
                                      !!ratingCount[i]
                                        ? (ratingCount[i] * 100) /
                                          data?.comments?.length
                                        : 0
                                    }%`,
                                  }}
                                />
                              </div>
                            </div>
                            <div
                              className="side right font-bold"
                              style={{
                                fontWeight: 700,
                              }}
                            >
                              <div>{ratingCount[i] || 0}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Row
          id="tab3"
          className="pt-5 p-3 pb-5 cmt mt-5"
          style={{ backgroundColor: "#e9eef5", borderRadius: "25px" }}
        >
          <hr />
          <Col>
            <Row>
              <div className="h2 mb-5 text-primary">Đánh giá</div>{" "}
            </Row>

            <Row className="p-3">
              <List
                sx={{
                  width: "100%",
                  maxHeight: "500px",
                  overflowY: "auto",
                  bgcolor: "background.paper",
                }}
              >
                {!!data?.comments?.length ? (
                  data?.comments?.map((comment) => (
                    <div key={comment?._id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            alt="Travis Howard"
                            src={comment?.user?.avatar || "../images/user.png"}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={[
                            <p> {comment?.user?.fullName}</p>,
                            <Rating
                              name="read-only"
                              value={comment?.rating}
                              readOnly
                              color="#1976d2"
                            />,
                          ]}
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {comment?.comment}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </div>
                  ))
                ) : (
                  <Empty />
                )}
              </List>
            </Row>
          </Col>

          <Col className="">
            <Row>
              {" "}
              <div className="h2 mb-5 text-primary">Đánh giá khóa học này</div>
            </Row>
            <Row>
              <Form onSubmit={submitHandler} className="w-100">
                <Form.Group className="mb-3" controlId="custom4">
                  <Form.Label className="text-primary h5">
                    Xếp hạng đánh giá
                  </Form.Label>
                  <Form.Control
                    onChange={onChangeForm}
                    name="rating"
                    form="add"
                    as="select"
                    placeholder="Rating"
                    value={formValue.rating}
                    className="w-100"
                    required
                  >
                    <option value="">Chọn sao...</option>
                    <option value="1">1- Rất Tệ</option>
                    <option value="2">2- Tệ</option>
                    <option value="3">3- Khá Tốt</option>
                    <option value="4">4- Rất tốt</option>
                    <option value="5">5- Xuất sắc</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="custom5">
                  <Form.Label className="text-primary h5">Bình luận</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={3}
                    name="comment"
                    value={formValue.comment}
                    onChange={onChangeForm}
                    placeholder="Nhap Comment"
                  />
                </Form.Group>

                <Button
                  className="w-100"
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Gởi
                </Button>
              </Form>
            </Row>
          </Col>
        </Row>

        {/* contact area END */}
      </div>
      {/* Content END*/}
      {/* Footer ==== */}
      {/* <footer>
        <div className="footer-top">
          <div className="pt-exebar">
            <div className="container">
              <div className="d-flex align-items-stretch">
                <div className="pt-logo mr-auto">
                  <a href="index.html">
                    <img src="assets/images/logo-white.png" alt="" />
                  </a>
                </div>
                <div className="pt-social-link">
                  <ul className="list-inline m-a0">
                    <li>
                      <a href="#" className="btn-link">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="btn-link">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="btn-link">
                        <i className="fa fa-linkedin" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="btn-link">
                        <i className="fa fa-google-plus" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="pt-btn-join">
                  <a href="#" className="btn ">
                    Join Now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-12 col-sm-12 footer-col-4">
                <div className="widget">
                  <h5 className="footer-title">Sign Up For A Newsletter</h5>
                  <p className="text-capitalize m-b20">
                    Weekly Breaking news analysis and cutting edge advices on
                    job searching.
                  </p>
                  <div className="subscribe-form m-b20">
                    <form
                      className="subscription-form"
                      action="http://educhamp.themetrades.com/demo/assets/script/mailchamp.php"
                      method="post"
                    >
                      <div className="ajax-message" />
                      <div className="input-group">
                        <input
                          name="email"
                          required="required"
                          className="form-control"
                          placeholder="Your Email Address"
                          type="email"
                        />
                        <span className="input-group-btn">
                          <button
                            name="submit"
                            value="Submit"
                            type="submit"
                            className="btn"
                          >
                            <i className="fa fa-arrow-right" />
                          </button>
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-5 col-md-7 col-sm-12">
                <div className="row">
                  <div className="col-4 col-lg-4 col-md-4 col-sm-4">
                    <div className="widget footer_widget">
                      <h5 className="footer-title">Company</h5>
                      <ul>
                        <li>
                          <a href="index.html">Home</a>
                        </li>
                        <li>
                          <a href="about-1.html">About</a>
                        </li>
                        <li>
                          <a href="faq-1.html">FAQs</a>
                        </li>
                        <li>
                          <a href="contact-1.html">Contact</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-4 col-lg-4 col-md-4 col-sm-4">
                    <div className="widget footer_widget">
                      <h5 className="footer-title">Get In Touch</h5>
                      <ul>
                        <li>
                          <a href="http://educhamp.themetrades.com/admin/index.html">
                            Dashboard
                          </a>
                        </li>
                        <li>
                          <a href="blog-classic-grid.html">Blog</a>
                        </li>
                        <li>
                          <a href="portfolio.html">Portfolio</a>
                        </li>
                        <li>
                          <a href="event.html">Event</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-4 col-lg-4 col-md-4 col-sm-4">
                    <div className="widget footer_widget">
                      <h5 className="footer-title">Courses</h5>
                      <ul>
                        <li>
                          <a href="courses.html">Courses</a>
                        </li>
                        <li>
                          <a href="courses-details.html">Details</a>
                        </li>
                        <li>
                          <a href="membership.html">Membership</a>
                        </li>
                        <li>
                          <a href="profile.html">Profile</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-3 col-md-5 col-sm-12 footer-col-4">
                <div className="widget widget_gallery gallery-grid-4">
                  <h5 className="footer-title">Our Gallery</h5>
                  <ul className="magnific-image">
                    <li>
                      <a
                        href="assets/images/gallery/pic1.jpg"
                        className="magnific-anchor"
                      >
                        <img src="assets/images/gallery/pic1.jpg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="assets/images/gallery/pic2.jpg"
                        className="magnific-anchor"
                      >
                        <img src="assets/images/gallery/pic2.jpg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="assets/images/gallery/pic3.jpg"
                        className="magnific-anchor"
                      >
                        <img src="assets/images/gallery/pic3.jpg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="assets/images/gallery/pic4.jpg"
                        className="magnific-anchor"
                      >
                        <img src="assets/images/gallery/pic4.jpg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="assets/images/gallery/pic5.jpg"
                        className="magnific-anchor"
                      >
                        <img src="assets/images/gallery/pic5.jpg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="assets/images/gallery/pic6.jpg"
                        className="magnific-anchor"
                      >
                        <img src="assets/images/gallery/pic6.jpg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="assets/images/gallery/pic7.jpg"
                        className="magnific-anchor"
                      >
                        <img src="assets/images/gallery/pic7.jpg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="assets/images/gallery/pic8.jpg"
                        className="magnific-anchor"
                      >
                        <img src="assets/images/gallery/pic8.jpg" alt="" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                <a target="_blank" href="https://www.templateshub.net">
                  Templates Hub
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer> */}
    </>
  );
};

export default CourseDetail;
