import React, { useGlobal, useState } from "reactn";

import moment from "moment";

import { GET_EVENTS } from "./helpers";
import {
  useCreateEventMutation,
  useUpdateEventMutation,
  useSigsQuery,
} from "../../generated/graphql";

import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Upload,
  Select,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";

import { IEvent, IHostSig } from "./interfaces";
import { UploadFile, UploadProps } from "antd/lib/upload/interface";

const { RangePicker }: any = DatePicker;
const { TextArea }: any = Input;

const EventForm: React.FC<{}> = (): JSX.Element => {
  const [form] = Form.useForm();

  const [events]: [IEvent[], any] = useGlobal("events");
  const [activeEvent]: [number, any] = useGlobal("activeEvent");

  const event: IEvent | undefined = events[activeEvent];
  const editing: boolean = Boolean(event);
  const newEvent: any = editing ? event : {};

  const [
    createEvent,
    { loading: createLoading, error: createError, data: createData },
  ]: any = useCreateEventMutation();
  const [
    updateEvent,
    { loading: updateLoading, error: updateError, data: updateData },
  ]: any = useUpdateEventMutation();
  const [files, setFiles] = useState<UploadFile[]>([]);
  const { loading, error, data } = useSigsQuery();

  const convertTimes: any = (data: any): any => {
    if (data.hasOwnProperty("dateRange") && data.dateRange) {
      data.dateHosted = data.dateRange[0].toDate();
      data.dateExpire = data.dateRange[1].toDate();
      delete data.dateRange;
    }
  };

  const Sigs: any = () => {
    if (loading) return;
    // "Loading...";
    else if (error) return;
    // `Error! ${error.message}`;
    else if (data) {
      return data.sigs.map((sig: IHostSig, index: number) => (
        <Select.Option value={sig.name} key={index}>
          {sig.name}
        </Select.Option>
      ));
    }
    return;
  };

  const handleSubmit: any = (values: any): any => {
    convertTimes(values);
    delete values.flier;
    if (editing) {
      const id: number = Number(values.id);
      delete values.id;
      console.log("VALUES", values);
      updateEvent({
        refetchQueries: [{ query: GET_EVENTS }],
        variables: {
          flier: files.length > 0 ? files[0] : undefined,
          data: values,
          id,
        },
      });
      // UPDATE THE NEW EVENT (values);
    } else {
      createEvent({
        refetchQueries: [{ query: GET_EVENTS }],
        variables: { data: values, flier: files[0] },
      });
      // CREATE THE NEW EVENT (values);
    }
  };

  const { getFieldDecorator }: any = form;
  const params: UploadProps = {
    accept: ".jpg",
    multiple: false,
    fileList: files,
    onRemove: (): void => {
      setFiles([]);
    },
    beforeUpload: (newFile: UploadFile): boolean => {
      setFiles([newFile]);

      // Uploading will be stopped with false or a rejected Promise returned.
      return false;
    },
  };

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
    <Form onFinish={handleSubmit}>
      {editing && (
        <Form.Item label="ID">
          {getFieldDecorator("id", {
            initialValue: newEvent.id,
            rules: [
              {
                required: !editing,
              },
            ],
          })(<InputNumber />)}
        </Form.Item>
      )}
      <Form.Item label="Host Community">
        {getFieldDecorator("hostSig", {
          initialValue: editing ? newEvent.hostSig.name : undefined,
          rules: [
            {
              required: !editing,
              message: "Please choose a host community's name!",
            },
          ],
        })(<Select>{Sigs()}</Select>)}
      </Form.Item>
      <Form.Item label="Name">
        {getFieldDecorator("eventTitle", {
          initialValue: newEvent.eventTitle,
          rules: [
            {
              required: !editing,
              message: "Please input the event's name!",
            },
          ],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Description">
        {getFieldDecorator("description", {
          initialValue: newEvent.description,
          rules: [
            {
              required: !editing,
              message: "Please input the event's description!",
            },
          ],
        })(<TextArea autoSize={{ minRows: 2, maxRows: 6 }} />)}
      </Form.Item>
      <Form.Item label="Location">
        {getFieldDecorator("location", {
          initialValue: newEvent.location,
          rules: [
            {
              required: !editing,
              message: "Please input the event's location!",
            },
          ],
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
              message: "The input is not a valid URL.",
            },
          ],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Event Flier">
        {getFieldDecorator("flier", {
          valuePropName: "file",
        })(
          <Upload.Dragger {...params}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">Support for a single file upload.</p>
          </Upload.Dragger>
        )}
      </Form.Item>

      <Form.Item label="Date and Time">
        {getFieldDecorator("dateRange", {
          initialValue: [
            moment(newEvent.dateHosted),
            moment(newEvent.dateExpire),
          ],
          rules: [{ type: "array", required: !editing }],
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

export { EventForm };
