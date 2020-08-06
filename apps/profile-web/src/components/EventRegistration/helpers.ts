import gql from "graphql-tag";

export const GET_EVENTS: any = gql`
  query events {
    events {
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
  mutation addAttendee($userId: String!, $eventId: Float!) {
    addAttendee(userId: $userId, eventId: $eventId) {
      attendees {
        id
      }
    }
  }
`;