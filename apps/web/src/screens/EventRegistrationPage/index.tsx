import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EventRegistration: React.FC = () => {
  const { eventId } = useParams();
  const redirectUrl: string = `https://profile.mstacm.org/attend/${eventId}`;

  useEffect(() => {
    window.location.replace(redirectUrl);
  }, []);

  if (eventId === null)
    return <p>Something went wrong while redirecting to your event.</p>;

  return (
    null
  );
};

export { EventRegistration }