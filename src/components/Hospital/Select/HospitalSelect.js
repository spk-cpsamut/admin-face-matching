import React, { useState, useEffect } from "react";
import { Select, Row } from "antd";
import axios from "../../../config/axios";
const { Option } = Select;
function HospitalSelect(props) {
  const [dropdown, setDropdown] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`/hospitals?pds_id=${props.pds_id}`);

      setDropdown(result.data);
    };
    fetchData();
  }, []);

  return (
    <Row style={{ marginLeft: "5px", width: "80%" }}>
      <Select
        defaultValue="เลือกจากโรงบาลใกล้เพียงประจำตำบล"
        style={{ width: "100%" }}
        onChange={props.handleChange}
      >
        {dropdown?.map((dropdownItem) => (
          <Option value={dropdownItem.hospital} id={dropdownItem.id}>
            {dropdownItem.hospital}
          </Option>
        ))}
      </Select>
    </Row>
  );
}

export default HospitalSelect;
