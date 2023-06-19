import React from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import IconBreadcrumbs from "./BreadCrumb";
import { ChartBar } from "./Chart/Chart";
const Dashboard = () => {
  return (
    <div>
      <IconBreadcrumbs />
      <h4>Tổng quan :</h4>
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
