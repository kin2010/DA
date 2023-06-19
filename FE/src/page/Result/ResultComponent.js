import React, { useEffect } from "react";
import { Card, Empty, Result } from "antd";
import HeaderAppBar from "../Header/AppBar";
import { Button } from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrder, updateOrder } from "../../hook/LessionHook";
import { Container } from "react-bootstrap";

const AppResult = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data } = useQuery(["order_detail", id], getOrder);
  console.log(searchParams.get("success"), data);
  useEffect(() => {
    update();
  }, []);

  const update = async () => {
    if (searchParams.get("success") === "true") {
      const res = await updateOrder({
        isPaid: true,
        id: id,
      });
      console.log(res);
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <HeaderAppBar></HeaderAppBar>
      <Container>
        <Result
          style={{
            border: "00.5px solid #616161",
          }}
          className="mt-4"
          status="success"
          title={[
            <p>Tổng thanh toán :{data?.total}</p>,
            <p>
              Trạng thái :{!!data?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
            </p>,
          ]}
          //   title=" "
          subTitle={[<strong>{`Order : ${id} `}</strong>]}
          extra={"Bạn đã đăng ký thành công"}
        />
      </Container>
      <Container>
        <Card
          title={[<strong>Khoá học đã đăng ký</strong>]}
          //   extra={<a href="#">More</a>}
          //   style={{ width: "100%" }}
        >
          {!!data?.courses?.length ? (
            data?.courses?.map((cart) => (
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
                    <h4 className="m-b5">{cart?.name}</h4>
                  </div>
                  <div className="card-courses-list-bx">
                    <ul className="card-courses-view">
                      <li className="card-courses-categories">
                        <h5>Thể loại</h5>
                        <h4>{cart?.category}</h4>
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
                          <h5 className="text-primary m-b0">{cart?.price}₫</h5>
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
                        Bắt đầu học ngay
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
      </Container>
    </>
  );
};

export default AppResult;
