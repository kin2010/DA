import React from "react";
import { Anchor } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "../../index.css";
const { Link } = Anchor;
const Lotrinh = () => {
  return (
    <Anchor className="anchor">
      <Link href="#components-anchor-demo-basic" title="Chương 1" />
      <Link href="#components-anchor-demo-static" title="Chương 2" />
      <Link href="#API" title="API">
        <Link href="#Anchor-Props" title="Anchor Props" />
        <Link href="#Link-Props" title="Link Props" />
      </Link>
    </Anchor>
  );
};

export default Lotrinh;
