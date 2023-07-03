import React, { useState } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, DatePicker, Row, Statistic } from "antd";
import IconBreadcrumbs from "./BreadCrumb";
import { ChartBar } from "./Chart/Chart";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { addMonths } from "date-fns";
const Dashboard = () => {
  const [date, setDate] = useState({
    start: dayjs(new Date()),
    end: dayjs(addMonths(new Date(), 1)),
  });
  return (
    <div>
      <IconBreadcrumbs />
      <h4>Tổng quan :</h4>
      <div className="col-md-12 mb-2">
        <label className="col-form-label">Thời gian*</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              label="Thời gian bắt đầu"
              value={dayjs(date.start)}
              defaultValue={dayjs(date.start)}
              sx={{
                backgroundColor: "white",
              }}
              onChange={(newValue) => setDate({ ...date, start: newValue })}
            />
            <DatePicker
              label="Thời gian kết thúc"
              value={dayjs(date.end)}
              defaultValue={dayjs(date.end)}
              onChange={(newValue) => setDate({ ...date, end: newValue })}
              sx={{
                backgroundColor: "white",
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title={[<p>Học viên mới </p>]}
              value={11.28}
              precision={2}
              valueStyle={{
                color: "#3f8600",
              }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title={[<p>Doanh thu </p>]}
              value={9.3}
              precision={2}
              valueStyle={{
                color: "#cf1322",
              }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <ChartBar></ChartBar>
      </Row>
    </div>
  );
};

export default Dashboard;
