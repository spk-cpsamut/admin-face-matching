import React, { useState, useEffect } from "react";
import { Input, Row, Col, Select, Button } from "antd";
import axios from "../../config/axios";
import SelectDepartment from "./select/SelectDepartment";

function DepartmentName(props) {
  const [id, setId] = useState(props.id);
  const [department, setDepartment] = useState(props.department);

  const [valueSelect, setValueSelect] = useState();

  const [swap, setSwap] = useState(false);
  const [toInput, setToInput] = useState(false);

  let leftCol;
  let middleCol;
  let rightCol;

  const handleChange = (value, e) => {
    setValueSelect(value);
    setId(e.id);
  };

  const onClickAccept = async () => {
    const body = { department };
    let result = await axios.put(`/departments?id=${props.id}`, body);
    props.fetchData();
  };

  const onClickEdit = async () => {
    setId(0);
    setSwap(true);
  };

  const onClickSumEdit = async () => {
    if (valueSelect) {
      setDepartment(valueSelect);
    }

    setSwap(false);
    if (id !== 0) {
      await axios.put(`/medical-staff?id_new=${id}&id_old=${props.id}`);
      await axios.delete(`/departments?id=${props.id}`);
      props.fetchData();
    } else if (id === 0) {
      console.log(id);
      setId(props.id);
    }
  };

  const onClickDepartmentName = async () => {
    setToInput(true);
  };

  const onChangeDepartmentName = (e) => {
    setDepartment(e.target.value);
  };

  const onKeyDownInput = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      setToInput(false);
    }
  };

  const setSwapFalse = async () => {
    setSwap(false);
    setId(props.id);
  };
  if (swap === false && toInput === false) {
    leftCol = <div onClick={onClickDepartmentName}>{department}</div>;
    middleCol = <Button onClick={onClickEdit}>เปลี่ยนเป็นสาขาที่มี</Button>;
    rightCol = (
      <Button
        onClick={onClickAccept}
        className="button-agree"
        disabled={id !== props.id ? true : false}
      >
        ตั้งเป็นสาขาใหม่
      </Button>
    );
  } else if (swap === true && toInput === false) {
    leftCol = <SelectDepartment handleChange={handleChange} />;
    middleCol = (
      <Button type="danger" onClick={setSwapFalse}>
        ไม่มีในนี้ ยกเลิก
      </Button>
    );
    rightCol = (
      <Button type="primary" onClick={onClickSumEdit}>
        {" "}
        ยืนยันการแก้ไข
      </Button>
    );
  } else if (swap === false && toInput === true) {
    leftCol = (
      <input
        type="text"
        value={department}
        onChange={onChangeDepartmentName}
        onKeyDown={onKeyDownInput}
      />
    );
    middleCol = null;
  }

  return (
    <Row style={{ width: "100%" }}>
      <Col span={10}>{leftCol}</Col>
      <Col></Col>
      <Col>{middleCol} </Col>
      <Col span={2}></Col>
      <Col>{rightCol}</Col>
    </Row>
  );
}

export default DepartmentName;
