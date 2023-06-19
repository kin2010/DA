import { Alert, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, Navigate, useNavigate } from "react-router-dom";
import HeaderAppBar from "./Header/AppBar";
import { getToken, setToken } from "../ultis/Common";
import { serviceFetch } from "../ultis/service";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { register, useLoginService } from "../hook/HAuth";
import { mapError } from "../ultis/alert";
import { openNotification } from "../Notification";

const ROLE = {
  STUDENT: "6367542a37d3783398b88eb7",
  TEACHER: "638c6c5300702fc684d1d949",
};

const Register = () => {
  const loginServices = useLoginService();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  // const { status, data, error, isFetching } = useLogin(
  //   form.email,
  //   form.password
  // );
  const [api, setApi] = useState("");
  const onChangeValue = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const submit = async (e) => {
    e.preventDefault();
    const params = {
      ...form,
      role: role === "teacher" ? ROLE.TEACHER : ROLE.STUDENT,
    };
    const data = await register(params);
    console.log(data?.data?.fullName);
    setError(mapError(data));
    if (!!data?.data?.fullName) {
      setToken(data?.token);
      openNotification({
        type: "success",
        message: "Đăng kí thành công",
      });
      setToken(data?.token);
      setTimeout(() => {
        navigate("/course");
      }, 5000);
    }
  };

  useEffect(() => {
    const ff = async () => {
      const dt = await serviceFetch({
        url: "ddd",
        method: "GET",
      });
      console.log("check", dt);
      setApi(dt?.message);
    };
    ff();
  }, []);

  if (!!getToken() && getToken() !== "undefined") {
    return <Navigate to={"/"} />;
  }

  const handleRole = (isTeacher) => {
    setRole(isTeacher ? "teacher" : "student");
  };
  return (
    <div>
      <HeaderAppBar />
      <Container>
        <div
          className=" mt-3 text-center"
          style={{
            color: "#1976d2",
            fontSize: "30px",
            fontWeight: 900,
          }}
        >
          Đăng ký
        </div>
        <Row style={{ maxWidth: "600px" }} className="pt-2 my-auto  mx-auto">
          <div>
            <Form.Label style={{ fontSize: "30px" }}>Bạn là : </Form.Label>
            <div
              className="d-flex align-items-center justify-content-between mb-3"
              style={{ maxWidth: "700px", margin: "0 auto" }}
            >
              <div
                style={{
                  width: "40%",
                  cursor: "pointer",
                  boxShadow:
                    role === "teacher"
                      ? "-5px 0px 16px 19px rgba(0,0,0,0.1)"
                      : "none",
                }}
                onClick={() => handleRole(true)}
              >
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image="/images/register_1.jpg"
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Giảng viên
                    </Typography>
                  </CardContent>
                  {/* <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions> */}
                </Card>{" "}
              </div>
              <Form.Label color="primary" style={{ fontSize: "20px" }}>
                {" "}
                HAY
              </Form.Label>

              <div
                style={{
                  width: "40%",
                  cursor: "pointer",
                  boxShadow:
                    role === "student"
                      ? "-5px 0px 16px 19px rgba(0,0,0,0.1)"
                      : "none",
                }}
                onClick={() => handleRole(false)}
              >
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image="/images/register_2.jpg"
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Học viên
                    </Typography>
                  </CardContent>
                </Card>{" "}
              </div>
            </div>
          </div>
          {!!role && (
            <p>
              {" "}
              Bạn là{" "}
              <Link
                style={{
                  fontSize: "18px",
                }}
                className="link"
              >
                {role === "teacher" ? "giảng viên" : "học viên"}
              </Link>
            </p>
          )}
          <Form onSubmit={submit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email </Form.Label>
              <Form.Control
                onChange={onChangeValue}
                type="email"
                placeholder="Nhập email"
                name="email"
              />
              <Form.Text className="text-muted">Nhập email của bạn</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>fullName </Form.Label>
              <Form.Control
                onChange={onChangeValue}
                type="text"
                placeholder="Nhập tên"
                name="fullName"
              />
              <Form.Text className="text-muted">Nhập tên của bạn</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                onChange={onChangeValue}
                name="phone"
                type="number"
                placeholder="Số điện thoại"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                onChange={onChangeValue}
                name="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Lưu đăng nhập" />
              <p>
                Bạn chưa có tài khoản?{" "}
                <Link to="/register" className="link">
                  {" "}
                  Đăng ký ngay
                </Link>
              </p>
            </Form.Group>
            <Button type="submit" className="w-100 py-1" variant="primary">
              Submit
            </Button>
          </Form>
          {!!error.message && (
            <Row className="mt-3 py-4">
              <Alert severity={error.severity}>{error.message}</Alert>
            </Row>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Register;
