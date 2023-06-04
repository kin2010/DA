import { Button, notification } from "antd";
import React from "react";
const close = () => {
  console.log(
    "Notification was closed. Either the close button was clicked or duration time elapsed."
  );
};
export const openNotification = ({ type, message }) => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      Confirm
    </Button>
  );
  notification[type]({
    message: "Notification ",
    description: message,
    btn: null,
    key,
    onClose: close,
  });
};
