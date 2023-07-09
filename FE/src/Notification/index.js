import { Button, notification } from "antd";
import React from "react";
const close = () => {
  //
};
export const openNotification = ({ type, message }) => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      Confirm
    </Button>
  );
  notification[type]({
    message: "Thông báo  ",
    description: message,
    btn: null,
    key,
    onClose: close,
  });
};
