import { useMutation } from "@apollo/react-hooks";
import moment from "moment";
import React from "react";
import styled from "styled-components";

import { DELETE_EVENT } from "./helpers";

import { Button } from "antd";

import { IEvent } from "./interfaces";

interface IEventProps {
  event: IEvent;
  key: number;
}

const EventWrapper: any = styled.li`
  display: flex;
  margin: 20px 0;
  justify-content: space-between;
`;
const EventContent: any = styled.div`
  display: flex;
  align-items: center;
`;
const EventFlier: any = styled.img`
  height: 88px;
  width: 68px;
  margin-right: 20px;
`;
const EventDetails: any = styled.div``;
const EventHighLevel: any = styled.div`
  display: flex;
`;
const EventTitle: any = styled.h3`
  margin: 0;
  line-height: 20px;
`;
const EventDate: any = styled.p`
  padding: 0 6px;
  margin: 0 0 0 20px;
  border-radius: 20px;
  border: 2px solid blue;
`;
const EventMidLevel: any = styled.div``;
const EventDescription: any = styled.div``;
const EventLowLevel: any = styled.div``;

const Event: any = (props: IEventProps): any => {
  const [deleteEvent]: any = useMutation(DELETE_EVENT, {
    onError: (error: any) => {
      console.log(error.toString());
    }
  });

  const formatDate: any = (date: Date): any => {
    return moment(date).format("MMMM Do h:mmA");
  };

  const handleEdit: any = (): any => {};

  const handleDelete: any = (): any => {
    deleteEvent({
      variables: { id: props.event.id }
    });
    // TODO update the event list
  };

  const handleAdvert: any = (): any => {};

  const handleQR: any = (): any => {};

  const { event }: any = props;
  return (
    <EventWrapper>
      <EventContent>
        <EventFlier src={event.flierLink} alt={"Flier"} />
        <EventDetails>
          <EventHighLevel>
            <EventTitle>
              ACM {event.hostSig.name}: {event.eventTitle}
            </EventTitle>
            <EventDate>
              {formatDate(event.dateHosted)}
              {event.dateHosted !== event.dateExpire &&
                " - " + formatDate(event.dateExpire)}
            </EventDate>
          </EventHighLevel>
          <EventMidLevel>
            {event.location}
            {event.eventLink && (
              <span>
                {" "}
                - <a href={event.eventLink}>Link</a>
              </span>
            )}
          </EventMidLevel>
          <EventDescription>{event.description}</EventDescription>
          <EventLowLevel>Created {formatDate(event.dateCreated)}</EventLowLevel>
        </EventDetails>
      </EventContent>
      <div>
        <div>
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </div>
        <div>
          <Button onClick={handleAdvert}>Advert</Button>
          <Button onClick={handleQR}>QR</Button>
        </div>
      </div>
    </EventWrapper>
  );
};

export { Event };
