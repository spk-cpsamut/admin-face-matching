import React, { useState, useEffect } from "react";
import { Select } from "antd";
const { Option } = Select;

function FilterRegion(props) {
  const defaultValue = [
    "เลือกดูเป็นรายละภูมิภาค",
    "คำขอ ภาคเหนือ",
    "คำขอ ภาคกลาง",
    "คำขอ ภาคตะวันออกเฉียงเหนือ",
    "คำขอ ภาคตะวันตก",
    "คำขอ ภาคตะวันออก",
    "คำขอ ภาคใต้",
    "คำขอ ของทุกภาค",
  ];

  function handleChange(value) {
    props.setIndexDefaultFilter(value ?? "7");

    props.fetchDataRequest(value);
  }
  return (
    <div
      style={{ marginTop: "20px", marginLeft: "150px", marginBottom: "30px" }}
    >
      <Select
        defaultValue={defaultValue[props.indexDefaultFilter]}
        style={{ width: 360 }}
        onChange={handleChange}
      >
        <Option value="1">คำขอ ภาคเหนือ</Option>
        <Option value="2">คำขอ ภาคกลาง</Option>
        <Option value="3">คำขอ ภาคตะวันออกเฉียงเหนือ</Option>
        <Option value="4">คำขอ ภาคตะวันตก</Option>
        <Option value="5">คำขอ ภาคตะวันออก</Option>
        <Option value="6">คำขอ ภาคใต้</Option>
        <Option value={null}>คำขอ ของทุกภาค</Option>
      </Select>
    </div>
  );
}

export default FilterRegion;
