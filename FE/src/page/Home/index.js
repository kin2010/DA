import { Box, Divider, Tab } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Header from "../Header";
import "../../index.css";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Course from "../Course/Course";
import Resultt from "../../component/Result";
import { Col } from "antd";
import Lotrinh from "../../component/Lotrinh";
import Comments from "../../component/Comment";
import Ratee from "../../component/Rating";

const Home = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="cont">
        <Header></Header>
        <Container className="cont" style={{ backgroudColor: "#f9f9f9 " }}>
          <h3 className="mt-3">PEN-C TIẾNG ANH - THẦY PHẠM TRỌNG HIẾU</h3>
          <h1 className="mt-2 short">
            Luyện thi đại học môn Tiếng Anh hiệu quả và dễ dàng hơn cùng thầy
            Phạm Trọng Hiếu. Với phương pháp tiếp cận thú vị, khóa học này sẽ
            giúp các em bớt sợ Tiếng Anh và cảm thấy gần gũi như tiếng Việt, từ
            đó đạt điểm cao trong bài thi tốt nghiệp THPT. Giáo viên: Phạm Trọng
            Hiếu
          </h1>
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
                    <div className="label2 mt-2 mb-1 fw-bold">
                      Mô tả khóa học
                    </div>
                    <div className="label2 mt-2 mb-1 fw-bold">
                      Mô tả khóa học
                    </div>
                    <div className="label2 mt-2 mb-1 fw-bold">
                      Mô tả khóa học
                    </div>
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

                    <div className="course">
                      <Course></Course>
                    </div>
                    <div className="comments mt-5">
                      <Stack className="mt-3" direction="row" spacing={1}>
                        <Chip
                          size="medium"
                          label="Đánh giá khóa học"
                          color="primary"
                        />
                      </Stack>{" "}
                      <Divider
                        className="mt-5"
                        textAlign="left"
                        color="#1976d2"
                      ></Divider>
                      <Box className="mt-5">
                        <Ratee count={142} value={4.6}></Ratee>
                      </Box>
                      <Comments></Comments>
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
      </div>
    </>
  );
};

export default Home;
