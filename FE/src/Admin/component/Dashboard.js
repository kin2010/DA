import React, { useEffect, useMemo, useState } from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import IconBreadcrumbs from "./BreadCrumb";
import { ChartBar } from "./Chart/Chart";

import dayjs, { Dayjs } from "dayjs";
import {
  addMonths,
  differenceInDays,
  endOfMonth,
  startOfMonth,
} from "date-fns";
import { MenuItem, Select } from "@mui/material";
import { getRevenue } from "../../hook/LessionHook";
import { useQuery } from "@tanstack/react-query";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const Dashboard = () => {
  const [date, setDate] = useState(dayjs(new Date()));
  const [type, setType] = React.useState("year");
  const { data: revenue } = useQuery(
    [
      "revenue",
      {
        start: date,
        type: type,
      },
    ],
    getRevenue,
    {
      retry: false,
    }
  );
  const handleChange = (event) => {
    setType(event.target.value);
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    let arr = [];
    const data = revenue?.data || [];
    console.log(data, revenue, 2);
    if (type === "year") {
      for (let i = 0; i <= 11; i++) {
        arr.push({
          time: i + 1,
          value: data?.find((a) => a?.time === i + 1)?.total_price || 0,
        });
      }
    }
    if (type === "month") {
      for (
        let i = 0;
        i <
        Math.abs(
          differenceInDays(
            startOfMonth(new Date(date)),
            endOfMonth(new Date(date))
          )
        );
        i++
      ) {
        arr.push({
          time: i + 1,
          value: data?.find((a) => a?.time === i)?.total_price || 0,
        });
      }
    }
    setData(arr);
  }, [revenue, date, type]);

  const total = useMemo(() => {
    return !!revenue?.data?.length
      ? revenue?.data?.reduce((a, b) => {
          return a + b?.total_price || 0;
        }, 0)
      : 0;
  }, [revenue]);

  return (
    <div>
      <IconBreadcrumbs />
      <h4>Tổng quan :</h4>
      <div className="row">
        <div className="col-md-4 mb-2">
          <label className="col-form-label">Lọc theo:*</label>
          <br />
          <div>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Lọc bởi :"
              onChange={handleChange}
              style={{
                minWidth: "150px",
                paddingTop: "8px",
              }}
            >
              <MenuItem value={"year"}>Năm</MenuItem>
              <MenuItem value={"month"}>Tháng</MenuItem>
            </Select>
          </div>
        </div>
        <div className="col-md-8 mb-2">
          <label className="col-form-label">Thời gian:*</label>
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label={'"Tháng" và "Năm"'}
                views={["month", "year"]}
                // value={date}
                sx={{
                  backgroundColor: "white",
                }}
                defaultValue={dayjs(new Date())}
                onChange={(newValue) => setDate(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          </LocalizationProvider> */}
        </div>
      </div>

      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title={[<p>Người dùng mới </p>]}
              value={`${revenue?.count || 0} user`}
              precision={2}
              valueStyle={{
                color: "#3f8600",
              }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title={[<p>Doanh thu </p>]}
              value={`${total}`?.toLocaleString("en-US")}
              precision={2}
              valueStyle={{
                color: "#cf1322",
              }}
              prefix={<ArrowUpOutlined />}
              // prefix={<ArrowDownOutlined />}
              suffix="đồng"
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <ChartBar type={type} date={date} value={data}></ChartBar>
      </Row>
    </div>
  );
};

export default Dashboard;
