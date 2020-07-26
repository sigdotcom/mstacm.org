import React from 'react';
import { Redirect } from 'react-router-dom';

const EventRegistration: React.FC<{match: any}> = ({match}: any) => {
  const eventID: string | null = match.params.eventId;

  const redirectUrl: string = "profile.mstacm.org/attend/" + eventID;

  if(eventID === null)
    return <p>Something went wrong while redirecting to your event.</p>

  return (
    <Redirect to={redirectUrl} />
  );
};

export { EventRegistration }