import React, { useState, useEffect } from "react";
import { Select, Row } from "antd";
import axios from "../../../config/axios";
const { Option } = Select;
function SelectDepartment(props) {
  const [dropdown, setDropdown] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/departments?accepts=1");

      setDropdown(result.data);
    };
    fetchData();
  }, []);

  return (
    <Row style={{ marginLeft: "150px" }}>
      <Select
        defaultValue="เลือกสาขา"
        style={{ width: 120 }}
        onChange={props.handleChange}
      >
        {dropdown?.map((dropdownItem) => (
          <Option value={dropdownItem.department} id={dropdownItem.id}>
            {dropdownItem.department}
          </Option>
        ))}
      </Select>
    </Row>
  );
}

export default SelectDepartment;
