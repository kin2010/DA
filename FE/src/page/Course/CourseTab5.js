import { Button } from "@mui/material";
import { Result } from "antd";
import React from "react";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { useCourseService } from "../../hook/LessionHook";
import { openNotification } from "../../Notification";
import { Link } from "react-router-dom";
const CourseTab5 = () => {
  const courseService = useCourseService();
  const courseData = courseService.get();
  const handleSumbmit = async () => {
    const res = await courseService.updateCourse({
      id: courseData?._id,
      body: {
        publish: true,
      },
    });
    if (!res?.message) {
      openNotification({
        type: "success",
        message: "SAVED",
      });
      sessionStorage.setItem("new_course", courseData?._id);
    } else {
      openNotification({
        type: "error",
        message: res?.message,
      });
    }
  };
  return (
    <div>
      <div className="widget-inner">
        {/* <form className={"edit-profile m-b30"} onSubmit={handleSubmit}> */}
        <div className="row">
          <div className="col-12">
            <div className="ml-auto">
              <h3>Submit</h3>
            </div>
          </div>
          <div
            className="row"
            style={{
              background: "white",
            }}
          >
            {courseData?.publish && (
              <div
                className="col-3"
                style={{
                  borderRight: "1px solid gray",
                }}
              >
                <img
                  style={{
                    width: "100%",
                  }}
                  src="../images/study.jpg"
                  alt=""
                />
              </div>
            )}
            <div className={`col-${courseData?.publish ? 9 : 12}`}>
              <Result
                style={{ background: "white" }}
                icon={
                  <CreditScoreIcon
                    style={{ fontSize: "90px" }}
                    color="primary"
                  ></CreditScoreIcon>
                }
                title={
                  <>
                    {courseData?.publish
                      ? "Your course is publish"
                      : "Your course is in a draft state. Publish now"}
                    <span
                      className="ms-2 text-center"
                      style={{
                        fontSize: "20px",
                      }}
                    >
                      {courseData?.publish && (
                        <Link
                          className="link"
                          to={"/course/" + courseData?._id}
                        >
                          View course preview
                        </Link>
                      )}
                    </span>
                  </>
                }
                extra={
                  courseData?.publish ? (
                    <></>
                  ) : (
                    <Button
                      variant="contained"
                      type="primary"
                      key="console"
                      onClick={handleSumbmit}
                    >
                      SUBMIT
                    </Button>
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseTab5;
