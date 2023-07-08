import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Col, Menu, Row } from "antd";
import React from "react";
import HeaderAppBar from "../page/Header/AppBar";
import { Outlet, useNavigate } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import HomeIcon from "@mui/icons-material/Home";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Dashboard", "sub1", <GridViewIcon />, [
    getItem(
      "",
      "g1",
      null,
      [
        getItem("Trang chủ", "1", <HomeIcon />),
        getItem("Quản lí khóa học", "2", <AutoStoriesIcon />),
        getItem("Quản lí đơn khóa học", "3", <CardGiftcardIcon />),
        getItem("Quản lí thể loại", "4", <AccountBoxIcon />),
        // getItem("Quản lí giảng viên", "5", <AccountBoxIcon />),
        getItem("Quản lí người dùng", "6", <PeopleAltIcon />),
        // getItem("Quản lí tố cáo", "7", <FlagCircleIcon />),
      ],
      "group"
    ),
  ]),
];
const Admin = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    switch (e.key) {
      case "1":
        navigate("/admin/home");
        break;
      case "2":
        navigate("/admin/course");
        break;
      case "3":
        navigate("/admin/order");
        break;
      case "4":
        navigate("/admin/category");
        break;
      case "5":
        navigate("/admin/category");
        // navigate("/admin/teacher");
        break;
      case "6":
        navigate("/admin/user");
        // navigate("/admin/user");
        break;

      default:
        navigate("/admin/home");
        break;
    }
  };
  return (
    <>
      <HeaderAppBar isAdmin></HeaderAppBar>
      <Row>
        <Col xs={6}>
          <Menu
            onClick={onClick}
            style={{
              width: "100%",
              height: "100%",
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
        </Col>
        <Col xs={18}>
          <div
            style={{
              padding: "50px",
              height: "100%",
            }}
          >
            <Outlet />
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Admin;
