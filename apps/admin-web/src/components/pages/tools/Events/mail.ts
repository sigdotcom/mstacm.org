import { MailData } from "@sendgrid/helpers/classes/mail";
import moment from "moment";

import { IEvent } from "./interfaces";

const templateEventMessage: string = "d-02ffcf22e9304e59a8c72beb5f8528d7";
const templateFlierRequest: string = "d-c464d76df4ae45cc9c3bf62bdc381a18";

export interface IEventMessageInput {
  event: IEvent;
  to: string[];
  subject: string;
}

export interface IFlierRequestInput {
  numFliers: number;
  event: IEvent;
}

// formerly createMessage
const buildEventMessage: any = (data: IEventMessageInput): MailData => {
  return {
    from: {
      email: "acm@mst.edu"
    },
    personalizations: [
      {
        dynamicTemplateData: {
          datetime: moment(data.event.dateHosted).format(
            "dddd, MMMM Do [at] h:mmA"
          ),
          description: data.event.description,
          eventTitle: data.event.eventTitle,
          flier: data.event.flierLink,
          // host: data.event.hostSigs.name,
          link: data.event.eventLink,
          location: data.event.location,
          subject: data.subject
        },
        to: data.to.map((address: string) => {
          return { email: address };
        })
      }
    ],
    templateId: templateEventMessage
  };
};

const sendEmail: any = (body: MailData): any => {
  console.log("Send mail, not yet implemented", JSON.stringify(body));
};

// formerly createFliers
const buildFlierRequest: any = (data: IFlierRequestInput): MailData => {
  return {
    from: {
      email: "acm@mst.edu"
    },
    personalizations: [
      {
        dynamicTemplateData: {
          flierLink: data.event.flierLink,
          numFliers: String(data.numFliers)
        },
        to: {
          email: "cstask@mst.edu"
        }
      }
    ],
    templateId: templateFlierRequest
  };
};

export { buildEventMessage, sendEmail, buildFlierRequest };
