import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import IconBreadcrumbs from "../BreadCrumb";
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Jim Green",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];
const ManagerTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "20%",
      ...getColumnSearchProps("age"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
  ];
  return (
    <>
      <IconBreadcrumbs />
      <h4> Quản lí khóa học</h4>
      <div className="card-courses-list admin-courses">
        <div className="card-courses-media">
          <img src="assets/images/courses/pic1.jpg" alt="" />
        </div>
        <div className="card-courses-full-dec">
          <div className="card-courses-title">
            <h4>Become a PHP Master and Make Money</h4>
          </div>
          <div className="card-courses-list-bx">
            <ul className="card-courses-view">
              <li className="card-courses-user">
                <div className="card-courses-user-pic">
                  <img src="assets/images/testimonials/pic3.jpg" alt="" />
                </div>
                <div className="card-courses-user-info">
                  <h5>Teacher</h5>
                  <h4>Keny White</h4>
                </div>
              </li>
              <li className="card-courses-categories">
                <h5>3 Categories</h5>
                <h4>Backend</h4>
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
              <li className="card-courses-stats">
                <a href="#" className="btn button-sm green radius-xl">
                  Pending
                </a>
              </li>
              <li className="card-courses-price">
                <del>$190</del>
                <h5 className="text-primary">$120</h5>
              </li>
            </ul>
          </div>
          <div className="row card-courses-dec">
            <div className="col-md-12">
              <h6 className="m-b10">Course Description</h6>
              <p>
                Lorem ipsum dolor sit amet, est ei idque voluptua copiosae, pro
                detracto disputando reformidans at, ex vel suas eripuit. Vel
                alii zril maiorum ex, mea id sale eirmod epicurei. Sit te possit
                senserit, eam alia veritus maluisset ei, id cibo vocent
                ocurreret per. Te qui doming doctus referrentur, usu debet
                tamquam et. Sea ut nullam aperiam, mei cu tollit salutatus
                delicatissimi.{" "}
              </p>
            </div>
            <div className="col-md-12">
              <a href="#" className="btn green radius-xl outline">
                Approve
              </a>
              <a href="#" className="btn red outline radius-xl ">
                Cancel
              </a>
            </div>
          </div>
        </div>
      </div>

      <Table columns={columns} dataSource={data} />
    </>
  );
};
export default ManagerTable;
