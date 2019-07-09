import * as React from "react"
import moment from "moment"
import { Form, Input, InputNumber, Checkbox, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { MailData } from "@sendgrid/helpers/classes/mail";

import { IEvent } from "./interfaces"

interface IAdvertProps {
  sendEvent: (body: any, fin: boolean) => void;
  data: IEvent;
}

interface IAdvertState {
  confirmation: boolean;
  values: {
    numFliers: number;
    emailGroups: string[];
    subject: string;
  }
}

interface IEmailAddress {
  email: string;
}

interface IForm {
  numFliers: number;
  subject: string;
  emailGroups: string[];
}

class AdvertForm extends React.Component<IAdvertProps & FormComponentProps, IAdvertState> {
  public constructor(props: IAdvertProps & FormComponentProps) {
    super(props)

    this.state = {
      confirmation: false,
      values: {
        numFliers: 0,
        emailGroups: [],
        subject: ""
      }
    }
  }

  private createMessage = (to: IEmailAddress[], values: IForm) => {
    const { data } = this.props;
    return {
      "from": {
        email: "acm@mst.edu"
      },
      personalizations: [{
        to: to,
        dynamic_template_data: {
          subject: values.subject,
          datetime: moment(data.dateHosted).format("dddd, MMMM Do [at] h:mmA"),
          flier: data.flierLink,
          host: data.hostSigs.name,
          eventTitle: data.eventTitle,
          location: data.location,
          description: data.description,
          link: data.eventLink
        }
      }],
      template_id: "d-02ffcf22e9304e59a8c72beb5f8528d7"
    }
  }
 
  
  private createFliers(numFliers: number) {
    const { flierLink } = this.props.data;
    return {
      "from": {
        email: "acm@mst.edu"
      },
      personalizations: [{
        to: {
          email: "cstask@mst.edu"
        },
        dynamic_template_data: {
          numFliers: numFliers,
          flierLink: flierLink
        }
      }],
      template_id: "d-c464d76df4ae45cc9c3bf62bdc381a18"
    }
  }

  private handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err: Error, values: IForm) => {
      if (!err) {
        let targets: IEmailAddress[] = [{
          email: "acm-test-grp@mst.edu"
        }] // The user sending the advert should be here
        this.setState({
          values
        })
        const body: MailData = this.createMessage(targets, values)
        this.props.sendEvent(body, false)
        this.openConfirm()
      }
    });
  }

  private openConfirm = () => {
    this.setState({
      confirmation: true
    });
  }

  private finalSend = (e: React.MouseEvent) => {
    e.preventDefault()
    const { values } = this.state;
    if (values.numFliers) {
      const flierBody = this.createFliers(values.numFliers)
      this.props.sendEvent(flierBody, false)
    }
    let targets: IEmailAddress[] = values.emailGroups.map((addr: string) => {
      return { email: addr }
    })
    const body: MailData = this.createMessage(targets, values);
    this.props.sendEvent(body, true)
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    const { confirmation } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            label="Number of Flyers"
          >
            {getFieldDecorator('numFliers', {
              initialValue: 0,
              rules: [{
                required: true, message: 'Please input a number!'
              }]
            })(
              <InputNumber />
            )}
          </Form.Item>

          <Form.Item
            label="Subject Line"
          >
            {getFieldDecorator('subject', {
              rules: [{
                required: true, message: 'Please input a subject!'
              }]
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            label="Email Groups"
          >
            {getFieldDecorator("emailGroups", {
              rules: [{
                required: true, message: 'Please select at least one list!'
              }],
            })(
              <Checkbox.Group style={{ width: "100%" }}>
                <div>
                  <Checkbox value="cstask@mst.edu">
                    CS Task
                  </Checkbox>
                </div>
                <div>
                  <Checkbox value="acm-members-grp@mst.edu">
                    ACM Members
                  </Checkbox>
                </div>
                <div>
                  <Checkbox value="acm-grp@mst.edu">
                    ACM
                  </Checkbox>
                </div>
              </Checkbox.Group>
            )}
          </Form.Item>
          <Form.Item >
            <Button type="primary" disabled={confirmation} htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        {confirmation && (
          <div>
            <h3>Check your email, confirm it looks as you expect.</h3>
            <p>Only then should you click this button, it will send to all selected lists</p>
            <Button type="danger" onClick={this.finalSend}>Confirm Send</Button>
          </div>
        )}
      </div>
    )
  }
}

export default AdvertForm
