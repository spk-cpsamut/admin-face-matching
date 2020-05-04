import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { Redirect } from "react-router-dom";

function ReceiveLogin() {
  const [count, setCount] = useState(3);

  setTimeout(() => {
    setCount(2);
    setTimeout(() => {
      setCount(1);
      setTimeout(() => {
        setCount(0);
      }, 1000);
    }, 1000);
  }, 1000);

  return (
    <Col>
      <Row style={{ width: "100%", marginTop: "50px" }} justify="center">
        <Col>
          {" "}
          <h1> register is complete </h1>
          <h3>auto going to Login Page in.. {count}</h3>
          {count === 0 ? <Redirect /> : null}
        </Col>
      </Row>
      0
    </Col>
  );
}

export default ReceiveLogin;
