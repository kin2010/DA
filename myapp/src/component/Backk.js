import React from "react";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useNavigate } from "react-router-dom";
import { Divider } from "antd";
const Backk = ({ name, desc }) => {
  const navigate = useNavigate();
  const baz = () => {
    navigate.back();
  };
  return (
    <>
      {!!desc && (
        <div className="text-dark">
          Course :{" "}
          <span
            className=""
            style={{
              fontSize: "30px",
            }}
          >
            {desc}
          </span>
        </div>
      )}
      {!desc && <h2 className="mt-1">{name}</h2>}
      <div
        onClick={baz}
        className="mt-3 mb-3 d-flex align-items-center text-dark"
      >
        <KeyboardReturnIcon style={{ fontSize: "15px", marginRight: "20px" }} />
        Quay lại
      </div>
      <Divider></Divider>
    </>
  );
};

export default Backk;
