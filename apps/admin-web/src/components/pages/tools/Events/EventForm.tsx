import * as React from "react"
import { Form, Input, InputNumber, DatePicker, Button } from 'antd';
import moment from "moment"

const { RangePicker } = DatePicker;
const { TextArea } = Input;

class EventForm extends React.Component<any, any> {
  convertTimes = (data: any) => {
    if (data.hasOwnProperty("dateRange") && data.dateRange) {
      data.dateHosted = data.dateRange[0].toDate()
      data.dateExpire = data.dateRange[1].toDate()
      delete data.dateRange
    }
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    const { patchEvent, postEvent, editing } = this.props;
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.convertTimes(values)
        if (editing) {
          patchEvent(values)
        } else {
          postEvent(values)
        }
      }
    });
  }

  render() {
    const { editData, editing } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
      {editing && (
        <Form.Item
          label="ID"
        >
          {getFieldDecorator('id', {
            initialValue: editData.id,
            required: !editing
          })(
            <InputNumber />
          )}
        </Form.Item>
      )}
        <Form.Item
          label="Host Community"
        >
          {getFieldDecorator('hostSigs', {
            initialValue: editData.hostSigs,
            rules: [{
              required: !editing, message: 'Please input the host community\'s name!'
            }]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Name"
        >
          {getFieldDecorator('eventTitle', {
            initialValue: editData.eventTitle,
            rules: [{
              required: !editing, message: 'Please input the event\'s name!'
            }]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Description"
        >
          {getFieldDecorator('description', {
            initialValue: editData.description,
            rules: [{
              required: !editing, message: 'Please input the event\'s description!'
            }]
          })(
            <TextArea autosize={{ minRows: 2, maxRows: 6 }} />

          )}
        </Form.Item>
        <Form.Item
          label="Location"
        >
          {getFieldDecorator('location', {
            initialValue: editData.location,
            rules: [{
              required: !editing, message: 'Please input the event\'s location!'
            }]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Flier Address"
        >
          {getFieldDecorator('flierLink', {
            initialValue: editData.flierLink,
            rules: [{
              type: 'url', message: 'The input is not a valid URL.'
            },
              {
              required: !editing, message: 'Please input your E-mail!',
            }]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Event Link"
          extra="Website, form, or other link to event."
        >
          {getFieldDecorator('eventLink', {
            initialValue: editData.eventLink,
            rules: [{
              type: 'url', message: 'The input is not a valid URL.'
            }]
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Date and Time"
        >
          {getFieldDecorator('dateRange', {
            initialValue: [moment(editData.dateHosted), moment(editData.dateExpire)],
            rules: [{ type: 'array', required: !editing }]
          })(
            <RangePicker
              showTime
              format="MMMM Do h:mm" />
          )}
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    )
  }
}

export default EventForm
