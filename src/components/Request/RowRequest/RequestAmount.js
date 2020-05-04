import React, { useState, useEffect } from "react";
import { Input } from "antd";
import axios from "../../../config/axios";

function RequestAmount(props) {
  const [isSwap, setIsSwap] = useState(0);
  const [inputValue, setInputValue] = useState(props.requestAmount);

  const checkRegion = (input) => {
    if (input == 0 || input == 7) {
      return null;
    } else {
      return input;
    }
  };

  console.log(props.indexDefaultFilter);
  console.log(props.id);

  const requestAmount = props.requestAmount;

  const onDoubleClick = () => {
    setIsSwap(1);
  };

  const onChangeInput = (e) => {
    if (isNaN(Number(e.target.value))) {
    } else {
      setInputValue(e.target.value);
    }
  };

  const onEnter = async (e) => {
    await axios.patch(
      `/requests/urgent?id=${props.id}&request_amount=${inputValue}`
    );
    console.log(props.indexDefaultFilter);
    console.log(props.id);

    props.fetchDataRequest(checkRegion(props.indexDefaultFilter));
  };
  const inputRequestAmount = (
    <Input
      value={inputValue}
      onChange={onChangeInput}
      onPressEnter={onEnter}
      style={{ width: "100px" }}
    />
  );

  const show = [requestAmount, inputRequestAmount];
  return <div onDoubleClick={onDoubleClick}>{show[isSwap]}</div>;
}

export default RequestAmount;
