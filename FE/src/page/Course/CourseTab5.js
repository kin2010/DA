import { Button } from "@mui/material";
import { Result } from "antd";
import React from "react";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
const CourseTab5 = () => {
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
          <div className="col-12">
            <Result
              style={{ background: "white" }}
              icon={
                <CreditScoreIcon
                  style={{ fontSize: "90px" }}
                  color="primary"
                ></CreditScoreIcon>
              }
              title="
              Your course is in a draft state. Public now"
              extra={
                <Button variant="contained" type="primary" key="console">
                  SUBMIT
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseTab5;
