import React, { useState } from "react";

import {
  Button,
  Col,
  Form,
  Icon,
  Input,
  InputNumber,
  message,
  Radio,
  Row,
  Upload
} from "antd";

import gql from "graphql-tag";

import { useMeQuery, useUploadResumeMutation } from "../../generated/graphql";

export const UPLOAD_RESUME: any = gql`
  mutation uploadResume(
    $resume: Upload!
    $grad: DateTime!
    $fname: String!
    $lname: String!
  ) {
    uploadResume(
      resume: $resume
      graduationDate: $grad
      firstName: $fname
      lastName: $lname
    ) {
      url
    }
  }
`;

export const GET_ME: any = gql`
  query me {
    me {
      firstName
      lastName
    }
  }
`;

interface IResumeFormProps {
  form: any;
  setResumeUrl(x: string): void;
}

const ResumeFormBase: React.FC<IResumeFormProps> = ({
  form,
  setResumeUrl
}: IResumeFormProps): JSX.Element => {
  const [files, setFiles] = useState<File[]>([]);

  const [uploadResume] = useUploadResumeMutation();
  let errCount: number = 1;

  const onError: (e: Error) => void = (e: Error): void => {
    errCount += 1;
    if (errCount > 1) {
      message.error(
        `Repeated errors detected! Please contact acm@mst.edu and send "${e.toString()}"`
      );
    } else {
      message.error("Upload failed. Please try again.");
    }
  };

  const handleSubmit: (e: any) => void = (e: any): void => {
    e.preventDefault();

    form.validateFields(async (err: Error, values: any) => {
      if (!err && files.length > 0) {
        let month: number | undefined;
        switch (values.gradSemester) {
          case "spring":
            month = 4;
            break;
          case "summer":
            month = 7;
            break;
          case "fall":
            month = 11;
            break;
          default:
        }
        if (month) {
          const grad: Date = new Date(values.gradYear, month);
          try {
            const result: any = await uploadResume({
              variables: {
                resume: files[0],
                grad,
                fname: values.firstName,
                lname: values.lastName
              }
            });
            if (result.data && result.data.uploadResume.url) {
              setResumeUrl(result.data.uploadResume.url);
            } else {
              onError(Error("No data/incorrect data returned from server."));
            }
          } catch (e) {
            onError(e);
          }
        }
      }
    });
  };

  const { getFieldDecorator }: any = form;

  const parm = {
    accept: ".pdf",
    name: "resume.pdf",
    multiple: false,
    fileList: files,
    onRemove: (newFile: any): void => {
      setFiles([]);
    },
    beforeUpload: (newFile: any): boolean => {
      setFiles([newFile]);

      return false;
    }
  };

  const result: any = useMeQuery();

  return (
    <Form onSubmit={handleSubmit}>
      <Row gutter={8}>
        <Col span={7}>
          <Form.Item label="First Name">
            {getFieldDecorator("firstName", {
              initialValue:
                result.data && result.data.me ? result.data.me.firstName : "",
              rules: [{ required: true, message: "Full name is required!" }]
            })(<Input placeholder="First" />)}
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item label="Last Name">
            {getFieldDecorator("lastName", {
              initialValue:
                result.data && result.data.me ? result.data.me.lastName : "",
              rules: [{ required: true, message: "Full name is required!" }]
            })(<Input placeholder="Last" />)}
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Graduation Date">
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item label="Semester">
              {getFieldDecorator("gradSemester", { initialValue: "spring" })(
                <Radio.Group>
                  <Radio.Button value="spring">Spring</Radio.Button>
                  <Radio.Button value="summer">Summer</Radio.Button>
                  <Radio.Button value="fall">Fall</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="Year">
              {getFieldDecorator("gradYear", { initialValue: 2019 })(
                <InputNumber min={2019} />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item label="Resume File">
        {getFieldDecorator("resume", {
          valuePropName: "file"
        })(
          <Upload.Dragger {...parm}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">Support for a single file upload.</p>
          </Upload.Dragger>
        )}
      </Form.Item>
      <Form.Item>
        <Button
          disabled={Boolean(files.length === 0)}
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const ResumeForm: any = Form.create({ name: "add" })(ResumeFormBase);

export { ResumeForm };
