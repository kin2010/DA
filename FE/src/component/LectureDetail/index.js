/* eslint-disable jsx-a11y/anchor-is-valid */
import { Container } from "@mui/material";
import React from "react";
import Header from "../../page/Header";
import HeaderAppBar from "../../page/Header/AppBar";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getCourse, getLectureById } from "../../hook/LessionHook";
import { format } from "date-fns";
import { Player } from "video-react";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { getYoutubeId } from "../../ultis/func";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CommentComponent from "../Comment";

const LectureDetail = () => {
  const { id } = useParams();
  const { data } = useQuery(["lecture_detail", id], getLectureById);
  const { data: courseData } = useQuery(
    ["course_detail", data?.course?._id],
    getCourse
  );

  return (
    <div>
      <HeaderAppBar></HeaderAppBar>
      <div className="page-content bg-white">
        {/* inner page banner */}
        <div
          className="page-banner ovbl-dark"
          style={{ backgroundImage: "url(./images/banner.jpg)" }}
        >
          <div className="container">
            <div className="page-banner-entry">
              <h1 className="text-white">{data?.name}</h1>
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
              <li>Bài giảng</li>
            </ul>
          </div>
        </div>
        {/* Breadcrumb row END */}
        <div className="content-block">
          <div className="section-area section-sp1">
            <div className="container">
              <div className="row">
                {!!data?.video?.length && (
                  <>
                    <div className="col-lg-8 col-xl-8">
                      <Player
                        fluid={false}
                        className=""
                        playsInline
                        poster="/assets/poster.png"
                        src={data?.video[0]}
                        width="100%"
                        height={400}
                      />
                    </div>
                    <div className="col-lg-4 col-xl-4">
                      <div className="m-b30" id="curriculum">
                        <h4>Đề cương </h4>
                        <ul className="curriculum-list">
                          {!!courseData?.sections_info?.length &&
                            courseData?.sections_info?.map((item) => (
                              <li key={item?.section?._id}>
                                <h5>{item?.section?.name}</h5>
                                <ul>
                                  {!!item?.data?.length &&
                                    item?.data?.map((lecture) => (
                                      <li
                                        key={lecture?.item?._id}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <div className="curriculum-list-box">
                                          <span>
                                            {lecture?.type === "lecture" && (
                                              <DescriptionIcon
                                                color="info"
                                                className="me-3"
                                              ></DescriptionIcon>
                                            )}
                                            {lecture?.type === "assignment" && (
                                              <AssignmentIcon
                                                color="success"
                                                className="me-3"
                                              ></AssignmentIcon>
                                            )}
                                          </span>

                                          <Link
                                            to={`/lecture/${lecture?.item?._id}`}
                                          >
                                            {lecture?.item?.name}
                                          </Link>
                                        </div>
                                        {/* <span>60 minutes</span> */}
                                      </li>
                                    ))}
                                </ul>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                <div className="col-lg-8 col-xl-8">
                  {/* blog start */}
                  <div className="recent-news blog-lg">
                    <div className="info-bx">
                      <ul className="media-post">
                        <li>
                          {!!data?.updatedAt && (
                            <a href="#">
                              <i className="fa fa-calendar" />

                              {format(
                                new Date(data?.updatedAt),
                                "yyyy-mm-dd hh:mm"
                              )}
                            </a>
                          )}
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-comments-o" />
                            Comment
                          </a>
                        </li>
                      </ul>
                      <h5 className="post-title">
                        <a href="#">{data?.name}</a>
                      </h5>
                      <p
                        dangerouslySetInnerHTML={{ __html: data?.description }}
                      ></p>
                      <div className="ttr-divider bg-gray">
                        <i className="icon-dot c-square" />
                      </div>
                    </div>
                    {!!data?.youtube_url && (
                      <>
                        <p>Video youtube: </p>
                        <div className="text-center mt-3">
                          <iframe
                            src={`https://www.youtube.com/embed/${getYoutubeId(
                              data?.youtube_url
                            )}?controls=1`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
                            allowFullScreen
                            title="Embedded youtube"
                            // className="w-75"
                            width="100%"
                          />
                        </div>
                      </>
                    )}
                    {!!data?.attachments?.length && (
                      <div>
                        <p>Tệp đính kèm :</p>
                        {data?.attachments?.map((acttach) => (
                          <div
                            key={acttach}
                            style={{
                              border: "0.5px solid gray",
                              borderRadius: "5px",
                              padding: "5px",
                            }}
                            className="d-flex align-items-center justify-content-between flex-colum my-2"
                          >
                            {acttach.includes("jpg") ||
                            acttach.includes("png") ? (
                              <img
                                style={{ width: "80px" }}
                                alt="thumbnail"
                                src={acttach}
                              ></img>
                            ) : (
                              <AttachFileIcon
                                color="info"
                                style={{ fontSize: "50px" }}
                              ></AttachFileIcon>
                            )}
                            <Link className="link" to={acttach} target="_blank">
                              {acttach}
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* comment */}
                  <CommentComponent />
                </div>

                <div className="col-lg-4 col-xl-4">
                  {!data?.video?.length && (
                    <div className="m-b30" id="curriculum">
                      <h4>Đề cương </h4>
                      <ul className="curriculum-list">
                        {!!courseData?.sections_info?.length &&
                          courseData?.sections_info?.map((item) => (
                            <li key={item?.section?._id}>
                              <h5>{item?.section?.name}</h5>
                              <ul>
                                {!!item?.data?.length &&
                                  item?.data?.map((lecture) => (
                                    <li
                                      key={lecture?.item?._id}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <div className="curriculum-list-box">
                                        <span>
                                          {lecture?.type === "lecture" && (
                                            <DescriptionIcon
                                              color="info"
                                              className="me-3"
                                            ></DescriptionIcon>
                                          )}
                                          {lecture?.type === "assignment" && (
                                            <AssignmentIcon
                                              color="success"
                                              className="me-3"
                                            ></AssignmentIcon>
                                          )}
                                        </span>

                                        <Link
                                          to={`/lecture/${lecture?.item?._id}`}
                                        >
                                          {lecture?.item?.name}
                                        </Link>
                                      </div>
                                      {/* <span>60 minutes</span> */}
                                    </li>
                                  ))}
                              </ul>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
                {/* Side bar END */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureDetail;
