import { Alert, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { login, useLogin, useLoginService } from "../../hook/HAuth";
import { mapError } from "../../ultis/alert";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { getToken, setToken } from "../../ultis/Common";
import { serviceFetch } from "../../ultis/service";
import { apiURL } from "../../Context/constant";
const Login = () => {
  const navigate = useNavigate();
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
  const loginServices = useLoginService();
  const onChangeValue = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const submit = async (e) => {
    e.preventDefault();
    const data = await loginServices.login(form.email, form.password);
    console.log(data);
    setError(mapError(data));
    if (data?.status === 200) {
      setToken(data?.token);
    }
    setTimeout(() => {
      navigate("/");
    }, 5000);
  };

  useEffect(() => {
    const ff = async () => {
      const dt = await serviceFetch({
        url: "ddd",
        method: "GET",
      });
      console.log("check", dt);
      setApi(dt?.message);
      console.log(apiURL);
    };
    ff();
  }, []);

  if (!!getToken()) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <Header />
      <Container>
        <div
          className=" mt-3 text-center"
          style={{
            color: "#1976d2",
            fontSize: "30px",
            fontWeight: 900,
          }}
        >
          Login
        </div>
        <Row style={{ maxWidth: "600px" }} className="pt-2 my-auto  mx-auto">
          <Form onSubmit={submit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={onChangeValue}
                type="email"
                placeholder="Enter email"
                name="email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
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

export default Login;
