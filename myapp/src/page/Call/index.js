import React from "react";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";

const Call = () => {
  return (
    <>
      <Container>
        <div>Meeting Room</div>
        <h2> Id room :</h2>
        <Outlet></Outlet>
      </Container>
    </>
  );
};

export default Call;
