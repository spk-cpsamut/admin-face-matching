import React from "react";
import Nav from "./Nav";
import { Col, Row, List, Divider, Button } from "antd";
import DepartmentName from "./Department/DepartmentName";

function Department(props) {
  return (
    <Col>
      <Row justify="center">
        <Col span={18}>
          <Divider orientation="left">รอการอนุมัติ</Divider>
          <List
            bordered
            dataSource={props.department}
            renderItem={(item) => (
              <List.Item>
                <Row style={{ width: "100%" }}>
                  <Col span={3}></Col>
                  <Col> </Col>
                  <Col span={16}>
                    {" "}
                    <DepartmentName
                      department={item.department}
                      key={item.id}
                      id={item.id}
                      fetchData={props.fetchData}
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

export default Department;
