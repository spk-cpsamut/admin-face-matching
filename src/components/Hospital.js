import React from "react";

import { Col, Row, List, Divider } from "antd";
import HospitalName from "./Hospital/HospitalName";

function Hospital(props) {
  return (
    <Col>
      <Row justify="center">
        <Col span={24}>
          <Divider orientation="left">รอการอนุมัติ</Divider>
          <List
            bordered
            dataSource={props.hospital}
            renderItem={(item) => (
              <List.Item>
                <Row style={{ width: "100%" }}>
                  <Col span={3}></Col>
                  <Col> </Col>
                  <Col span={20}>
                    {" "}
                    <HospitalName
                      hospital={item.hospital}
                      key={item.id}
                      id={item.id}
                      fetchDataHospital={props.fetchDataHospital}
                      pds_id={item.pds_id}
                    />
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Col>
  );
}

export default Hospital;
