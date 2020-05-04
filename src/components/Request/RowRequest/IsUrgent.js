import React, { useState, useEffect } from "react";
import { Menu, Dropdown } from "antd";
import axios from "../../../config/axios";

function IsUrgent(props) {
  const [isSwap, setIsSwap] = useState(0);
  const urgent = props.isUrgent ? "เร่งด่วน" : "ปกติ";

  const checkRegion = (input) => {
    if (input == 0 || input == 7) {
      return null;
    } else {
      return input;
    }
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <div
          onClick={() => {
            onClickCheckUrgent(0);
          }}
        >
          ปกติ
        </div>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          onClickCheckUrgent(1);
        }}
      >
        เร่งด่วน
      </Menu.Item>
    </Menu>
  );

  const dropdown = (
    <Dropdown overlay={menu}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        โปรดเลือก
      </a>
    </Dropdown>
  );

  const onDoubleClick = () => {
    setIsSwap(1);
  };

  const onClickCheckUrgent = async (status) => {
    await axios.patch(`/requests/urgent?id=${props.id}&urgent=${status}`);

    props.fetchDataRequest(checkRegion(props.indexDefaultFilter));

    setIsSwap(0);
  };

  const show = [urgent, dropdown];
  return <div onDoubleClick={onDoubleClick}>{show[isSwap]}</div>;
}

export default IsUrgent;
