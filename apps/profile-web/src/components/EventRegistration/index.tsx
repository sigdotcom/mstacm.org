import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useMeQuery, 
         useEventsQuery,
         useAddAttendeeMutation,
         Event as IEvent } from "../../generated/graphql";

const EventRegistration: React.FC<{match: any}> = ({match}: any) => {
  //style sheets for output
  const divStyle = {
    margin: "auto",
    justifyContent: "center",
    textAlign: "center" as const,
    marginTop: "10%",
  }

  const errorStyle = {
    color: "red",
    fontSize: 32,
    margin: "auto",
    fontWeight: 100,
    marginBottom: "10%",
  } as React.CSSProperties;

  const successStyle = {
    color: "#3c2eff",
    fontSize: 32,
    margin: "auto",
    fontWeight: 100,
    marginBottom: "10%",
  } as React.CSSProperties;

  const linkStyle = {
    fontSize: 30,
    margin: "auto",
    fontWeight: 100,
    fontStyle: "italic",
  }
  
  const {
    loading: userLoading,
    error: userError,
  }: any = useMeQuery();
  
  const {
    loading: eventLoading,
    error: eventError,
    data: eventData,
  }: any = useEventsQuery();

  const [addAttendee]: any = useAddAttendeeMutation();

  const [curEvents, setCurEvents] = useState<IEvent[]>([]);

  const result: any = useMeQuery();

  useEffect(() => {
    if (eventLoading) {
      //message.info("Event data loading...");
    } else if (eventError) {
      message.info("An error occured loading event data.");
    } else if (eventData) {
      const events: IEvent[] = eventData.events;
      setCurEvents(events);
      //message.success("Event data loaded.");
    }
  }, [eventData, eventLoading, eventError]);

  useEffect(() => {
    if (userLoading) {
      //message.info("User data loading...");
    } else if (userError) {
      message.info("An error occured loading user data.");
    }
  }, [userLoading, userError]);

  //once all mutations/queries are loaded, the actual attendance is tracked
  useEffect(() => {
    if(curEvents && addAttendee && result.data) {
      if(result.data.me.id != null)
        if(getEventId(eventUrlKey) != -1) {
          addAttendee({
            variables: {
              userId: result.data.me.id,
              eventId: Number(getEventId(eventUrlKey))
            }
          });
        }
        else
          message.error("Event does with URL key {" + eventUrlKey + "} does not exist.");
      else
        message.error("User ID is null.");
    }
  }, [curEvents, addAttendee]);

  const eventUrlKey: string | null = match.params.eventId;

  const getEventId: Function = (urlArg: string) => {
    for (let i = 0; i < curEvents.length; i++) {
      if (curEvents[i].urlKey === urlArg)
        return curEvents[i].id;
    }
    return -1;
  };

  if(eventLoading || eventError || userLoading || userError)
    return <p>Loading...</p>

  if(result.data == null || getEventId(eventUrlKey) == -1 || !addAttendee)
    return (
      <div style={divStyle}>
        <p style={errorStyle}>An error has occured.</p>
        <a style={linkStyle} href="https://www.mstacm.org/">Return to homepage</a>
      </div>
    );

  //this default return statement can only be reached with
  //  the same conditions under which the attendance is tracked
  return (
    <div style={divStyle}>
      <p style={successStyle}>Attendance has been successfully recorded!</p>
      <a style={linkStyle} href="https://www.mstacm.org/">Return to homepage</a>
    </div>
  );
};

export { EventRegistration }