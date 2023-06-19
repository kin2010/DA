import { Box, Divider, Tab } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Header from "../Header";
import "../../index.css";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Course from "../Course";
import Resultt from "../../component/Result";
import { Col } from "antd";
import Lotrinh from "../../component/Lotrinh";
import Ratee from "../../component/Rating";
import { Navigate, useNavigate } from "react-router-dom";
import TabContext from "@mui/lab/TabContext/TabContext";

const HomeBK = () => {
  const [value, setValue] = React.useState("1");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="cont">
      <Header></Header>
      <Container className="cont" style={{ backgroudColor: "#f9f9f9 " }}>
        <button
          onClick={() => {
            navigate("/meeting?room=abcd12345");
          }}
        >
          mtg
        </button>
        <h3 className="mt-3">PEN-C TIẾNG ANH - THẦY PHẠM TRỌNG HIẾU</h3>
        <h1 className="mt-2 short">
          Luyện thi đại học môn Tiếng Anh hiệu quả và dễ dàng hơn cùng thầy Phạm
          Trọng Hiếu. Với phương pháp tiếp cận thú vị, khóa học này sẽ giúp các
          em bớt sợ Tiếng Anh và cảm thấy gần gũi như tiếng Việt, từ đó đạt điểm
          cao trong bài thi tốt nghiệp THPT. Giáo viên: Phạm Trọng Hiếu
        </h1>
        {/* 
        
        {/* Recent News */}
        <div className="section-area section-sp2">
          <div className="container">
            <div className="row">
              <div className="col-md-12 heading-bx left">
                <h2 className="title-head">
                  Recent <span>News</span>
                </h2>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page
                </p>
              </div>
            </div>
            <div className="recent-news-carousel owl-carousel owl-btn-1 col-12 p-lr0">
              <div className="item">
                <div className="recent-news">
                  <div className="action-box">
                    <img src="assets/images/blog/latest-blog/pic1.jpg" alt />
                  </div>
                  <div className="info-bx">
                    <ul className="media-post">
                      <li>
                        <a href="#">
                          <i className="fa fa-calendar" />
                          Jan 02 2019
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-user" />
                          By William
                        </a>
                      </li>
                    </ul>
                    <h5 className="post-title">
                      <a href="blog-details.html">
                        This Story Behind Education Will Haunt You Forever.
                      </a>
                    </h5>
                    <p>
                      Knowing that, you’ve optimised your pages countless amount
                      of times, written tons.
                    </p>
                    <div className="post-extra">
                      <a href="#" className="btn-link">
                        READ MORE
                      </a>
                      <a href="#" className="comments-bx">
                        <i className="fa fa-comments-o" />
                        20 Comment
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="recent-news">
                  <div className="action-box">
                    <img src="assets/images/blog/latest-blog/pic2.jpg" alt />
                  </div>
                  <div className="info-bx">
                    <ul className="media-post">
                      <li>
                        <a href="#">
                          <i className="fa fa-calendar" />
                          Feb 05 2019
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-user" />
                          By John
                        </a>
                      </li>
                    </ul>
                    <h5 className="post-title">
                      <a href="blog-details.html">
                        What Will Education Be Like In The Next 50 Years?
                      </a>
                    </h5>
                    <p>
                      As desperate as you are right now, you have done
                      everything you can on your.
                    </p>
                    <div className="post-extra">
                      <a href="#" className="btn-link">
                        READ MORE
                      </a>
                      <a href="#" className="comments-bx">
                        <i className="fa fa-comments-o" />
                        14 Comment
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="recent-news">
                  <div className="action-box">
                    <img src="assets/images/blog/latest-blog/pic3.jpg" alt />
                  </div>
                  <div className="info-bx">
                    <ul className="media-post">
                      <li>
                        <a href="#">
                          <i className="fa fa-calendar" />
                          April 14 2019
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-user" />
                          By George
                        </a>
                      </li>
                    </ul>
                    <h5 className="post-title">
                      <a href="blog-details.html">
                        Master The Skills Of Education And Be.
                      </a>
                    </h5>
                    <p>
                      You will see in the guide all my years of valuable
                      experience together with.
                    </p>
                    <div className="post-extra">
                      <a href="#" className="btn-link">
                        READ MORE
                      </a>
                      <a href="#" className="comments-bx">
                        <i className="fa fa-comments-o" />
                        23 Comment
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Recent News End */}
        <Col className="d-flex">
          <Box className="w-75">
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Mô tả khóa học" value="1" />
                    <Tab label="Đề cương khóa học " value="2" />
                    <Tab label="Đánh giá khóa học" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <div className="label mt-2 fw-bold">Mô tả khóa học</div>
                  <div className="label2 mt-2 mb-1 fw-bold">Mô tả khóa học</div>
                  <div className="label2 mt-2 mb-1 fw-bold">Mô tả khóa học</div>
                  <div className="label2 mt-2 mb-1 fw-bold">Mô tả khóa học</div>
                  <Stack className="mt-3" direction="row" spacing={1}>
                    <Chip
                      size="medium"
                      label="Đề cương khóa học "
                      color="primary"
                    />
                  </Stack>
                  <Divider
                    className="mt-2"
                    textAlign="left"
                    color="#1976d2"
                  ></Divider>

                  <div className="comments mt-5">
                    <Stack className="mt-3" direction="row" spacing={1}>
                      <Chip
                        size="medium"
                        label="Đánh giá khóa học"
                        color="primary"
                      />
                    </Stack>
                    <Divider
                      className="mt-5"
                      textAlign="left"
                      color="#1976d2"
                    ></Divider>
                    <Box className="mt-5">
                      <Ratee count={142} value={4.6}></Ratee>
                    </Box>
                  </div>
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
              </TabContext>
            </Box>
          </Box>
          <Box className="w-25">
            <Resultt />
            <Lotrinh></Lotrinh>
          </Box>
        </Col>
      </Container>
      <div className="widget_tag_cloud">
        <h6>TAGS</h6>
        <div className="tagcloud">
          <a href="#">Design</a>
          <a href="#">User interface</a>
          <a href="#">SEO</a>
          <a href="#">WordPress</a>
          <a href="#">Development</a>
          <a href="#">Joomla</a>
          <a href="#">Design</a>
          <a href="#">User interface</a>
          <a href="#">SEO</a>
          <a href="#">WordPress</a>
          <a href="#">Development</a>
          <a href="#">Joomla</a>
          <a href="#">Design</a>
          <a href="#">User interface</a>
          <a href="#">SEO</a>
          <a href="#">WordPress</a>
          <a href="#">Development</a>
          <a href="#">Joomla</a>
        </div>
      </div>
      <div className="ttr-divider bg-gray">
        <i className="icon-dot c-square" />
      </div>
      <h6>SHARE </h6>
      <ul className="list-inline contact-social-bx">
        <li>
          <a href="#" className="btn outline radius-xl">
            <i className="fa fa-facebook" />
          </a>
        </li>
        <li>
          <a href="#" className="btn outline radius-xl">
            <i className="fa fa-twitter" />
          </a>
        </li>
        <li>
          <a href="#" className="btn outline radius-xl">
            <i className="fa fa-linkedin" />
          </a>
        </li>
        <li>
          <a href="#" className="btn outline radius-xl">
            <i className="fa fa-google-plus" />
          </a>
        </li>
      </ul>
      <div className="ttr-divider bg-gray">
        <i className="icon-dot c-square" />
      </div>
    </div>
  );
};
export default HomeBK;
