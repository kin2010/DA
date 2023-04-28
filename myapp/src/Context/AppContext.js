/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import ErrorIcon from "@mui/icons-material/Error";
export const AppContextProvider = createContext();
export const AppContext = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();
  const [userStream, setUserStream] = useState(null);
  const dess = (des) => {
    switch (des) {
      case "add":
        return "Create successfully";
      case "update":
        return "Update successfully";
      case "remove":
        return "Remove successfully";
      default:
        return des;
    }
  };
  const openNotification = (res, des) => {
    const { message, status } = res;
    api.open({
      message: "Notification!",
      description:
        message ||
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      icon:
        status === 200 ? (
          <SmileOutlined
            style={{
              color: "#108ee9",
            }}
          />
        ) : (
          <ErrorIcon
            style={{
              color: "rgb(235, 0, 20)",
            }}
          />
        ),
    });
  };
  const values = { openNotification, setUserStream, userStream };
  return (
    <AppContextProvider.Provider value={values}>
      {contextHolder}
      {children}
    </AppContextProvider.Provider>
  );
};
