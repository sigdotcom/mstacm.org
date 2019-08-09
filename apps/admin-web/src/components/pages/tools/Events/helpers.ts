import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { IEvent } from "./interfaces";

export const GET_EVENTS: any = gql`
  {
    events {
      id
      dateCreated
      dateHosted
      dateExpire
      creator {
        firstName
        lastName
      }
      eventTitle
      description
      location
      flierLink
      eventLink
    }
  }
`;
// TODO ADD HOSTSIGS

const getEvents: any = (): any => {
  return useQuery(GET_EVENTS);
};

const updateEvent: any = (event: IEvent): void => {
  const [updateEventMutation]: any = useMutation(gql`
      mutation updateEvent(data: $event){
          id
      }
  `);
  updateEventMutation({ variables: { event } });
};

export { getEvents, updateEvent };
