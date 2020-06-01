import React, { useEffect, useState } from "react";
import gql from "graphql-tag";
import { message } from "antd";
import { useGetCurrentEventsQuery, Event as IEvent } from "../../generated/graphql";

export const GET_CURRENT_EVENTS_QUERY: any = gql`
  query getCurrentEvents {
    currentEvents {
      id
      dateCreated
      dateHosted
      dateExpire
      hostSig {
        name
      }
      eventTitle
      description
      location
      flierLink
      eventLink
      urlKey
    }
  }
`;

const EventRegistration: React.FC<{match: any}> = ({match}: any) => {
  const {
    loading: eventLoading,
    error: eventError,
    data: eventData,
  }: any = useGetCurrentEventsQuery();

  const [curEvents, setCurEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    if (eventLoading) {
      message.info("Event data loading...");
    } else if (eventError) {
      message.info("An error occured loading event data.");
    } else if (eventData) {
      const events: IEvent[] = eventData.currentEvents;
      setCurEvents(events);
      message.success("Member data loaded.");
    }
  }, [eventData, eventLoading, eventError]);

  const eventID: string | null = match.params.eventId;

  const getEventName: Function = (urlArg: string) => {
    console.log(curEvents)
    for (let i = 0; i < curEvents.length; i++) {
      if (curEvents[i].urlKey === urlArg)
        return curEvents[i].eventTitle;
    }
    return "Event with ID {" + urlArg + "} not found";
  };

  if(eventLoading || eventError)
    return <h1>loading</h1>

  return (
    <div>
        <h1>Event Title: {getEventName(eventID)}</h1>
    </div>
  );
};

export { EventRegistration }