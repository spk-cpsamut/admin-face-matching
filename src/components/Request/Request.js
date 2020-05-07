import React, { useState, useEffect } from "react";
import { Table } from "antd";
import HospitalIsRequest from "./RowRequest/HospitalIsRequest";
import DateRequest from "./RowRequest/DateRequest";
import RequestAmount from "./RowRequest/RequestAmount";
import ReserveAmount from "./RowRequest/ReserveAmount";
import DeliveredAmount from "./RowRequest/DeliveredAmount";
import _ from "lodash";
import IsUrgent from "./RowRequest/IsUrgent";
import FilterRegion from "./Filter/FilterRegion";

function Request(props) {
  let request;
  if (props.request) {
    request = [...props.request];
  }

  console.log(request);
  console.log(props.request);

  const data = [];
  if (request) {
    for (let row of request) {
      data.push({
        key: _.uniqueId(),
        hospital: (
          <HospitalIsRequest hospital={row.hospital} key={_.uniqueId()} />
        ),
        date: <DateRequest date={row.date} key={_.uniqueId()} />,
        requestAmount: (
          <RequestAmount
            requestAmount={row.requestAmount}
            key={_.uniqueId()}
            id={row.id}
            fetchDataRequest={props.fetchDataRequest}
            indexDefaultFilter={props.indexDefaultFilter}
          />
        ),
        reserveAmount: (
          <ReserveAmount reserveAmount={row.reserveAmount} key={_.uniqueId()} />
        ),
        deliveredAmount: (
          <DeliveredAmount
            deliveredAmount={row.deliveredAmount}
            key={_.uniqueId()}
          />
        ),
        isUrgent: (
          <IsUrgent
            isUrgent={row.isUrgent}
            id={row.id}
            fetchDataRequest={props.fetchDataRequest}
            indexDefaultFilter={props.indexDefaultFilter}
          />
        ),
      });
    }
  }

  const columns = [
    { title: "hospital", dataIndex: "hospital", key: "hospital" },
    { title: "สถานะ", dataIndex: "isUrgent", key: "isUrgent" },

    { title: "คำขอทั้งหมด", dataIndex: "requestAmount", key: "requestAmount" },

    {
      title: "ส่วนที่มีการจอง",
      dataIndex: "reserveAmount",
      key: "reserveAmount",
    },
  ];

  return (
    <div>
      <FilterRegion
        fetchDataRequest={props.fetchDataRequest}
        setIndexDefaultFilter={props.setIndexDefaultFilter}
        indexDefaultFilter={props.indexDefaultFilter}
      />
      <Table dataSource={request} columns={columns} key={_.uniqueId()} />
    </div>
  );
}

export default Request;
