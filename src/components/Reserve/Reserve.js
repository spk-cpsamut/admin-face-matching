import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { Table } from "antd";

function Reserve(props) {
  const columns = [
    { title: "จำนวนที่จอง", dataIndex: "amount", key: "amount" },
    { title: "เวลาผ่านมาแล้ว(วัน)", dataIndex: "diffDays", key: "diffDays" },
    {
      title: "ชื่อคนจอง",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "เบอร์คนจอง",
      dataIndex: "phone_no",
      key: "phone_no",
    },
    {
      title: "ชื่อคนร้องขอ",
      dataIndex: "name",
      key: "name",
    },
    { title: "ไลน์คนร้องขอ", dataIndex: "line_id", key: "line_id" },
    { title: "ลบการจองนี้", dataIndex: "delete", key: "delete" },
  ];
  return (
    <div>
      <Table dataSource={props.reserve} columns={columns} />;
    </div>
  );
}

export default Reserve;
