import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, Row, Col, Modal } from "antd";
import "../css/nav.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import axios from "../config/axios";

function Login(props) {
  const [visible, setVisible] = useState(false);

  const handleOk = (e) => {
    console.log(e);
    setVisible(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };

  const onFinish = (values) => {
    const body = values;
    console.log("Received values of form: ", body);

    axios
      .post(`/admin/login`, body)
      .then((result) => {
        console.log("pass then");
        props.setUser("admin");
        localStorage.setItem("ACCESS_TOKEN", result.data);
      })
      .catch((err) => {
        console.log("username or password is incorrect");
        console.log(err);
        setVisible(true);
      });
  };

  return (
    <div>
      <div>
        <Modal
          title="อีเมล หรือ พาสเวิร์ด ผิดพลาด"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>ลองดูอีกครั้ง</p>
          <p>หรือ ไปที่ forget password</p>
        </Modal>
      </div>

      <Row justify="center">
        <Col>
          <h1>Login Page</h1>
        </Col>
      </Row>
      <Row justify="center">
        {" "}
        <Col span={7}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <Link to={"/register"}>Register Now !</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
