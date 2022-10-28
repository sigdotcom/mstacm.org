import React, { useState } from "react";

import moment from "moment";

import { GET_EVENTS } from "./helpers";
import {
  useCreateEventMutation,
  useUpdateEventMutation,
  useSigsQuery,
  EventUpdateInput,
  EventCreateInput,
} from "../../generated/graphql";

import { Button, DatePicker, Form, Input, Upload, Select } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import { IEvent, IHostSig } from "./interfaces";

const { RangePicker }: any = DatePicker;
const { TextArea }: any = Input;

interface IEventFormProps {
  eventBase: IEvent | undefined;
}

const EventForm: React.FC<IEventFormProps> = ({
  eventBase,
}: IEventFormProps): JSX.Element => {
  const [
    createEvent,
    { loading: createLoading, error: createError, data: createData },
  ]: any = useCreateEventMutation();
  const [
    updateEvent,
    { loading: updateLoading, error: updateError, data: updateData },
  ]: any = useUpdateEventMutation();
  const { loading, error, data } = useSigsQuery();
  const [event, setEvent] = useState<any>(eventBase || {});
  const [editing] = useState(Boolean(eventBase));
  const [submitted, setSubmitted] = useState(false);

  const convertTimes: any = (data: any): any => {
    if (data.hasOwnProperty("dateRange") && data.dateRange) {
      data.dateHosted = data.dateRange[0].toDate();
      data.dateExpire = data.dateRange[1].toDate();
      delete data.dateRange;
    }
  };

  const Communities: any = () => {
    if (loading) return;
    // "Loading...";
    else if (error) return;
    // `Error! ${error.message}`;
    else if (data) {
      return data.sigs.map((community: IHostSig, index: number) => (
        <Select.Option value={community.name} key={index}>
          {community.name}
        </Select.Option>
      ));
    }
    return;
  };

  const handleSubmit: any = (values: any): any => {
    console.log("VALUES", values);
    convertTimes(values);
    if (editing) {
      delete values.id;
      const payload: EventUpdateInput = {
        description: values.description,
        hostSig: values.community,
        location: values.location,
        eventLink: values.link,
        eventTitle: values.title,
        dateHosted: values.dateHosted,
        dateExpire: values.dateExpire,
      };
      updateEvent({
        refetchQueries: [{ query: GET_EVENTS }],
        variables: {
          flier: values.flier?.file,
          data: payload,
          id: Number((eventBase as IEvent).id),
        },
      });
      // UPDATE THE NEW EVENT (values);
    } else {
      const payload: EventCreateInput = {
        description: values.description,
        hostSig: values.community,
        location: values.location,
        eventLink: values.link,
        eventTitle: values.title,
        dateHosted: values.dateHosted,
        dateExpire: values.dateExpire,
      };
      createEvent({
        refetchQueries: [{ query: GET_EVENTS }],
        variables: { data: payload, flier: values.flier?.file },
      });
      // CREATE THE NEW EVENT (values);
    }
    setSubmitted(true);
  };

  if (submitted) {
    if (createLoading || updateLoading) {
      return <h1>Loading...</h1>;
    }
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
    if (createError || updateError) {
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
  }

  const handleChange = (values: any) => {
    setEvent({
      description: values.description,
      hostSig: { name: values.community },
      location: values.location,
      eventLink: values.link,
      eventTitle: values.title,
      dateHosted: values.dateHosted,
      dateExpire: values.dateExpire,
    });
  };

  return (
    <Form
      onFinish={handleSubmit}
      onValuesChange={handleChange}
      initialValues={{
        community: event?.hostSig?.name,
        title: event?.eventTitle,
        description: event?.description,
        location: event?.location,
        link: event?.eventLink,
        dateRange: [moment(event?.dateHosted), moment(event?.dateExpire)],
      }}
    >
      <Form.Item
        name="community"
        label="Host Community"
        rules={[
          {
            required: !editing,
            message: "Please choose a host community's name!",
          },
        ]}
      >
        <Select>{Communities()}</Select>
      </Form.Item>
      <Form.Item
        name="title"
        label="Name"
        rules={[
          {
            required: !editing,
            message: "Please input the event's name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: !editing,
            message: "Please input the event's description!",
          },
        ]}
      >
        <TextArea
          value={event?.description}
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
      </Form.Item>
      <Form.Item
        name="location"
        label="Location"
        rules={[
          {
            required: !editing,
            message: "Please input the event's location!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="presenter"
        label="Presenter"
        rules={[
          {
            message: "Please input the Presenter's name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="link"
        label="Event Link"
        extra="Website, form, or other link to event."
        rules={[
          {
            type: "url",
            message: "The input is not a valid URL.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Event Flier">
        <Form.Item name="flier" noStyle>
          <Upload.Dragger
            accept=".jpg"
            multiple={false}
            beforeUpload={() => false}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>

      <Form.Item
        name="dateRange"
        label="Date and Time"
        rules={[{ type: "array", required: !editing }]}
      >
        <RangePicker showTime={true} format="MMMM Do h:mm" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export { EventForm };
