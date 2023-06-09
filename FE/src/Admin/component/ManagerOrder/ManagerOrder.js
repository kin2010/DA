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
import IconBreadcrumbs from "../BreadCrumb";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteDocument, getAllOrder } from "../../../hook/LessionHook";
import { format } from "date-fns";
import { Avatar, Button, Chip, Rating } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link, useNavigate } from "react-router-dom";
import { getCourseRating, getDiscount } from "../../../ultis/course";
import { openNotification } from "../../../Notification";
const ManagerOrder = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [queryparams, setQueryparams] = useState({
    // limit: 10,
    // skip: 10 * (page - 1),
  });
  const { data: orders } = useQuery(["orders", queryparams], getAllOrder);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [data, setData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
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
    if (!!orders?.data?.length) {
      const dt = orders?.data?.map((order) => {
        return {
          id: order?._id?.slice(0, 10) + "...",
          user: order?.user,
          price: order?.total?.toLocaleString("en-US") + " vnđ",
          status: order?.isPaid,
          createdAt: format(new Date(order?.createdAt), "yyyy-MM-dd hh:mm"),
          action: order,
        };
      });
      setData(dt);
    }
  }, [orders]);

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
      title: "ID Hóa đơn",
      dataIndex: "id",
      key: "id",
      width: "5%",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Người đặt",
      dataIndex: "user",
      key: "user",
      width: "20%",
      ...getColumnSearchProps("user"),
      render: (user) => {
        return (
          <div className="d-flex align-items-center">
            <Avatar src={user?.avatar || "../images/user.jpg"} alt="" />
            <p className="ms-2">{user?.fullName}</p>
          </div>
        );
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "price",
      key: "price",
      ...getColumnSearchProps("price"),
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      render: (status) => {
        return (
          <>
            <Chip
              color={status ? "primary" : "warning"}
              label={status ? "Đã thanh toán" : "Chưa thanh toán"}
            />
          </>
        );
      },
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
          <span
            className="me-2"
            onClick={() => {
              setSelectedOrder(order);
              setOpen(true);
            }}
          >
            <RemoveRedEyeIcon color="primary" />
          </span>
          <span
            onClick={() => {
              setRemoveOpen(true);
              setIdRemove(order?._id);
            }}
          >
            <DeleteIcon color="error" />
          </span>
        </>
      ),
    },
  ];
  const [removeOpen, setRemoveOpen] = useState(false);
  const [idRemove, setIdRemove] = useState("");
  const handleDeleteClose = () => {
    setRemoveOpen(false);
  };

  const handleRemove = async (id) => {
    const res = await deleteDocument({
      id: id,
      type: "order",
    });
    if (res?.deletedCount === 1) {
      openNotification({
        type: "success",
        message: "Xóa thành công",
      });
      setTimeout(() => {
        queryClient.invalidateQueries(["orders", queryparams]);
      }, 1000);
    }
    setRemoveOpen(false);
  };
  return (
    <>
      <Dialog
        open={removeOpen}
        onClose={handleDeleteClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Xác nhận xóa"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn chắc chắn là muốn xóa không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Quay lại
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleRemove(idRemove)}
            autoFocus
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
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
                {selectedOrder?.total?.toLocaleString("en-US") || 0} ₫
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
                        src={
                          !!cart?.thumbnail?.length
                            ? cart?.thumbnail[0]
                            : "../images/course.jpg"
                        }
                        alt=""
                      />
                    </div>
                    <div className="card-courses-full-dec">
                      <div className="card-courses-title">
                        <h4 className="m-b5">
                          <Link to={`/course/${cart?._id}`}>{cart?.name}</Link>
                        </h4>
                      </div>
                      <div className="card-courses-list-bx">
                        <ul className="card-courses-view">
                          <li className="card-courses-categories">
                            <h5>Thể loại</h5>
                            <h4>{cart?.category?.name}</h4>
                          </li>
                          <li className="card-courses-review">
                            <h5>{cart?.courses?.length || 0} Đánh giá</h5>
                            <Rating
                              readOnly
                              value={getCourseRating(cart?.courses?.comments)}
                            />
                          </li>
                          <li className="card-courses-price">
                            <del>{getDiscount(cart)}</del>
                            {cart?.price && (
                              <h5 className="text-primary m-b0">
                                {cart?.price?.toLocaleString("en-US")}₫
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
      <h4> Quản lí đơn hàng</h4>
      <Table
        columns={columns}
        dataSource={data}
        pagination={<Pagination defaultCurrent={6} total={500} />}
      />
    </>
  );
};
export default ManagerOrder;
