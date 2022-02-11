import React, { useState } from "react";

import styled, { AnyStyledComponent } from "styled-components";

import { GET_EVENTS } from "./helpers";
import { useDeleteEventMutation } from "../../generated/graphql";
import { IEvent } from "./interfaces";
import { EventFormModal } from "./EventFormModal";
import { QRModal } from "./QRModal"
import { Button } from "antd";

interface IEventProps {
  event: IEvent;
  index: number;
  key: number;
}

const EventWrapper: AnyStyledComponent = styled.li`
  display: flex;
  margin: 20px 0;
  justify-content: space-between;
`;
const EventContent: AnyStyledComponent = styled.div`
  display: flex;
  align-items: center;
`;
const EventFlier: AnyStyledComponent = styled.img`
  height: 88px;
  min-width: 68px;
  margin-right: 20px;
`;
const EventDetails: AnyStyledComponent = styled.div``;
const EventHighLevel: AnyStyledComponent = styled.div`
  display: flex;
`;
const EventTitle: AnyStyledComponent = styled.h3`
  margin: 0;
  line-height: 20px;
`;
const EventDate: AnyStyledComponent = styled.p`
  padding: 0 6px;
  margin: 0 0 0 20px;
  border-radius: 20px;
  border: 2px solid blue;
`;
const EventMidLevel: AnyStyledComponent = styled.div``;
const EventDescription: AnyStyledComponent = styled.div``;
const EventLowLevel: AnyStyledComponent = styled.div``;

const Event: React.FC<IEventProps> = (props: IEventProps): JSX.Element => {
  const [deleteEvent] = useDeleteEventMutation();
  const [formVisible, setFormVisible] = useState(false);
  const [QRVisible, setQRVisible] = useState(false);

  const formatDate: (date: string) => string = (date: string): string => {
    const options: any = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const d: Date = new Date(date);

    return d.toLocaleDateString("en-US", options);
  };

  const handleEdit: () => void = (): void => {
    setFormVisible(true);
  };

  const handleDelete: () => void = (): void => {
    deleteEvent({
      refetchQueries: [{ query: GET_EVENTS }],
      variables: { id: Number(props.event.id) },
    });
  };

  const handleQR: () => void = (): void => {
    setQRVisible(true);
  };

  // const handleAdvert: any = (): any => {};

  // const handleQR: any = (): any => {};

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
          <Button onClick={handleQR}>QR</Button>
        </div>
      </div>
      <EventFormModal
        formVisible={formVisible}
        setFormVisible={setFormVisible}
        event={event}
      />
      <QRModal
        visible={QRVisible}
        setVisible={setQRVisible}
        event={event}
      />
    </EventWrapper>
  );
};

/*
 * Buttons to be added
        <div>
          <Button onClick={handleAdvert}>Advert</Button>
        </div>
*/

export { Event };
