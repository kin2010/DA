/* eslint-disable no-unused-vars */
import { SearchOutlined } from "@ant-design/icons";
import {
  Col,
  Divider,
  Empty,
  Input,
  Pagination,
  Popconfirm,
  Row,
  Select,
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
  updateCategoryGroup,
} from "../../../hook/LessionHook";
import { format } from "date-fns";
import { Avatar, Button, Typography } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import IconBreadcrumbs from "../BreadCrumb";
import { Formik, useFormikContext } from "formik";
import { createAssignmentSchema } from "../../../Validation/CourseCreate";
import FormControl from "../../../component/FormControl";
import { openNotification } from "../../../Notification";
import EditIcon from "@mui/icons-material/Edit";
const ManageCategoryGroup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [queryparams, setQueryparams] = useState({
    // limit: 10,
    // skip: 10 * (page - 1),
  });
  const { data: categories } = useQuery(
    ["admin_category_group", queryparams],
    adminGetAllCategoryGroup
  );
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [data, setData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState();
  const [open, setOpen] = useState(false);
  const [updateId, setUpdateId] = useState("");
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
    if (!!categories?.length) {
      const dt = categories?.map((order) => {
        return {
          id: order?._id,
          name: order?.name,
          createdAt: format(new Date(order?.createdAt), "yyyy-MM-dd hh:mm"),
          action: order,
        };
      });
      setData(dt);
    }
  }, [categories]);

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
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "5%",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Tên thể loại",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      ...getColumnSearchProps("createdAt"),
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
          <EditIcon
            color="success"
            onClick={() => {
              setOpen(true);
              setUpdateId(order?._id);
            }}
          />
          <Popconfirm
            className="ms-2"
            title="Xác nhận"
            description="Bạn chắc chắn muốn xóa ?"
            onConfirm={() => handleRemove(order?._id)}
            onOpenChange={() => console.log("open change")}
          >
            <span>
              <DeleteIcon color="error" />
            </span>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleSubmit = async (value) => {
    let res = "";
    if (!updateId) {
      res = await addCategoryGroup({
        ...value,
      });
    } else {
      const params = {
        ...value,
        id: updateId,
      };
      res = await updateCategoryGroup({
        ...params,
      });
    }

    if (res?._id) {
      openNotification({
        type: "success",
        message: "Thêm thành công",
      });
      queryClient.invalidateQueries(["admin_category_group", queryparams]);
    }
    handleClose();
  };

  const handleRemove = async (id) => {
    const res = await deleteDocument({
      id: id,
      type: "category-group",
    });
    if (res?.deletedCount === 1) {
      openNotification({
        type: "success",
        message: "Xóa thành công",
      });
      setTimeout(() => {
        queryClient.invalidateQueries(["admin_category_group", queryparams]);
      }, 2000);
    }
  };

  const Content = () => {
    const { handleSubmit, setValues } = useFormikContext();
    useEffect(() => {
      if (!!updateId) {
        const order = categories?.find(
          (category) => category?._id === updateId
        );
        setValues({
          name: order?.name,
        });
      } else {
        setValues({
          name: "",
        });
      }
    }, [updateId]);
    return (
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <strong> Người đặt :</strong>
          <FormControl label={"Tên thể loại"} name={"name"}></FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} autoFocus>
            Thoát
          </Button>
          <Button variant="contained" type="submit" autoFocus>
            {!!updateId ? "Cập nhật" : "Thêm"}
          </Button>
        </DialogActions>
      </form>
    );
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={createAssignmentSchema}
        onSubmit={(value) => handleSubmit(value)}
      >
        {(props) => (
          <Dialog
            maxWidth={1000}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            style={{ width: "601px", margin: "0 auto" }}
          >
            <DialogTitle id="alert-dialog-title">
              {"Thêm nhóm thể loại"}
            </DialogTitle>
            <Content />
          </Dialog>
        )}
      </Formik>
      <Typography variant="h5" className="mb-5" color="primary">
        Quản lí Nhóm thể loại
      </Typography>
      <Button
        className="mb-3"
        variant="contained"
        onClick={() => {
          setOpen(true);
          setUpdateId("");
        }}
        autoFocus
      >
        Thêm
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        pagination={<Pagination defaultCurrent={6} total={500} />}
      />
    </>
  );
};
export default ManageCategoryGroup;
