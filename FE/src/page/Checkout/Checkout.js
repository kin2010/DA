import React, { useContext, useMemo } from "react";
import HeaderAppBar from "../Header/AppBar";
import { Button, Container } from "@mui/material";
import { Card, Col, Empty, Row, Space } from "antd";
import { AppContext, AppContextProvider } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { CheckoutForm, PaymentForm } from "./Striple";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { addOrder, getUserData, payment } from "../../hook/LessionHook";
import { URL } from "../../Context/constant";
import { AuthContextProvider } from "../../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { openNotification } from "../../Notification";
const stripePromise = loadStripe(
  "pk_test_51NKDEsDy0gZZz52q6HuzrcxfxrhWQ16Z3HEKHR3od9eMmHHdHQidyH8p4Q0C7JMyjmgGcbFKMGzAoYVHyl8TMUab00hmRo6OpJ"
);
const options = {
  // passing the client secret obtained from the server
  clientSecret:
    "test_secret_sk_test_51NKDEsDy0gZZz52qkxQ4GtSkBx1dBxidIK4YEvuOyQyvZlGTQ3FHLxYFtWvYud0PBh5kDeUj9b8YlNh5f9qiiVrU00a6pllUQz",
};
const Checkout = () => {
  const { cart, setCart } = useContext(AppContextProvider);
  const { data: user } = useQuery(["user"], getUserData);
  console.log(cart);
  const navigate = useNavigate();
  const info = useMemo(() => {
    const total = cart?.reduce((a, b) => {
      return a + !!b?.price ? b?.price : 0;
    }, 0);
    const discount = cart?.reduce((a, b) => {
      return a + !!b?.discount ? b?.discount : 0;
    }, 0);
    return { total, discount };
  }, [cart]);

  const handleCancel = (id) => {
    const index = cart?.findIndex((c) => c?._id === id);
    const cp = cart;
    cp?.splice(index, 1);
    console.log(index, cp);
    setCart([...cp]);
  };

  const handlePayment = async () => {
    console.log(user);
    const order = await addOrder({
      total: info.total - info.discount,
      user: user?.user?._id,
      courses: cart?.map((c) => c?._id),
    });
    const res = await payment({
      items: cart,
      success_url: URL + "/result/" + order?._id + "?success=true",
      cancel_url: URL + "/result/" + order?._id + "?success=false",
      order: order?._id || "",
      user: user?.user?._id,
      courses: cart?.map((c) => c?._id),
    });
    if (res?.url) {
      window.open(res?.url, "_blank ");
    } else {
      openNotification({
        type: "error",
        message: res?.error || "",
      });
    }
  };

  return (
    <>
      <HeaderAppBar></HeaderAppBar>
      <div className="page-content bg-white">
        {/* inner page banner */}
        <div
          className="page-banner ovbl-dark"
          style={{ backgroundImage: "url(assets/images/banner/banner2.jpg)" }}
        >
          <div className="container">
            <div className="page-banner-entry">
              <h1 className="text-white">Đăng ký khóa học</h1>
            </div>
          </div>
        </div>
        {/* Breadcrumb row */}
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <a href="#">Trang chủ</a>
              </li>
              <li>Đăng ký khóa học</li>
            </ul>
          </div>
        </div>
      </div>
      <Container>
        <Row className="mt-5">
          <Col span={11}>
            <Card
              title="Đăng ký khóa học"
              //   extra={<a href="#">More</a>}
              //   style={{ width: "100%" }}
            >
              {!!cart?.length ? (
                cart?.map((cart) => (
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
                        src={cart?.thumbnai || "./images/course.jpg"}
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
                            <h4>{cart?.category?.name}</h4>
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
                      <div className="row card-courses-dec">
                        <div className="col-md-12">
                          <p></p>
                        </div>
                        <div className="col-md-12">
                          <Button
                            variant="contained"
                            color="primary"
                            className="me-3"
                            onClick={() => {
                              navigate("/course/" + cart?._id);
                            }}
                          >
                            Xem
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleCancel(cart?._id)}
                          >
                            Hủy bỏ
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <Empty></Empty>
              )}
            </Card>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <Card
              size="small"
              title="Thanh toán"
              //   extra={<a href="#">More</a>}
              //   style={{ width: "100%" }}
            >
              <p>
                <strong>Giá trị khóa học : </strong>
                {cart?.reduce((a, b) => {
                  return a + !!b?.price ? b?.price : 0;
                }, 0)}
                ₫{" "}
              </p>
              <p>
                <strong>Giảm giá : </strong>
                {cart?.reduce((a, b) => {
                  return a + !!b?.discount ? b?.discount : 0;
                }, 0)}
                ₫{" "}
              </p>
              <p>
                <strong>Tổng thanh toán:</strong> {info.total - info.discount}₫
              </p>
              <Button
                variant="contained"
                color="primary"
                className="mt-2"
                onClick={() => {
                  handlePayment();
                }}
              >
                Thanh toán ngay
              </Button>
              {/* <Elements stripe={stripePromise} options={options}>
                <CheckoutForm></CheckoutForm>
              </Elements> */}
            </Card>{" "}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Checkout;
