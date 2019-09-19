import React, { useState } from "react";

import { Button, Form, Icon, InputNumber, Radio, Row, Upload } from "antd";

import gql from "graphql-tag";

import { useUploadResumeMutation } from "../../generated/graphql";

export const UPLOAD_RESUME: any = gql`
  mutation uploadResume($resume: Upload!) {
    uploadResume(resume: $resume) {
      id
    }
  }
`;

const ResumeFormBase: React.FC<any> = (props: any): JSX.Element => {
  const [file, setFile] = useState(undefined);
  const [fileInfo, setFileInfo] = useState<any>([]);

  const [uploadResume] = useUploadResumeMutation();

  if (file) {
    console.log("nice");
  }

  const handleSubmit: any = (e: any): any => {
    e.preventDefault();

    props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        console.log(values, file);
        const result: any = await uploadResume({
          variables: { resume: file }
        });
        console.log(result);
      }
    });
  };

  const { getFieldDecorator }: any = props.form;

  const parm = {
    accept: ".pdf",
    name: "resume.pdf",
    multiple: false,
    fileList: fileInfo,
    onChange: (info: any) => {
      setFileInfo([info.file]);
    },
    onRemove: (newFile: any) => {
      setFile(undefined);
    },
    beforeUpload: (newFile: any) => {
      setFile(newFile);

      return false;
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row gutter={8}>
        <Form.Item label="Graduation Semester">
          {getFieldDecorator("grad-semester")(
            <Radio.Group>
              <Radio.Button value="spring">Spring</Radio.Button>
              <Radio.Button value="summer">Summer</Radio.Button>
              <Radio.Button value="fall">Fall</Radio.Button>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="Graduation Year">
          {getFieldDecorator("grad-year", { initialValue: 2019 })(
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const ResumeForm: any = Form.create({ name: "add" })(ResumeFormBase);

export { ResumeForm };
