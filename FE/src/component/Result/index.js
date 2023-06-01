import React from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
// or 'antd/dist/antd.less'
import { Typography } from "@mui/material";
export const Title = () => {
  return (
    <>
      <p>Học trọn gói chỉ với</p>
      <Typography color="#1890ff" fontSize={20} className="fw-bold">
        1.200.000 đồng
      </Typography>
    </>
  );
};
const Resultt = () => {
  return (
    <div>
      <Result
        icon={<SmileOutlined />}
        title={<Title />}
        extra={
          <Button type="primary" className="  align-center py-2 pb-2 px-4">
            MUA NGAY
          </Button>
        }
      />
    </div>
  );
};

export default Resultt;
