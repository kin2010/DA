import { Avatar, Button, Divider, Rating } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import { postComment } from "../../hook/LessionHook";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const formatDate = (day) => {
  return "".concat(day.substring(0, 10), " ", day.substring(11, 16));
};
const CourseComment = () => {
  const [formValue, setFormvalue] = useState({
    comment: "",
    rating: 0,
  });
  const onChangeForm = (e) => {
    setFormvalue({ ...formValue, [e.target.name]: e.target.value });
  };
  const { id } = useParams();
  const { data: user } = useQuery(["user"]);
  console.log(4, user);
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formValue, 3232);
    const res = await postComment({
      rating: formValue?.rating,
      comment: formValue?.comment,
      course: id,
      user: user?.user?._id,
    });
    if (res?._id) {
      console.log(res);
    }
  };

  return (
    <Row
      id="tab3"
      className="pt-5 p-3 pb-5 cmt mt-5"
      style={{ backgroundColor: "#e9eef5", borderRadius: "25px" }}
    >
      <hr />
      <Col>
        <Row>
          <div className="h2 mb-5 text-primary">Đánh giá</div>{" "}
        </Row>

        <Row className="p-3">
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={[
                  <p> "Brunch this weekend?"</p>,
                  <Rating
                    name="read-only"
                    value={3}
                    readOnly
                    color="#1976d2"
                  />,
                ]}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Summer BBQ"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      to Scott, Alex, Jennifer
                    </Typography>
                    {" — Wish I could come, but I'm out of town this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Oui Oui"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Sandra Adams
                    </Typography>
                    {" — Do you have Paris recommendations? Have you ever…"}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </Row>
      </Col>

      <Col className="">
        <Row>
          {" "}
          <div className="h2 mb-5 text-primary">
            Bạn nghĩ như thế nào về khóa học này ?
          </div>
        </Row>
        <Row>
          <Form onSubmit={submitHandler} className="w-100">
            <Form.Group className="mb-3" controlId="custom4">
              <Form.Label className="text-primary h5">
                Xếp hạng đánh giá
              </Form.Label>
              <Form.Control
                onChange={onChangeForm}
                name="rating"
                form="add"
                as="select"
                placeholder="Rating"
                value={formValue.rating}
                className="w-100"
                required
              >
                <option value="">Chọn sao...</option>
                <option value="1">1- Rất Tệ</option>
                <option value="2">2- Tệ</option>
                <option value="3">3- Khá Tốt</option>
                <option value="4">4- Rất tốt</option>
                <option value="5">5- Xuất sắc</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="custom5">
              <Form.Label className="text-primary h5">Bình luận</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                name="comment"
                value={formValue.comment}
                onChange={onChangeForm}
                placeholder="Nhap Comment"
              />
            </Form.Group>

            <Button
              className="w-100"
              color="primary"
              variant="contained"
              type="submit"
            >
              Gởi
            </Button>
          </Form>
        </Row>
      </Col>
    </Row>
  );
};

export default CourseComment;
