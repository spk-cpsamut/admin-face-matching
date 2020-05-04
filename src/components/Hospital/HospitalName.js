import React, { useState, useEffect } from "react";
import { Input, Row, Col, Select, Button } from "antd";
import axios from "../../config/axios";
import HospitalSelect from "./Select/HospitalSelect";

function HospitalName(props) {
  const [id, setId] = useState(props.id);
  const [hospital, setHospital] = useState(props.hospital);

  const [valueSelect, setValueSelect] = useState();

  const [swap, setSwap] = useState(false);
  const [toInput, setToInput] = useState(false);

  let leftCol;
  let middleCol;
  let rightCol;
  let province;
  let district;
  let subDistrict;

  const handleChange = (value, e) => {
    setValueSelect(value);
    setId(e.id);
  };

  const onClickAccept = async () => {
    const body = { hospital };
    let result = await axios.put(`/hospitals?id=${props.id}`, body);
    props.fetchDataHospital();
  };

  const onClickEdit = async () => {
    setId(0);
    setSwap(true);
  };

  const onClickSumEdit = async () => {
    if (valueSelect) {
      setHospital(valueSelect);
    }
    console.log("above setSwap");
    setSwap(false);
    if (id !== 0) {
      await axios.put(
        `/medical-staff/hospital_id?id_new=${id}&id_old=${props.id}`
      );
      console.log("above delete");
      await axios.delete(`/hospitals?id=${props.id}`);
      console.log("down delete");
      props.fetchDataHospital();
      console.log("in if id !==0");
    } else if (id === 0) {
      console.log(id);
      setId(props.id);
    }
  };

  const onClickHospitalName = async () => {
    setToInput(true);
  };

  const onChangeHospitalName = (e) => {
    setHospital(e.target.value);
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
  //first list
  if (swap === false && toInput === false) {
    leftCol = <div onClick={onClickHospitalName}>{hospital}</div>;
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
    // dropdown
  } else if (swap === true && toInput === false) {
    leftCol = (
      <HospitalSelect handleChange={handleChange} pds_id={props.pds_id} />
    );
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
    // input type text for edit
  } else if (swap === false && toInput === true) {
    leftCol = (
      <input
        type="text"
        value={hospital}
        onChange={onChangeHospitalName}
        onKeyDown={onKeyDownInput}
      />
    );
    middleCol = null;
  }

  return (
    <Row style={{ width: "100%" }} justify="center">
      <Col span={swap ? 16 : 6}>
        <Row style={{ width: "100%" }} justify="end">
          <Col>{province}</Col>

          <Col>{district}</Col>
          <Col span={19}>{leftCol}</Col>
        </Row>
      </Col>

      <Col>{middleCol} </Col>
      <Col span={1}></Col>
      <Col>{rightCol}</Col>
    </Row>
  );
}

export default HospitalName;
