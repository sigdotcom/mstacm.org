import gql from "graphql-tag";

export const EVENTS_WITH_KEY: any = gql`
  query eventsWithKey($urlKey: String!) {
    eventsWithKey(urlKey: $urlKey) {
        eventTitle
        attendees {
            firstName
            lastName
            email
        }
        usersInterested {
            firstName
            lastName
            email
        }
    }
  }
`;