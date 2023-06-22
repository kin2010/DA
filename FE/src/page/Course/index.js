import React, { useEffect, useRef, useState } from "react";
import Chapter from "../../component/Chapter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCategories, getAllCourse } from "../../hook/LessionHook";
import {
  Button,
  InputAdornment,
  Pagination,
  Rating,
  TextField,
} from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import HeaderAppBar from "../Header/AppBar";
import { Divider, Empty, Select } from "antd";
import "antd/dist/antd.css";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import CloseIcon from "@mui/icons-material/Close";
import CourseComment from "./CourseComment";
import { getCourseRating } from "../../ultis/course";
const Course = () => {
  const [page, setPage] = useState(1);
  const [queryparams, setQueryparams] = useState({
    limit: 9,
    skip: 9 * (page - 1),
    text: "",
  });
  const queryClient = useQueryClient();
  const { data } = useQuery(["courses", queryparams], getAllCourse);
  const { data: categories } = useQuery(["categories"], getAllCategories);
  const handlePaginationChange = (e, page) => {
    setPage(page);
    setQueryparams({
      limit: 9,
      skip: 9 * (page - 1),
      text: "",
      category: "",
    });
    window?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
    <div className="page-wraper">
      <Outlet />
      <HeaderAppBar></HeaderAppBar>
      <div className="page-content bg-white">
        {/* inner page banner */}
        <div
          className="page-banner ovbl-dark"
          style={{ backgroundImage: "url(assets/images/banner/banner3.jpg)" }}
        >
          <div className="container">
            <div className="page-banner-entry">
              <h1 className="text-white">Khóa Học</h1>
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
              <li>Khóa học</li>
            </ul>
          </div>
        </div>
        {/* Breadcrumb row END */}
        {/* inner page banner END */}
        <div className="content-block">
          {/* About Us */}
          <div className="section-area section-sp1">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-4 col-sm-12 m-b30">
                  <div className="widget courses-search-bx placeani">
                    <div className="form-group">
                      <div className="input-group">
                        {/* <label>Tìm kiếm</label>
                        <input
                          name="dzName"
                          type="text"
                          required
                          className="form-control"
                        /> */}
                      </div>
                    </div>
                  </div>
                  <div className="widget widget_archive">
                    <h5 className="widget-title style-1">Tất cả khóa học</h5>
                    <Divider />
                    <TextField
                      id="input-with-icon-textfield"
                      label="Tìm kiếm"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ManageSearchIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                      type="search"
                      className="mb-3"
                      onChange={handleChange}
                    />
                    <h5>Thể loại :</h5>
                    {!!queryparams.category && (
                      <div>
                        <p>
                          {categories
                            ?.reduce((a, b) => {
                              return [...a, ...b?.categories];
                            }, [])
                            ?.find((c) => c?._id === queryparams.category)
                            ?.name || ""}
                          <span
                            onClick={() => {
                              setQueryparams({
                                ...queryparams,
                                category: "",
                              });
                            }}
                          >
                            <CloseIcon color="primary"></CloseIcon>
                          </span>
                        </p>
                      </div>
                    )}

                    <ul className="mt-5">
                      {!!categories?.length &&
                        categories?.map((data) => (
                          <li key={data?._id?._id}>
                            <div
                              style={{
                                fontWeight: "600",
                              }}
                            >
                              {data?._id?.name}
                            </div>
                            {data?.categories?.map((category) => (
                              <li
                                key={category?._id}
                                value={category?._id}
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setQueryparams({
                                    ...queryparams,
                                    category: category?._id,
                                  });
                                }}
                              >
                                {category?.name}
                              </li>
                            ))}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12">
                  <div className="row">
                    {!!data?.courses?.length ? (
                      data?.courses?.map((course) => (
                        <div
                          className="col-md-6 col-lg-4 col-sm-6 m-b30"
                          key={course?._id}
                        >
                          <div className="cours-bx">
                            <div className="action-box">
                              <img
                                src={
                                  !!course?.thumbnail?.length
                                    ? course?.thumbnail[0]
                                    : "./images/course.jpg"
                                }
                                alt=""
                              />
                              <Button
                                color="primary"
                                variant="contained"
                                className="btn"
                                onClick={() =>
                                  navigate(`/course/${course?._id}`)
                                }
                                style={{ color: "white!important" }}
                              >
                                Xem ngay
                              </Button>
                            </div>
                            <div className="info-bx text-center">
                              <h5>
                                <Link to={`/course/${course?._id}`}>
                                  {course?.name}
                                </Link>
                              </h5>
                              <span> {course?.category?.name}</span>
                            </div>
                            <div className="cours-more-info">
                              <div className="review">
                                <span>
                                  {!!course?.comments?.length
                                    ? course?.comments?.length
                                    : 0}{" "}
                                  Đánh giá
                                </span>
                                <ul className="cours-star">
                                  <Rating
                                    size="medium"
                                    color="primary"
                                    value={getCourseRating(
                                      course?.comments || []
                                    )}
                                    readOnly
                                  />
                                </ul>
                              </div>
                              <div className="price">
                                {course?.discount ? (
                                  <del>
                                    {!!course?.discount
                                      ? (
                                          course?.price - course?.discount
                                        )?.toLocaleString("en-US")
                                      : 0}
                                    &#x20AB;
                                  </del>
                                ) : (
                                  <></>
                                )}
                                <h5>
                                  {!!course?.price
                                    ? course?.price?.toLocaleString("en-US")
                                    : "Miễn phí"}
                                  {!!course?.price && <> &#x20AB;</>}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="mb-5" style={{ marginTop: "200px" }}>
                        <Empty />
                      </div>
                    )}

                    <div className="col-lg-12 m-b20">
                      <div className="pagination-bx rounded-sm gray clearfix">
                        <Pagination
                          onChange={handlePaginationChange}
                          count={
                            !!data?.count ? Math.round(data?.count / 9) + 1 : 1
                          }
                          color="primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* contact area END */}
      </div>
      {/* Content END*/}
      {/* Footer ==== */}
      <footer>
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
                  <a href="#" className="btn">
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
      </footer>
      {/* Footer END ==== */}
      <button className="back-to-top fa fa-chevron-up" />
    </div>
  );
};

export default Course;
