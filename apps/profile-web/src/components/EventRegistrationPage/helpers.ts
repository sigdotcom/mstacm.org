import gql from "graphql-tag";

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

export const ADD_ATTENDEE: any = gql`
  mutation AddAttendee($eventId: Float!, $userId: String!) {
    addAttendee(eventId: $eventId, userId: $userId) {
      id
    }
  }
`;