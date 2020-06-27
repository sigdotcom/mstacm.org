import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useMeQuery, 
         useGetCurrentEventsQuery,
         useAddAttendeeMutation,
         Event as IEvent, 
         User as IUser } from "../../generated/graphql";

const EventRegistration: React.FC<{match: any}> = ({match}: any) => {
  //style sheets for output
  const errorStyle = {
    color: "red",
    fontSize: 32,
    margin: "auto",
    fontWeight: 100,
    textAlign: "center",
    position: "relative",
    top: '45%',
  } as React.CSSProperties;

  const successStyle = {
    color: "#3c2eff",
    fontSize: 32,
    margin: "auto",
    fontWeight: 100,
    textAlign: "center",
    position: "relative",
    top: '45%',
  } as React.CSSProperties;
  
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  }: any = useMeQuery();
  
  const {
    loading: eventLoading,
    error: eventError,
    data: eventData,
  }: any = useGetCurrentEventsQuery();

  const [
    addAttendee,
    {
      loading: attendeeLoading,
      error: attendeeError,
      data: attendeeData,
    },
  ]: any = useAddAttendeeMutation();

  const [curEvents, setCurEvents] = useState<IEvent[]>([]);
  const [curUser, setCurUser] = useState<IUser>();

  useEffect(() => {
    if (eventLoading) {
      //message.info("Event data loading...");
    } else if (eventError) {
      message.info("An error occured loading event data.");
    } else if (eventData) {
      const events: IEvent[] = eventData.currentEvents;
      setCurEvents(events);
      //message.success("Event data loaded.");
    }
  }, [eventData, eventLoading, eventError]);

  useEffect(() => {
    if (attendeeLoading) {
      //message.info("Attendee data loading...");
    } else if (attendeeError) {
      message.info("An error occured loading attendee data.");
    } else if (attendeeData) {
      //message.success("Attendee data loaded.");
    }
  }, [attendeeData, attendeeLoading, attendeeError]);

  useEffect(() => {
    if (userLoading) {
      //message.info("User data loading...");
    } else if (userError) {
      message.info("An error occured loading user data.");
    } else if (userData) {
      setCurUser(userData);
      //message.success("User data loaded.");
    }
  }, [userData, userLoading, userError]);

  //once all mutations/queries are loaded, the actual attendance is tracked
  useEffect(() => {
    if(eventData && userData && addAttendee) {
      if(curUser?.id != null)
        addAttendee(getEventId(eventUrlKey), curUser?.id); //attendance tracked
      else
        message.error("User ID is null.");
    }
  }, [eventData, userData, addAttendee]);

  const eventUrlKey: string | null = match.params.eventId;

  const getEventId: Function = (urlArg: string) => {
    for (let i = 0; i < curEvents.length; i++) {
      if (curEvents[i].urlKey === urlArg)
        return curEvents[i].id;
    }
    return "Event with URL key {" + urlArg + "} not found";
  };

  if(eventLoading || eventError || userLoading || userError)
    return <p>Loading...</p>

  if(curUser?.id == null)
    return <p style={errorStyle}>An error has occured.</p>

  //this default return statement can only be reached with
  //  the same conditions under which the attendance is tracked
  return (
    <p style={successStyle}>Attendance has been successfully recorded!</p>
  );
};

export { EventRegistration }