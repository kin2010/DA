/* eslint-disable no-unused-vars */
import { Avatar } from "@mui/material";
import React from "react";

const User = (user) => {
  const { email, fullName, avatar } = user;
  return (
    <Avatar className="ml-3">
      {!avatar ? `${fullName?.slice(0, 1)}`.toUpperCase() : ""}
    </Avatar>
  );
};

export default User;
