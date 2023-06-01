import React, { useState } from "react";
import Sidebar from "react-sidebar";
import SideBarContent from "./SideBarContent";
import { Outlet } from "react-router-dom";
const mql = window.matchMedia(`(min-width: 800px)`);
const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [docked, setDocked] = useState(mql);

  const handleOpen = () => {
    // setOpen(!open);
    setDocked(!docked);
  };

  return (
    <Sidebar
      sidebar={<SideBarContent></SideBarContent>}
      open={open}
      onSetOpen={setOpen}
      styles={{ sidebar: { background: "white", width: "300px" } }}
      docked={docked}
    >
      <Outlet />
    </Sidebar>
  );
};

export default SideBar;
