import { SearchOutlined } from "@ant-design/icons";
import {
  Col,
  Divider,
  Empty,
  Input,
  Pagination,
  Popconfirm,
  Space,
  Table,
} from "antd";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCategory,
  addCategoryGroup,
  adminGetAllCategory,
  adminGetAllCategoryGroup,
  deleteDocument,
  getAllOrder,
  getAllUSer,
} from "../../../hook/LessionHook";
import { format } from "date-fns";
import { Avatar, Button, MenuItem, Select, Typography } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import IconBreadcrumbs from "../BreadCrumb";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Formik, useFormik, useFormikContext } from "formik";
import FormControl from "../../../component/FormControl";
import {
  createAssignmentSchema,
  createCategorySchema,
  createScheduleSchema,
} from "../../../Validation/CourseCreate";
import { openNotification } from "../../../Notification";
import InputLabel from "@mui/material/InputLabel";
import EditIcon from "@mui/icons-material/Edit";
const MangerUser = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [queryparams, setQueryparams] = useState({
    // limit: 10,
    // skip: 10 * (page - 1),
  });
  const queryClient = useQueryClient();
  const { data: users } = useQuery(["users"], getAllUSer);

  const { data: categorygroup } = useQuery(
    ["admin_category_group", queryparams],
    adminGetAllCategoryGroup
  );
  // const { data: categroups } = useQuery(
  //   ["admin_category_group", queryparams],
  //   adminGetAllCategoryGroup
  // );
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [group, setCategoryGroup] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  useEffect(() => {
    if (!!users?.user?.length) {
      const dt = users?.user?.map((order) => {
        return {
          id: order?._id,
          fullName: order?.fullName,
          email: order?.email,
          avatar: order?.avatar || "../images/user.jpg",
          role:
            order?.role?.roleName === "Student"
              ? "Học viên"
              : order?.role?.roleName === "Teacher"
              ? "Giảng viên"
              : "Quản trị",
          action: order,
        };
      });
      setData(dt);
    }
  }, [users]);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Tên ",
      dataIndex: "fullName",
      key: "fullName",
      width: "20%",
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "avatar",
      dataIndex: "avatar",
      key: "avatar",
      ...getColumnSearchProps("avatar"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      render: (order) => (
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "100rem",
            overflow: "hidden",
          }}
        >
          <img src={order} alt="img" />
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      ...getColumnSearchProps("role"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Thao tác  ",
      dataIndex: "action",
      key: "action",
      ...getColumnSearchProps("action"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      render: (order) => (
        <>
          <EditIcon color="success" />
          <Popconfirm
            className="ms-2"
            title="Xác nhận"
            description="Bạn chắc chắn muốn xóa ?"
            onConfirm={() => handleRemove(order?._id)}
            onOpenChange={() => console.log("open change")}
          >
            <span>
              <RemoveRedEyeIcon color="error" />
            </span>
          </Popconfirm>
        </>
      ),
    },
  ];
  const handleSubmit = async (value) => {
    const res = await addCategory({
      ...value,
    });
    if (res?._id) {
      openNotification({
        type: "success",
        message: "Thêm thành công",
      });
      queryClient.invalidateQueries(["admin_category", queryparams]);
    }
    handleClose();
  };

  const handleRemove = async (id) => {
    const res = await deleteDocument({
      id: id,
      type: "category",
    });
    if (res?.deletedCount === 1) {
      openNotification({
        type: "success",
        message: "Xóa thành công",
      });
      setTimeout(() => {
        queryClient.invalidateQueries(["admin_category", queryparams]);
      }, 2000);
    }
  };

  const SelectGroup = () => {
    const { setFieldValue, errors } = useFormikContext();

    const handleChange = (e) => {
      setFieldValue("group", e.target.value);
    };
    return (
      <>
        <Select
          fullWidth
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select"
          value={group}
          label="Age"
          onChange={handleChange}
        >
          {categorygroup?.map((cate) => (
            <MenuItem value={cate?._id}>{cate?.name}</MenuItem>
          ))}
        </Select>
        {errors["group"] && <div className="feedback">{errors["group"]}</div>}
      </>
    );
  };
  return (
    <>
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={createCategorySchema}
        onSubmit={(value) => handleSubmit(value)}
      >
        {(props) => (
          <Dialog
            maxWidth={1000}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Thêm nhóm thể loại"}
            </DialogTitle>
            <form onSubmit={props.handleSubmit}>
              <DialogContent>
                <FormControl label={"Tên thể loại"} name={"name"}></FormControl>
                <label className="col-form-label">Thể loại thuộc nhóm :</label>

                <SelectGroup />
              </DialogContent>
              <DialogActions>
                <Button variant="outlined" onClick={handleClose} autoFocus>
                  Thoát
                </Button>
                <Button variant="contained" type="submit" autoFocus>
                  Thêm
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        )}
      </Formik>
      <IconBreadcrumbs title={"Thể loại"} />
      <Typography variant="h5" className="mb-5" color="primary">
        Quản lí Người dùng
      </Typography>
      <Table
        columns={columns}
        dataSource={data}
        pagination={<Pagination defaultCurrent={6} total={500} />}
      />
    </>
  );
};
export default MangerUser;
