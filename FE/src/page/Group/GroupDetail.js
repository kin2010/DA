/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Avatar,
  Col,
  List,
  Result,
  Row,
  Input,
  Form,
  Comment,
  Tooltip,
  Empty,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
// or 'antd/dist/antd.less'
import { Button, Divider, Menu, MenuItem, Typography } from "@mui/material";
import "../../component/index.css";
import HeaderAppBar from "../Header/AppBar";
import { Container } from "react-bootstrap";
import {
  createMeeting,
  getGroupById,
  getUserData,
  useGroupService,
} from "../../hook/LessionHook";
import socketIOClient from "socket.io-client";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import EditorCommon from "../../component/EdittorCommon/EdittorCommon";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { format, isAfter } from "date-fns";
import { URL } from "../../Context/constant";
import ReorderIcon from "@mui/icons-material/Reorder";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { PRIMARY } from "../../Constant/app";
import MeetingAdd from "./MeetingAdd";
// import { Comment } from "antd";
const host =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3333"
    : process.env.REACT_APP_API_URL;

const { TextArea } = Input;

const GroupDetail = () => {
  const { id } = useParams();
  const groupServive = useGroupService();
  const { data } = useQuery(["group_detail", id], getGroupById);
  const queryClient = useQueryClient();
  const { data: userData } = useQuery(["user"], getUserData);
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState("");
  const [msg, setMsg] = useState([]);
  const [onlines, setOnlines] = useState([]);
  const socketRef = useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const groupServices = useGroupService();
  const [meetings, setMeetings] = useState([]);

  const [contents, setContents] = useState([]);
  const [openMtg, setOpenMtg] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.target);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    setUsers(
      data?.course?.users?.map((user) => {
        return {
          ...user,
          online: !!onlines?.find((online) => online === user?._id),
        };
      })
    );
    setMsg(data?.chats || []);
    setMeetings(data?.meetings || []);
  }, [data, onlines]);

  const handleChat = (data) => {
    console.log(2, data);
    setMsg(data?.newMsg || []);
    //
  };

  const handleExit = (data) => {
    setOnlines(data?.onlines || []);
  };
  const handleJoin = (data) => {
    setOnlines(data?.onlines || []);
  };

  useEffect(() => {
    const msgData = msg?.map((msg) => {
      return {
        type: "msg",
        time: new Date(msg?.time),
        data: msg,
      };
    });
    const meetingData = meetings?.map((mtg) => {
      return {
        type: "meeting",
        time: new Date(mtg?.createdAt),
        data: mtg,
      };
    });
    const combinedData = [...msgData, ...meetingData];
    combinedData?.sort((a, b) => (isAfter(a?.time, b?.time) ? 1 : -1));
    setContents(combinedData || []);
    console.log(combinedData, 3);
  }, [msg, meetings]);

  useEffect(() => {
    if (!!userData?.user) {
      const socket = socketIOClient(host, {
        query: {
          userId: userData?.user?._id || "",
          group: id,
        },
      });
      socketRef.current = socket;
      socket.on("group_chat", handleChat);
      socket.on("group_exit", handleExit);
      socket.on("group_join", handleJoin);
      socket.emit("group_join", {
        userId: userData?.user?._id,
        group: id,
      });
    }
    return () => {
      socketRef.current?.off("group_chat", handleChat);
      socketRef.current?.off("group_exit", handleExit);
      socketRef.current?.off("group_join", handleJoin);
    };
  }, [userData]);

  const onChange = (e) => {
    setValue(e?.target?.value, 33);
  };

  const onSubmit = () => {
    if (socketRef?.current) {
      let data = {
        group: id,
        msg: value,
        sender: userData?.user?._id,
      };
      socketRef?.current?.emit("group_chat", data);
    }
    setValue("");
  };

  const handleMeetingNow = async () => {
    // const params = {
    //   group: id,
    //   createdby: userData?.user?._id,
    // };
    // const res = await groupServices.addMeeting(params);
    // console.log(res);
    // if (res?.meeting?._id) {
    //   setTimeout(() => {
    //     window?.open(URL + "/meeting/" + res?.meeting?._id);
    //   }, 2000);
    // }
    setOpenMtg(true);
    handleClose();
  };

  return (
    <>
      <MeetingAdd
        group={id}
        user={userData?.user?._id}
        open={openMtg}
        setOpen={setOpenMtg}
      ></MeetingAdd>
      <HeaderAppBar></HeaderAppBar>

      <Row>
        <Container>
          <Row>
            <h3 className="mt-3">{data?.name}</h3>
          </Row>
          <div
            className="d-flex justify-content-end"
            style={{
              position: "sticky",
              top: "40px",
              zIndex: 9999,
            }}
          >
            <Button
              endIcon={<KeyboardArrowDownIcon />}
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              variant="contained"
            >
              Meeting
            </Button>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              anchorPosition={{
                top: 400,
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={handleMeetingNow}>Meeting ngay</MenuItem>
              <MenuItem onClick={handleClose}>Lên lịch</MenuItem>
            </Menu>
          </div>
          <Row>
            <Col className="w-25 border-primary  border-left-1">
              <Typography
                fontSize={16}
                className="fw-bold mt-3"
                color="#1976d2"
              >
                Danh sách :
              </Typography>
              <Divider style={{ color: "#1976d2", height: "2px" }}></Divider>
              <List
                style={{ padding: "10px" }}
                itemLayout="horizontal"
                dataSource={users}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item?.user} />}
                      title={[
                        <div className="d-flex align-items-center">
                          <a href="https://ant.design">{item?.fullName}</a>{" "}
                          <div className="ms-3 text-primary d-flex align-items-center">
                            <span
                              style={{
                                width: "10px",
                                height: "10px",
                                background: item?.online ? "green" : "gray",
                                borderRadius: "100em",
                                display: "inline-block",
                                marginRight: "5px",
                              }}
                            ></span>
                            {item?.online ? "online" : "offine"}
                          </div>
                        </div>,
                      ]}
                      description={item?.email}
                    />
                  </List.Item>
                )}
              />
            </Col>
            <Col style={{ width: "72%" }}>
              <div className="mt-5 content" style={{ background: "#61616105" }}>
                {!!contents?.length ? (
                  contents?.map((content) =>
                    content?.type === "msg" ? (
                      <>
                        <div
                          key={content?.data?._id}
                          className={`${
                            content?.data?.user?._id === userData?.user?._id
                              ? "mychat"
                              : "otherchat"
                          } mt-2  mb-4`}
                          style={{
                            // background: "#61616120",
                            padding: "10px",
                            borderRadius: "10px",
                            boxShadow: " -3px -3px 9px 1px rgba(0,0,0,0.31)",
                          }}
                        >
                          <Comment
                            author={
                              <a
                                href="#"
                                // className="link"
                                style={{
                                  color: PRIMARY,
                                  fontSize: "16px",
                                  fontWeight: "700",
                                }}
                              >
                                {content?.data?.user?.fullName}
                              </a>
                            }
                            avatar={
                              <Avatar
                                src={content?.data?.user?.fullName || ""}
                                alt="Han Solo"
                              />
                            }
                            content={<p>{content?.data?.msg}</p>}
                            datetime={
                              <Tooltip
                                title={format(
                                  new Date(content?.data?.time),
                                  "yyyy-dd-mm hh:mm"
                                )}
                              >
                                <span>
                                  {format(
                                    new Date(content?.data?.time),
                                    "yyyy-dd-mm hh:mm"
                                  )}
                                </span>
                              </Tooltip>
                            }
                          />
                          <Divider />
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            width: "100%",
                            border: "0.5px solid #12121220",
                            background: "white",
                            padding: "15px",
                            marginTop: "30px",
                            marginBottom: "30px",
                            boxShadow: " -3px -3px 9px 1px rgba(0,0,0,0.31)",
                            position: "relative",
                            paddingBottom: "60px",
                          }}
                        >
                          <div
                            className="d-flex align-items-center  col-12"
                            style={{
                              borderBottom: "0.5px solid #12121220",
                              background: "white",
                              paddingBottom: "15px",
                            }}
                          >
                            <VideoCallIcon
                              style={{ fontSize: "30px" }}
                              className="me-4"
                              color="primary"
                            />
                            <Typography fontWeight={600} fontSize={14}>
                              {content?.data?.name
                                ? "Meeting: " + content?.data?.name
                                : "Meeting: Cuộc hội thoại Group"}
                            </Typography>
                            <div
                              className="d-flex align-items-center"
                              style={{ gap: "0 10px", marginLeft: "auto" }}
                            ></div>
                          </div>
                          <Divider></Divider>
                          <div className="py-2">
                            <div
                              key={content?.data?._id}
                              className={`${"mychat"} mt-2 mb-4`}
                              style={{
                                padding: "10px",
                                borderRadius: "10px",
                                // boxShadow:
                                //   " -3px -3px 9px 1px rgba(0,0,0,0.31)",
                              }}
                            >
                              <Comment
                                author={
                                  <a
                                    style={{
                                      color: PRIMARY,
                                      fontSize: "16px",
                                      fontWeight: "700",
                                    }}
                                  >
                                    {content?.data?.createdby?.fullName}
                                  </a>
                                }
                                avatar={
                                  <Avatar
                                    src={
                                      content?.data?.createdby?.fullName || ""
                                    }
                                    alt="Han Solo"
                                  />
                                }
                                content={<p>Đã bắt đầu một buổi họp</p>}
                                datetime={
                                  <Tooltip
                                    title={format(
                                      new Date(content?.data?.time),
                                      "yyyy-dd-mm hh:mm"
                                    )}
                                  >
                                    <span>
                                      {format(
                                        new Date(content?.data?.time),
                                        "yyyy-dd-mm hh:mm"
                                      )}
                                    </span>
                                  </Tooltip>
                                }
                              />
                              <Divider />
                              <div
                                style={{
                                  position: "absolute",
                                  bottom: "30px",
                                }}
                              >
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    window.open(
                                      URL + "/meeting/" + content?.data?._id
                                    );
                                  }}
                                >
                                  Tham gia
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  )
                ) : (
                  <>
                    {" "}
                    <Result
                      status="403"
                      title="Chưa có hoạt động nào"
                      subTitle="Tham gia trao đổi với mọi người trong group ~"
                      extra={<Button type="primary">Trang chủ</Button>}
                    />
                  </>
                )}

                {/* <EditorCommon></EditorCommon> */}
              </div>
              <div className="mt-3">
                {" "}
                <Form.Item>
                  <TextArea
                    placeholder="Nhập bình luận ..."
                    rows={4}
                    onChange={onChange}
                    value={value}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    variant="contained"
                    htmlType="submit"
                    onClick={onSubmit}
                    type="primary"
                  >
                    Bình luận
                  </Button>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Container>

        <Col style={{ width: "3%" }}></Col>
      </Row>
    </>
  );
};
export default GroupDetail;
