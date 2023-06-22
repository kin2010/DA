import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function IconBreadcrumbs({ t1, t2, l1, l2 }) {
  return (
    <div className="db-breadcrumb">
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href={l1 || "/"}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {t1 || "Admin"}
          </Link>
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href={l2 || "#"}
          >
            <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {t2 || "Trang chủ"}
          </Link>
        </Breadcrumbs>
      </div>
    </div>
  );
}
