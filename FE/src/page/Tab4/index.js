/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import VirtualList from "rc-virtual-list";
import { Avatar, Checkbox, List, Modal } from "antd";
import { getByRole, updateCourse } from "../../hook/LessionHook";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import {
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Form, Radio, Space, Switch, Table } from "antd";
import User from "../../component/User";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import { useParams } from "react-router-dom";
import { AppContextProvider } from "../../Context/AppContext";
const { Column, ColumnGroup } = Table;
export default function Tab4({ ids }) {
  const [allUser, setAlluser] = useState([]);
  const [resUser, setResUser] = useState([]);
  const [student, setStudent] = useState([]);
  const [checked, setChecked] = React.useState([1]);
  const [selectionType, setSelectionType] = useState("checkbox");
  const { id } = useParams();
  const [modalData, setModalData] = useState([]);
  const { openNotification } = React.useContext(AppContextProvider);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const getAllTeachers = async () => {
    const params = {
      role: "teacher",
    };
    const params2 = {
      role: "Student",
    };
    const res = await getByRole();
    const res2 = await getByRole(params2);

    setStudent(res2?.users || []);
    const data = [];
    console.log(res);
    res?.users?.map((user) => {
      data.push({
        key: user?._id,
        name: <User user={user} status={false}></User>,
        email: user?.email || "",
        role: user?.role?.roleName || "",
        enrolled: user?.enrolled || false,
        description: ``,
      });
    });
    setResUser(res?.users || []);
    setAlluser(data || []);
  };

  useEffect(() => {
    getAllTeachers();
  }, []);

  useEffect(() => {}, [allUser]);

  const addUser = async () => {
    // const params = {
    //   id: id,
    //   body: {
    //     users: selectedIds,
    //   },
    // };
    // const res = await updateCourse(params);
    // console.log(res, selectedIds, "updated course");
    setOpen(true);
  };

  const removeUser = async () => {
    const params = {
      id: id,
      body: {
        users: selectedIds,
      },
    };
    const res = await updateCourse(params);
    console.log(res, params, "updated course");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Role",
      dataIndex: "role",
      filters: [
        {
          text: "Teacher",
          value: "Teacher",
        },
        {
          text: "Student",
          value: "Student",
        },
      ],
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    },
    {
      title: "Action",
      key: "action",
      sorter: true,
      render: () => (
        <Space size="middle">
          {/* <a>Delete</a>
          <a>
            <Space>
              More actions
              <DownOutlined />
            </Space>
          </a> */}
          <Space onClick={addUser}>
            <PersonAddAlt1Icon color="success"></PersonAddAlt1Icon>
            Enroll
          </Space>
          <Space onClick={removeUser}>
            <PersonAddDisabledIcon color="error"></PersonAddDisabledIcon>
            Remove
          </Space>
        </Space>
      ),
    },
  ];

  const defaultExpandable = {
    expandedRowRender: (record) => <p>{record.description}</p>,
  };
  const defaultTitle = () => "Here is title";
  const defaultFooter = () => "Here is footer";
  const [bordered, setBordered] = useState(true);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState("large");
  const [expandable, setExpandable] = useState(defaultExpandable);
  const [showTitle, setShowTitle] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showfooter, setShowFooter] = useState(true);
  const [rowSelection, setRowSelection] = useState({});
  const [hasData, setHasData] = useState(true);
  const [tableLayout, setTableLayout] = useState();
  const [top, setTop] = useState("none");
  const [bottom, setBottom] = useState("bottomRight");
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState();
  const [selectedIds, setSelectedIds] = useState([]);
  const [open, setOpen] = useState(false);
  const handleBorderChange = (enable) => {
    setBordered(enable);
  };
  const handleLoadingChange = (enable) => {
    setLoading(enable);
  };
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  const handleTableLayoutChange = (e) => {
    setTableLayout(e.target.value);
  };
  const handleExpandChange = (enable) => {
    setExpandable(enable ? defaultExpandable : undefined);
  };
  const handleEllipsisChange = (enable) => {
    setEllipsis(enable);
  };
  const handleTitleChange = (enable) => {
    setShowTitle(enable);
  };
  const handleHeaderChange = (enable) => {
    setShowHeader(enable);
  };
  const handleFooterChange = (enable) => {
    setShowFooter(enable);
  };
  const handleRowSelectionChange = (vl) => {
    // setRowSelection(enable ? {} : undefined);
    console.log(vl);
    setSelectedIds(vl);
  };
  const handleYScrollChange = (enable) => {
    setYScroll(enable);
  };
  const handleXScrollChange = (e) => {
    setXScroll(e.target.value);
  };
  const handleDataChange = (newHasData) => {
    setHasData(newHasData);
  };
  const scroll = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = "100vw";
  }
  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis,
  }));
  if (xScroll === "fixed") {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = "right";
  }
  const tableProps = {
    bordered,
    loading,
    size,
    expandable,
    title: showTitle ? defaultTitle : undefined,
    showHeader,
    footer: showfooter ? defaultFooter : undefined,
    rowSelection,
    scroll,
    tableLayout,
  };
  const handleOk = async () => {
    const params = {
      id: id,
      body: {
        users: selectedIds,
      },
    };
    const res = await updateCourse(params);
    if (res?.status === 200) {
      openNotification({
        message: "Thêm thành viên thành công",
        status: 200,
      });
      setOpen(false);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    const users = resUser?.filter((user) => selectedIds?.includes(user?._id));
    setModalData(users);
  }, [selectedIds]);

  return (
    <>
      <h4 className="mb-5">Thành viên : </h4>
      <Modal
        title="Thêm thành viên"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        className="confirm_modal"
      >
        <h6>Những thành viên sau sẽ được thêm vào khóa học :</h6>

        <div
          style={{
            overflowY: "auto",
            maxHeight: "400px",
          }}
        >
          {modalData?.map((user) => (
            <User user={user} status={false}></User>
          ))}
        </div>
      </Modal>
      <Table
        {...tableProps}
        pagination={{
          position: [top, bottom],
        }}
        columns={tableColumns}
        dataSource={hasData ? allUser : []}
        scroll={scroll}
        rowSelection={{
          onChange: handleRowSelectionChange,
          selectedRowKeys: selectedIds,
        }}
      />
    </>
  );
  return (
    <>
      <div>
        <Divider />
      </div>
      {/* <Form.Label className=" labell">Teachers :</Form.Label>
      {!!teacher?.length && (
        <List>
          <VirtualList
            unselectable="off"
            data={teacher}
            height={400}
            itemHeight={47}
            itemKey="email"
          >
            {(item) => (
              <>
                <List.Item key={item?.email}>
                  <List.Item.Meta
                    avatar={<Avatar src={item?.picture?.large} />}
                    title={<a href="https://ant.design">{item?.fullName}</a>}
                    description={item?.email}
                  />
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(item?._id)}
                    checked={checked.indexOf(item?._id) !== -1}
                    //   inputProps={ "aria-labelledby" }
                  />
                </List.Item>
              </>
            )}
          </VirtualList>
        </List>
      )}{" "}
      <Form.Label className="mt-3 labell">Students :</Form.Label>
      <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
        {!!student?.length && (
          <List>
            <VirtualList
              unselectable="off"
              data={teacher}
              height={400}
              itemHeight={47}
              itemKey="email"
            >
              {(item) => (
                <>
                  <List.Item key={item?.email}>
                    <List.Item.Meta
                      avatar={<Avatar src={item?.picture?.large} />}
                      title={<a href="https://ant.design">{item?.fullName}</a>}
                      description={item?.email}
                    />
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(item?._id)}
                      checked={checked.indexOf(item?._id) !== -1}
                      //   inputProps={ "aria-labelledby" }
                    />
                  </List.Item>
                </>
              )}
            </VirtualList>
          </List>
        )}
      </List> */}
    </>
  );
}
