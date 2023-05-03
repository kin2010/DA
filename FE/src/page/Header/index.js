import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContextProvider } from "../../Context/AuthContext";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { user } = React.useContext(AuthContextProvider);
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Các khóa học
          </Typography>
          <Input
            placeholder="Search"
            sx={{ color: "#fff", bgcolor: "#fff" }}
          ></Input>
          {!!user ? (
            <Avatar className="ml-3">
              {!user?.avatar
                ? `${user?.fullName?.slice(0, 1)}`.toUpperCase()
                : ""}
            </Avatar>
          ) : (
            <Button color="inherit" onClick={()=>{
              navigate(
                "/login"
              )
            }}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
