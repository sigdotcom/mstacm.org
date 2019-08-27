import React, { useState } from "react";

import { Button, Checkbox, Form, Input, InputNumber } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";

import { IEvent } from "./interfaces";

import {
  buildEventMessage,
  buildFlierRequest,
  IEventMessageInput,
  sendEmail
} from "./mail";

interface IAdvertProps {
  event: IEvent;
}

interface IFormFields {
  numFliers: number;
  subject: string;
  emailGroups: string[];
}

export const AdvertForm: React.FC<IAdvertProps & FormComponentProps> = (
  props: IAdvertProps & FormComponentProps
): any => {
  const [needsConfirmation, setNeedsConfirmation]: any = useState(false);
  const [numFliers, setNumFliers]: any = useState(undefined);
  const [subject, setSubject]: any = useState(undefined);
  const [emailGroups, setEmailGroups]: any = useState([]);

  const openConfirm: any = (): void => {
    setNeedsConfirmation(true);
  };

  const finalSend: any = (e: React.MouseEvent): void => {
    e.preventDefault();

    if (numFliers) {
      const flierBody: any = buildFlierRequest(numFliers);
      console.log("FLIERBODY", flierBody);
      // sendFlierMessage(flierBody); // TODO
    }
    const data: IEventMessageInput = {
      event: props.event,
      subject,
      to: emailGroups
    };
    const body: any = buildEventMessage(data);
    sendEmail(body);
  };

  const handleSubmit: any = (e: any): any => {
    e.preventDefault();

    props.form.validateFields((err: Error, values: IFormFields) => {
      if (!err) {
        setNumFliers(values.numFliers);
        setSubject(values.subject);
        setEmailGroups(values.emailGroups);

        const to: string[] = ["acm-test-grp@mst.edu"]; // The user sending the advert should be here
        const data: IEventMessageInput = {
          event: props.event,
          subject,
          to
        };
        const message: any = buildEventMessage(data);
        sendEmail(message);
        openConfirm();
      }
    });
  };

  const { getFieldDecorator }: any = props.form;

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="Number of Flyers">
          {getFieldDecorator("numFliers", {
            initialValue: 0,
            rules: [
              {
                required: true,
                message: "Please input a number!"
              }
            ]
          })(<InputNumber />)}
        </Form.Item>

        <Form.Item label="Subject Line">
          {getFieldDecorator("subject", {
            rules: [
              {
                required: true,
                message: "Please input a subject!"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Email Groups">
          {getFieldDecorator("emailGroups", {
            rules: [
              {
                required: true,
                message: "Please select at least one list!"
              }
            ]
          })(
            <Checkbox.Group style={{ width: "100%" }}>
              <div>
                <Checkbox value="cstask@mst.edu">CS Task</Checkbox>
              </div>
              <div>
                <Checkbox value="acm-members-grp@mst.edu">ACM Members</Checkbox>
              </div>
              <div>
                <Checkbox value="acm-grp@mst.edu">ACM</Checkbox>
              </div>
            </Checkbox.Group>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" disabled={needsConfirmation} htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {needsConfirmation && (
        <div>
          <h3>Check your email, confirm it looks as you expect.</h3>
          <p>
            Only then should you click this button, it will send to all selected
            lists
          </p>
          <Button type="danger" onClick={finalSend}>
            Confirm Send
          </Button>
        </div>
      )}
    </div>
  );
};
