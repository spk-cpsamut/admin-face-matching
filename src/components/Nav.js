import React, { useState, useEffect } from "react";
import "../css/nav.css";

import { Col, Row, Button } from "antd";
import { Link } from "react-router-dom";
import LinkNav from "./Nav/LinkNav";

function Nav(props) {
  return (
    <Row align="middle" className="nav-bar">
      {props.user === "guest" ? null : <LinkNav></LinkNav>}
    </Row>
  );
}

export default Nav;
