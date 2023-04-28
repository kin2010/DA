import { Container } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

const Group = () => {
  return (
    <div style={{ backgroundColor: "#f9f9f9 " }}>
      <Header> </Header>
      <Container>
        <h3 className="mt-3">Group: Hoc tap with me</h3>
        <Outlet />
      </Container>
    </div>
  );
};

export default Group;
