import { useQuery } from "@tanstack/react-query";
import { Avatar, Comment, Divider, Form, Input, List } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { addLessonComment, getUserData } from "../../hook/LessionHook";
import { Button } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import EditorCommon from "../EdittorCommon/EdittorCommon";
import EditorCustom from "./EditorCustom";
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
const CommentComponent = ({ id, type }) => (
  <>
    <Divider></Divider>
    <CommentAdd type={type} id={id}></CommentAdd>
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

const Editor = ({ onChange, onSubmit, submitting, value, setValue }) => {
  const handleChange = (name, data) => {
    console.log(data, 22);
    setValue(data);
  };
  return (
    <>
      <Form.Item>
        <EditorCustom handleChange={handleChange} name="comment" />
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
};

const CommentAdd = ({ type, id }) => {
  const { data } = useQuery(["user"], getUserData);
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const handleSubmit = async () => {
    if (!value) return;
    const res = await addLessonComment({
      user: data?.user?._id,
      type: type,
      comment: value,
      id: id,
    });
    console.log(res, 2323, {
      user: data?.user?._id,
      type: type,
      id: id,
    });
    // setSubmitting(true);
    // setTimeout(() => {
    //   setSubmitting(false);
    //   setValue("");
    //   setComments([
    //     ...comments,
    //     {
    //       author: data?.user?.fullName,
    //       avatar: !!data?.user?.avatar
    //         ? data?.user?.avatar
    //         : "../images/user.jpg",
    //       content: <p>{value}</p>,
    //       datetime: moment(new Date()).fromNow(),
    //     },
    //   ]);
    // }, 1000);
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
          <Editor onSubmit={handleSubmit} value={value} setValue={setValue} />
        }
      />
    </>
  );
};
export default CommentComponent;
