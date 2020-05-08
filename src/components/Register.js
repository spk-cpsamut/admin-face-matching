import React, { useState, useEffect } from "react";
import { Form, Input, Select, Row, Col, Button } from "antd";
import { Redirect } from "react-router-dom";
import axios from "../config/axios";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 9,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
function Register() {
  const { Option } = Select;
  const [goto, setGoto] = useState(false);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    let body = {};
    body.username = values.email;
    body.password = values.password;
    console.log("Received values of form: ", body);
    axios.post("/admin/register", body).then(() => {
      setGoto(true);
    });
  };

  return (
    <Col>
      <Row justify="center">
        <Col>
          <h1>Register Page</h1>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Form
            {...formItemLayout}
            name="register"
            onFinish={onFinish}
            initialValues={{
              residence: ["zhejiang", "hangzhou", "xihu"],
              prefix: "86",
            }}
            scrollToFirstError
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
          {goto ? <Redirect to={"/receivelogin"} /> : null}
        </Col>
      </Row>
    </Col>
  );
}

export default Register;
