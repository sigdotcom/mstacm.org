import React from "react";

const EventRegistration: React.FC<{match: any}> = ({match}: any) => {
  const eventID: string | null = match.params.eventId;

  return (
    <div>
        <h1>Event ID: {eventID}</h1>
    </div>
  );
};

export { EventRegistration }