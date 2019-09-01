import React, { useGlobal } from "reactn";

import { useMutation } from "@apollo/react-hooks";
import moment from "moment";

import { CREATE_EVENT, GET_EVENTS, UPDATE_EVENT } from "./helpers";

import { Button, DatePicker, Form, Input, InputNumber } from "antd";

import { IEvent } from "./interfaces";

const { RangePicker }: any = DatePicker;
const { TextArea }: any = Input;

const EventFormBase: React.FC<any> = (props: any): JSX.Element => {
  const [events]: [IEvent[], any] = useGlobal("events");
  const [activeEvent]: [number, any] = useGlobal("activeEvent");

  const event: IEvent | undefined = events[activeEvent];
  const editing: boolean = Boolean(event);
  const newEvent: any = editing ? event : {};

  const [
    createEvent,
    { loading: createLoading, error: createError, data: createData }
  ]: any = useMutation(CREATE_EVENT);
  const [
    updateEvent,
    { loading: updateLoading, error: updateError, data: updateData }
  ]: any = useMutation(UPDATE_EVENT);

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
        if (editing) {
          const id: number = Number(values.id);
          delete values.id;
          updateEvent({
            refetchQueries: [{ query: GET_EVENTS }],
            variables: { data: values, id }
          });
          // UPDATE THE NEW EVENT (values);
        } else {
          createEvent({
            refetchQueries: [{ query: GET_EVENTS }],
            variables: { data: values }
          });
          // CREATE THE NEW EVENT (values);
        }
      }
    });
  };

  const { getFieldDecorator }: any = props.form;

  if (createLoading || updateLoading) {
    return <h1>Loading...</h1>;
  } else if (createError || updateError) {
    try {
      console.log(createError);

      return <h1>{createError.toString()}</h1>;
    } catch {
      console.log(updateError);

      return <h1>{updateError.toString()}</h1>;
    }
  } else if (createData || updateData) {
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
          initialValue: editing ? newEvent.hostSig.name : "",
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
