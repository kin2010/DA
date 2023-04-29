import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="mt-5 text-danger">
      Error<Link to="/call">call</Link>
    </div>
  );
};

export default Error;
