import React, { useEffect }  from 'react';

const EventRegistration: React.FC<{match: any}> = ({match}: any) => {
  useEffect(() => {
    window.location.replace(redirectUrl);
  }, []);

  const eventID: string | null = match.params.eventId;

  const redirectUrl: string = "https://profile.mstacm.org/attend/" + eventID;

  if(eventID === null)
    return <p>Something went wrong while redirecting to your event.</p>;

  return (
    null
  );
};

export { EventRegistration }