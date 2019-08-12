import { useMutation } from "@apollo/react-hooks";
import { Button, DatePicker, Form, Input, InputNumber } from "antd";
import moment from "moment";
import React from "react";

import { CREATE_EVENT } from "./helpers";
// import { IEvent } from "./interfaces";

const { RangePicker }: any = DatePicker;
const { TextArea }: any = Input;

/*interface IEventFormProps {
  event?: IEvent;
}*/

const EventFormBase: React.FC<any> = (props: any): any => {
  const editing: boolean = Boolean(props.event);
  const newEvent: any = editing ? props.event : {};

  const [
    createEvent,
    { loading: mutationLoading, error: mutationError, data: mutationData }
  ]: any = useMutation(CREATE_EVENT);

  const convertTimes: any = (data: any): any => {
    if (data.hasOwnProperty("dateRange") && data.dateRange) {
      data.dateHosted = data.dateRange[0].toDate();
      data.dateExpire = data.dateRange[1].toDate();
      delete data.dateRange;
    }
  };

  const handleSubmit: any = (e: any): any => {
    e.preventDefault();

    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        convertTimes(values);
        console.log(values);
        if (editing) {
          // UPDATE THE NEW EVENT (values);
        } else {
          createEvent({
            variables: { data: values }
          });
          // CREATE THE NEW EVENT (values);
        }
      }
    });
  };

  const { getFieldDecorator }: any = props.form;

  if (mutationLoading) {
    return <h1>Loading...</h1>;
  } else if (mutationError) {
    return <h1>{mutationError.toString()}</h1>;
  } else if (mutationData) {
    return <h1>Success</h1>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      {editing && (
        <Form.Item label="ID">
          {getFieldDecorator("id", {
            initialValue: newEvent.id,
            rules: [
              {
                required: !editing
              }
            ]
          })(<InputNumber />)}
        </Form.Item>
      )}
      <Form.Item label="Host Community">
        {getFieldDecorator("hostSig", {
          initialValue: newEvent.hostSig,
          rules: [
            {
              required: !editing,
              message: "Please input the host community's name!"
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Name">
        {getFieldDecorator("eventTitle", {
          initialValue: newEvent.eventTitle,
          rules: [
            {
              required: !editing,
              message: "Please input the event's name!"
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Description">
        {getFieldDecorator("description", {
          initialValue: newEvent.description,
          rules: [
            {
              required: !editing,
              message: "Please input the event's description!"
            }
          ]
        })(<TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
      </Form.Item>
      <Form.Item label="Location">
        {getFieldDecorator("location", {
          initialValue: newEvent.location,
          rules: [
            {
              required: !editing,
              message: "Please input the event's location!"
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Flier Address">
        {getFieldDecorator("flierLink", {
          initialValue: newEvent.flierLink,
          rules: [
            {
              type: "url",
              message: "The input is not a valid URL."
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item
        label="Event Link"
        extra="Website, form, or other link to event."
      >
        {getFieldDecorator("eventLink", {
          initialValue: newEvent.eventLink,
          rules: [
            {
              type: "url",
              message: "The input is not a valid URL."
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Date and Time">
        {getFieldDecorator("dateRange", {
          initialValue: [
            moment(newEvent.dateHosted),
            moment(newEvent.dateExpire)
          ],
          rules: [{ type: "array", required: !editing }]
        })(<RangePicker showTime={true} format="MMMM Do h:mm" />)}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const EventForm: any = Form.create({ name: "add" })(EventFormBase);

export { EventForm };
