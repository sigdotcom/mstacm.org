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
      presenter
      flierLink
      eventLink
      urlKey
    }
  }
`;

export const ATTEND_EVENT: any = gql`
  mutation attendEvent($eventId: Float!) {
    attendEvent(eventId: $eventId) {
      attendees {
        id
      }
    }
  }
`;