import { SearchOutlined } from "@ant-design/icons";
import {
  Col,
  Divider,
  Empty,
  Input,
  Pagination,
  Row,
  Space,
  Table,
} from "antd";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useQuery } from "@tanstack/react-query";
import { adminGetAllCategory, getAllOrder } from "../../../hook/LessionHook";
import { format } from "date-fns";
import { Avatar, Button } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import IconBreadcrumbs from "../BreadCrumb";
import ManageCategoryGroup from "./ManagerCategroup";
const ManagerCategory = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [queryparams, setQueryparams] = useState({
    // limit: 10,
    // skip: 10 * (page - 1),
  });
  const { data: categories } = useQuery(
    ["admin_category", queryparams],
    adminGetAllCategory
  );
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [data, setData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState();
  const [open, setOpen] = useState(false);

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
          group: order?.group?.name,
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
      title: "Thuộc nhóm",
      dataIndex: "group",
      key: "group",
      ...getColumnSearchProps("group"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
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
          {/* <span
            className="me-2"
            onClick={() => {
              setSelectedOrder(order);
              setOpen(true);
            }}
          >
            <RemoveRedEyeIcon color="primary" />
          </span> */}
          <span>
            <DeleteIcon color="error" />
          </span>
        </>
      ),
    },
  ];
  return (
    <>
      <Dialog
        maxWidth={1000}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Chi tiết hóa đơn"}</DialogTitle>
        <DialogContent>
          <strong> Người đặt :</strong>
          {!!selectedOrder && (
            <>
              <Row>
                <Col xs={6}>
                  <div className="d-flex align-items-center mt-2">
                    <Avatar
                      alt="User"
                      src={selectedOrder?.user?.avatar}
                      //   sx={{ width: 90, height: 90 }}
                    />
                    <h6 className="ms-5">{selectedOrder?.user?.fullName}</h6>
                  </div>
                </Col>
              </Row>
              <div className="mt-2">
                <strong>Tổng thanh toán : </strong>
                {selectedOrder?.total || 0}₫{" "}
              </div>
              <div className="mt-2">
                <strong> Ngày mua : </strong>
                {format(new Date(selectedOrder?.createdAt), "yyyy-MM-dd hh:mm")}
              </div>
            </>
          )}
          <Divider />
          <div>
            {!!selectedOrder?.courses?.length ? (
              selectedOrder?.courses?.map((cart) => (
                <div key={cart?._id}>
                  <div className="card-courses-list bookmarks-bx">
                    <div
                      className="card-courses-media"
                      style={{
                        width: "60px",
                        height: "60px",
                        minWidth: "60px",
                      }}
                    >
                      <img
                        src={cart?.thumbnai || "../images/course.jpg"}
                        alt=""
                      />
                    </div>
                    <div className="card-courses-full-dec">
                      <div className="card-courses-title">
                        <h4 className="m-b5">{cart?.name}</h4>
                      </div>
                      <div className="card-courses-list-bx">
                        <ul className="card-courses-view">
                          <li className="card-courses-categories">
                            <h5>Thể loại</h5>
                            <h4>{cart?.category}</h4>
                          </li>
                          <li className="card-courses-review">
                            <h5>3 Review</h5>
                            <ul className="cours-star">
                              <li className="active">
                                <i className="fa fa-star" />
                              </li>
                              <li className="active">
                                <i className="fa fa-star" />
                              </li>
                              <li className="active">
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                              <li>
                                <i className="fa fa-star" />
                              </li>
                            </ul>
                          </li>
                          <li className="card-courses-price">
                            <del>{cart?.discount || 0}₫</del>
                            {cart?.price && (
                              <h5 className="text-primary m-b0">
                                {cart?.price}₫
                              </h5>
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Empty></Empty>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} autoFocus>
            Thoát
          </Button>
        </DialogActions>
      </Dialog>
      <IconBreadcrumbs />
      <h4> Quản lí thể loại</h4>
      <Table
        columns={columns}
        dataSource={data}
        pagination={<Pagination defaultCurrent={6} total={500} />}
      />
      <ManageCategoryGroup />
    </>
  );
};
export default ManagerCategory;
