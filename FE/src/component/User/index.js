/* eslint-disable no-unused-vars */
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import React from "react";

const User = (props) => {
  const { user, time, message, status, size } = props;
  const { email, fullName, avatar } = user;
  return (
    <>
      <ListItem className="p-0" alignItems="flex-start">
        <ListItemAvatar
          style={{
            display: "flex",
            gap: "0 5px",
            minWidth: "auto",
            marginRight: "10px",
          }}
        >
          <Avatar sx={{ width: size || 40, height: size || 40 }}>
            {!avatar ? `${fullName?.slice(0, 1)}`.toUpperCase() : ""}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <div
              style={{
                display: "flex",
                gap: "0 5px",
                alignItems: "center",
              }}
            >
              {fullName
                ?.split(" ")
                .map((str) => str?.charAt(0).toUpperCase() + str?.slice(1))
                .join(" ")}
              {time && (
                <span
                  style={{
                    color: "#757575",
                    fontSize: "8px",
                  }}
                >
                  {format(new Date(time), "yyyy/MM/dd h:mm a")}
                </span>
              )}
            </div>
          }
          secondary={
            <React.Fragment>
              {status ? (
                <>
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
                </>
              ) : (
                <>
                  <span>{message}</span>
                </>
              )}
            </React.Fragment>
          }
        />
      </ListItem>
    </>
  );
};

User.defaultProps = {
  status: true,
};

export default User;
