import React, { useState, useEffect } from "react";
import { Col, Row, Button } from "antd";
import { Link } from "react-router-dom";

export default function LinkNav() {
  const [atHospital, setAtHospital] = useState(1);
  const [atDepartment, setAtDepartment] = useState(0);
  const [atReserve, setAtReserve] = useState(0);

  const onClickHospital = () => {
    setAtHospital(1);
    setAtDepartment(0);
    setAtReserve(0);
  };

  const onClickDepartment = () => {
    setAtHospital(0);
    setAtDepartment(1);
    setAtReserve(0);
  };

  const onClickReserve = () => {
    setAtHospital(0);
    setAtDepartment(0);
    setAtReserve(1);
  };

  const buttonNav = ["button-nav", "button-nav-Click"];
  return (
    <Row style={{ width: "100%" }}>
      <Col span={3}></Col>
      <Col span={2}>
        <Row style={{ width: "100%" }} align="middle">
          <Button className={buttonNav[atHospital]} onClick={onClickHospital}>
            <Link to="/">hospital</Link>
          </Button>
        </Row>
      </Col>
      <Col span={1}></Col>
      <Col span={2}>
        <Button className={buttonNav[atDepartment]} onClick={onClickDepartment}>
          <Link to="/request"> Request</Link>
        </Button>
      </Col>
      <Col span={1}></Col>
      <Col span={2}>
        <Button className={buttonNav[atReserve]} onClick={onClickReserve}>
          <Link to="/reserve"> Reserve</Link>
        </Button>
      </Col>
    </Row>
  );
}
