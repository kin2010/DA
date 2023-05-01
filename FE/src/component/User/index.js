/* eslint-disable no-unused-vars */
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

const User = (props) => {
  const { user } = props;
  const { email, fullName, avatar } = user;
  return (
    <>
      <ListItem className="p-0" alignItems="flex-start">
        <ListItemAvatar>
          <Avatar className="ml-3">
            {!avatar ? `${fullName?.slice(0, 1)}`.toUpperCase() : ""}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={fullName
            ?.split(" ")
            .map((str) => str?.charAt(0).toUpperCase() + str?.slice(1))
            .join(" ")}
          secondary={
            <React.Fragment>
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  marginRight: "4px",
                  background: "green",
                  display: "inline-block",
                  borderRadius: "100px",
                }}
              ></span>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Online
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </>
  );
};

export default User;
