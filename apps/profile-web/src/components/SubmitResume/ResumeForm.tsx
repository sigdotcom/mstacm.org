import React, { useState } from "react";

import {
  Button,
  Form,
  Icon,
  InputNumber,
  message,
  Radio,
  Row,
  Upload
} from "antd";

import gql from "graphql-tag";

import { useUploadResumeMutation } from "../../generated/graphql";

export const UPLOAD_RESUME: any = gql`
  mutation uploadResume($resume: Upload!, $grad: DateTime!) {
    uploadResume(resume: $resume, graduationDate: $grad) {
      url
    }
  }
`;

const ResumeFormBase: React.FC<any> = ({
  form,
  setSubmitted,
  setResumeUrl
}: any): JSX.Element => {
  const [files, setFiles] = useState<any>([]);

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
              variables: { resume: files[0], grad }
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

  return (
    <Form onSubmit={handleSubmit}>
      <Row gutter={8}>
        <Form.Item label="Graduation Semester">
          {getFieldDecorator("gradSemester")(
            <Radio.Group>
              <Radio.Button value="spring">Spring</Radio.Button>
              <Radio.Button value="summer">Summer</Radio.Button>
              <Radio.Button value="fall">Fall</Radio.Button>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="Graduation Year">
          {getFieldDecorator("gradYear", { initialValue: 2019 })(
            <InputNumber min={2019} />
          )}
        </Form.Item>
      </Row>
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
