/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */

import React from "react";
import Header from "../Header";
import "../../index.css";

import { Col } from "antd";
import Lotrinh from "../../component/Lotrinh";
import Ratee from "../../component/Rating";
import { Navigate, useNavigate } from "react-router-dom";
import TabContext from "@mui/lab/TabContext/TabContext";
import { Carousel, CarouselItem } from "react-bootstrap";
import UncontrolledExample from "./Slideee";
import HomeSlide from "./Slideee";
import CoursePopulate from "./CoursePopulate";
import { Avatar } from "@mui/material";
import HeaderAppBar from "../Header/AppBar";

const HomeLayout = () => {
  const [value, setValue] = React.useState("1");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <div className="cont">
      <HeaderAppBar></HeaderAppBar>
      <div>
        <HomeSlide></HomeSlide>
      </div>
      <div className="content-block">
        {/* Our Services */}
        <div className="section-area content-inner service-info-bx">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="service-bx">
                  <div className="action-box">
                    {/* <img src="assets/images/our-services/pic1.jpg" alt /> */}
                  </div>
                  <div className="info-bx text-center">
                    <div className="feature-box-sm radius bg-white">
                      <i className="fa fa-bank text-primary" />
                    </div>
                    <h4>
                      <a href="#">Giảng viên hàng đầu</a>
                    </h4>
                    <a href="#" className="btn radius-xl">
                      Xem thêm ...
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="service-bx">
                  <div className="action-box">
                    {/* <img src="assets/images/our-services/pic2.jpg" alt /> */}
                  </div>
                  <div className="info-bx text-center">
                    <div className="feature-box-sm radius bg-white">
                      <i className="fa fa-book text-primary" />
                    </div>
                    <h4>
                      <a href="#">Học trực tuyến</a>
                    </h4>
                    <a href="#" className="btn radius-xl">
                      Xem thêm ...
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="service-bx m-b0">
                  <div className="action-box">
                    {/* <img src="assets/images/our-services/pic3.jpg" alt /> */}
                  </div>
                  <div className="info-bx text-center">
                    <div className="feature-box-sm radius bg-white">
                      <i className="fa fa-file-text-o text-primary" />
                    </div>
                    <h4>
                      <a href="#">Lộ trình rõ ràng</a>
                    </h4>
                    <a href="#" className="btn radius-xl">
                      Xem thêm ...
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Our Services END */}
        {/* Popular Courses */}
        <div className="section-area section-sp2 popular-courses-bx">
          <div className="container">
            <div className="row">
              <div className="col-md-12 heading-bx left">
                <h2 className="title-head">
                  Khóa học <span>Phổ biến</span>
                </h2>
                <p>
                  Dưới đây là một số khóa học điển hình
                  <br /> tại hệ thống của chúng tôi
                </p>
              </div>
            </div>
            <div className="row">
              <div className="courses-carousel owl-carousel owl-btn-1 col-12 p-lr0">
                <CoursePopulate></CoursePopulate>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="section-area section-sp2">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center heading-bx">
                <h2 className="title-head m-b0">
                  Sự kiện <span>Sắp đến</span>
                </h2>
                <p className="m-b0">Những sự kiến sắp đến chờ bạn tham gia</p>
              </div>
            </div>
            <div className="row">
              <div className="upcoming-event-carousel owl-carousel owl-btn-center-lr owl-btn-1 col-12 p-lr0  m-b30">
                <div className="item">
                  <div className="event-bx">
                    <div className="action-box">
                      <img src="assets/images/event/pic4.jpg" alt />
                    </div>
                    <div className="info-bx d-flex">
                      <div>
                        <div className="event-time">
                          <div className="event-date">29</div>
                          <div className="event-month">October</div>
                        </div>
                      </div>
                      <div className="event-info">
                        <h4 className="event-title">
                          <a href="#">Education Autumn Tour 2019</a>
                        </h4>
                        <ul className="media-post">
                          <li>
                            <a href="#">
                              <i className="fa fa-clock-o" /> 7:00am 8:00am
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-map-marker" /> Berlin, Germany
                            </a>
                          </li>
                        </ul>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the..
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="event-bx">
                    <div className="action-box">
                      <img src="assets/images/event/pic3.jpg" alt />
                    </div>
                    <div className="info-bx d-flex">
                      <div>
                        <div className="event-time">
                          <div className="event-date">29</div>
                          <div className="event-month">October</div>
                        </div>
                      </div>
                      <div className="event-info">
                        <h4 className="event-title">
                          <a href="#">Education Autumn Tour 2019</a>
                        </h4>
                        <ul className="media-post">
                          <li>
                            <a href="#">
                              <i className="fa fa-clock-o" /> 7:00am 8:00am
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-map-marker" /> Berlin, Germany
                            </a>
                          </li>
                        </ul>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the..
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="event-bx">
                    <div className="action-box">
                      <img src="assets/images/event/pic2.jpg" alt />
                    </div>
                    <div className="info-bx d-flex">
                      <div>
                        <div className="event-time">
                          <div className="event-date">29</div>
                          <div className="event-month">October</div>
                        </div>
                      </div>
                      <div className="event-info">
                        <h4 className="event-title">
                          <a href="#">Education Autumn Tour 2019</a>
                        </h4>
                        <ul className="media-post">
                          <li>
                            <a href="#">
                              <i className="fa fa-clock-o" /> 7:00am 8:00am
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-map-marker" /> Berlin, Germany
                            </a>
                          </li>
                        </ul>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the..
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <a href="#" className="btn">
                View All Event
              </a>
            </div>
          </div>
        </div> */}
        {/* Testimonials */}
        <div
          className="section-area section-sp2 bg-fix ovbl-dark"
          style={{
            "background-image": "url(assets/images/background/bg1.jpg)",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-white heading-bx left">
                <h2 className="title-head text-uppercase">
                  Đánh giá của <span>người dùng</span>
                </h2>
                <p>Lắng nge những chia sẻ của học viên về hệ thống</p>
              </div>
            </div>
            <div className="testimonial-carousel owl-carousel owl-btn-1 col-12 p-lr0">
              <div className="item">
                <div className="testimonial-bx">
                  <div className="testimonial-thumb" style={{ width: "unset" }}>
                    <Avatar alt="zzz" sx={{ width: 56, height: 56 }}>
                      A
                    </Avatar>
                  </div>
                  <div className="testimonial-info">
                    <h5 className="name">Nguyễn Văn A</h5>
                    <p>-Học viên</p>
                  </div>
                  <div className="testimonial-content">
                    <p>
                      Cảm ơn các thầy cô đã truyền đạt cho em các kiến thức cơ
                      bản, hơn thế nữa là những mẹo vặt hay giúp em đạt...
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="testimonial-bx">
                  <div className="testimonial-thumb" style={{ width: "unset" }}>
                    <Avatar
                      alt="zzz"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 56, height: 56 }}
                    >
                      B
                    </Avatar>
                  </div>
                  <div className="testimonial-info">
                    <h5 className="name">Lê Thị B</h5>
                    <p>-Học viên</p>
                  </div>
                  <div className="testimonial-content">
                    <p>
                      Tuy em học chỉ mới khoảng mấy tháng cuối năm, đây là
                      khoảng thời gian có hơi ngắn nhưng em học được rất
                      nhiều...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeLayout;
