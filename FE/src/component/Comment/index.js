import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Avatar, Comment, Divider, Form, Input, List } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { addLessonComment, getUserData } from "../../hook/LessionHook";
import { Button } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import EditorCommon from "../EdittorCommon/EdittorCommon";
import EditorCustom from "./EditorCustom";
import { format } from "date-fns";
const { TextArea } = Input;
const ExampleComment = (props) => (
  <Comment
    // actions={[<span key="comment-nested-reply-to">Reply to</span>]}
    author={
      <div>
        <span
          style={{
            fontSize: "20px",
            color: "#12121280",
            fontWeight: "600",
            marginRight: "20px",
          }}
        >
          {props?.user?.fullName}
        </span>
        <span> {format(new Date(props?.time), "yyyy-MM-dd HH:mm")}</span>
      </div>
    }
    avatar={
      <Avatar
        size={"large"}
        src={props?.user?.avatar || "../images/user.jpg"}
        alt="Han Solo"
      />
    }
    content={
      <>
        {" "}
        <p
          dangerouslySetInnerHTML={{
            __html: props?.comment || "",
          }}
          style={{
            fontSize: "18px",
            color: "#757575",
          }}
          className="text_cmt"
        ></p>
        <Divider />
      </>
    }
  ></Comment>
);
const CommentComponent = ({ id, type, data, refetch }) => (
  <>
    <Divider></Divider>
    <CommentAdd type={type} id={id} data={data} refetch={refetch}></CommentAdd>
  </>
);

const CommentList = ({ comments }) => {
  console.log(comments, 22);
  return (
    <List
      dataSource={comments}
      // header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
      itemLayout="horizontal"
      renderItem={(props) => <ExampleComment {...props} />}
    />
  );
};

const Editor = ({ onChange, onSubmit, submitting, value, setValue }) => {
  const handleChange = (name, data) => {
    console.log(data, 22);
    setValue(data);
  };
  return (
    <>
      <Form.Item>
        <EditorCustom handleChange={handleChange} init={value} name="comment" />
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

const CommentAdd = ({ type, id, data: cmts, refetch }) => {
  const q = type === "lecture" ? "lecture_detailt" : "assigment_detail";
  const { data } = useQuery(["user"], getUserData);
  const [submitting, setSubmitting] = useState(false);
  const queryClient = useQueryClient();
  console.log(cmts, 4114);
  const [value, setValue] = useState("");
  const handleSubmit = async () => {
    if (!value) return;
    const res = await addLessonComment({
      user: data?.user?._id,
      type: type,
      comment: value,
      id: id,
    });
    refetch();
    setValue("");
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
      <p>{cmts?.length || 0} Bình luận</p>
      {!!cmts?.length && <CommentList comments={cmts} />}
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
