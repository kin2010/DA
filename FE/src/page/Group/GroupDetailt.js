import { Avatar, Button, Col, List, Result, Row, Input, Form } from "antd";
import React, { useState } from "react";
// or 'antd/dist/antd.less'
import { Divider, Typography } from "@mui/material";
import "../../component/index.css";
// import { Comment } from "antd";
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];
const SubCmt = () => {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComments([
        ...comments,
        {
          author: "Han Solo",
          avatar: "https://joeschmoe.io/api/v1/random",
          content: <p>{value}</p>,
          datetime: new Date().toLocaleDateString(),
          //   datetime: moment("2016-11-22").fromNow(),
        },
      ]);
    }, 1000);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      {comments.length > 0 && <CommentList comments={comments} />}
      {/* <Comment
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      /> */}
    </>
  );
};

const { TextArea } = Input;
const CommentList = ({ comments }) => {
  return (
    <>
      <div className="text-center mt-2 mb-3 text-primary">2022-22-02</div>

      <List
        style={{
          backgroundColor: "#fff",
          border: "1px solid gray",
          padding: "0 30px",
          borderRadius: "40px",
        }}
        dataSource={comments}
        header={`${comments.length} ${
          comments.length > 1 ? "replies" : "reply"
        }`}
        itemLayout="horizontal"
        // renderItem={(props) => <Comment {...props} />}
      />
    </>
  );
};
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const ExampleComment = ({ children }) => {
  return <></>;
  // return (
  //   <Comment
  //     actions={[<span key="comment-nested-reply-to">Reply to</span>]}
  //     author={<a>Han Solo</a>}
  //     avatar={
  //       <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
  //     }
  //     content={
  //       <p>
  //         We supply a series of design principles, practical patterns and high
  //         quality design resources (Sketch and Axure).
  //       </p>
  //     }
  //   >
  //     {children}
  //   </Comment>
  // );
};
const Cmt = () => {
  return (
    <>
      <div className="text-center mt-2 mb-3 text-primary">2022-22-02</div>
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid gray",
          padding: "0 30px",
          borderRadius: "40px",
        }}
      >
        <ExampleComment>
          <ExampleComment>
            <ExampleComment />
            <ExampleComment />
          </ExampleComment>
        </ExampleComment>
      </div>
    </>
  );
};
const GroupDetailt = () => {
  return (
    <>
      <Row>
        <Col style={{ width: "72%" }}>
          <div className="mt-5 content" style={{ borderRadius: "50px" }}>
            <Result
              status="403"
              title="Chưa có hoạt động nào"
              subTitle="Tham gia trao đổi với mọi người trong group ~"
              extra={<Button type="primary">Back Home</Button>}
            />
            <Cmt></Cmt>
            <SubCmt></SubCmt>
          </div>
        </Col>
        <Col style={{ width: "3%" }}></Col>
        <Col className="w-25 border-primary  border-left-1">
          <Typography fontSize={16} className="fw-bold mt-3" color="#1976d2">
            Danh sách :
          </Typography>
          <Divider style={{ color: "#1976d2", height: "2px" }}></Divider>
          <List
            style={{ padding: "10px" }}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="thonglq@gmail.com"
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};
export default GroupDetailt;
