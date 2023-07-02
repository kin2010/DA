import { useQuery } from "@tanstack/react-query";
import { Avatar, Comment, Divider, Form, Input, List } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { getUserData } from "../../hook/LessionHook";
import { Button } from "@mui/material";
const { TextArea } = Input;
const ExampleComment = ({ children }) => (
  <Comment
    actions={[<span key="comment-nested-reply-to">Reply to</span>]}
    author={<a>Han Solo</a>}
    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
    content={
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure).
      </p>
    }
  >
    {children}
  </Comment>
);
const CommentComponent = () => (
  <>
    <Divider></Divider>

    {/* <ExampleComment>
      <ExampleComment>
        <ExampleComment />
        <ExampleComment />
      </ExampleComment>
    </ExampleComment> */}
    <CommentAdd></CommentAdd>
  </>
);

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);
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
        variant="contained"
      >
        Thêm bình luận
      </Button>
    </Form.Item>
  </>
);
const CommentAdd = () => {
  const { data } = useQuery(["user"], getUserData);
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
          author: data?.user?.fullName,
          avatar: !!data?.user?.avatar
            ? data?.user?.avatar
            : "../images/user.jpg",
          content: <p>{value}</p>,
          datetime: moment(new Date()).fromNow(),
        },
      ]);
    }, 1000);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <p>{comments?.length || 0} Bình luận</p>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={
          <Avatar
            src={
              !!data?.user?.avatar ? data?.user?.avatar : "../images/user.jpg"
            }
            alt="Han Solo"
          />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </>
  );
};
export default CommentComponent;
