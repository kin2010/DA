import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContextProvider } from "../../../Context/AuthContext";
import { Input, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
import "./index.css";
import { Button } from "@mui/material";
import User from "../../../component/User";
export const ChatMessage = (props) => {
  const { message, setMessages } = props;
  const { user } = useContext(AuthContextProvider);
  return (
    <div className="member-pannel pannel">
      <h4>Trò chuyện :</h4>
      <div id="chat-pane">
        <div className="chat-messages">
          {message?.map((item) => (
            <div
              key={item?._id}
              className={`msg ${
                user?._id === item?.user?._id ? "msg-local" : "msg-remote"
              }`}
            >
              <User
                time={item?.time}
                message={item?.msg}
                status={false}
                user={item?.user}
                size={30}
              />
            </div>
          ))}
        </div>
        <div className="pannel-form">
          <Space direction="horizontal">
            <TextArea
              onChange={(e) => {
                console.log("chamnge", e.target?.value);
              }}
              id="chat-input"
              defaultValue={""}
              showCount
              maxLength={100}
            ></TextArea>
            <Button id="meeting_chat_btn" variant="contained">
              Gởi
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};
export default ChatMessage;
