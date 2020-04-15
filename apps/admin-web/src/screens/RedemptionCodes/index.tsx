import React from "react";

import { Form, Select, Button } from "antd";

import { useCreateCodeMutation } from "../../generated/graphql";

const { Option } = Select;

const RedemptionCodes: React.FC<{}> = () => {
  const [func] = useCreateCodeMutation();
  const onFinish = () => {
    console.log("stuff");
    func({
      variables: {
        permissions: ["view:resumes"],
      },
    });
  };
  return (
    <>
      <Form name="validate_other" onFinish={onFinish}>
        <Form.Item label="Plain Text">
          <span className="ant-form-text">China</span>
        </Form.Item>
        <Form.Item
          name="select"
          label="Select"
          hasFeedback
          rules={[{ required: true, message: "Please select your country!" }]}
        >
          <Select placeholder="Please select a country">
            <Option value="china">China</Option>
            <Option value="usa">U.S.A</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="select-multiple"
          label="Select[multiple]"
          rules={[
            {
              required: true,
              message: "Please select your favourite colors!",
              type: "array",
            },
          ]}
        >
          <Select mode="multiple" placeholder="Please select favourite colors">
            <Option value="red">Red</Option>
            <Option value="green">Green</Option>
            <Option value="blue">Blue</Option>
          </Select>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
  return <h1>bees</h1>;
};

export { RedemptionCodes };
