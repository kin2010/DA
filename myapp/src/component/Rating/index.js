import React from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "../../index.css";
import { Rate } from "antd";
const Ratee = ({ value, count }) => {
  return (
    <>
      <Rate defaultValue={3} value={value} />
      <span className="ant-rate-text"> lượt đánh giá</span>
      <br />
    </>
  );
};

export default Ratee;
