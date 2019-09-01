import gql from "graphql-tag";

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
      hostSig {
        name
      }
    }
  }
`;

export const CREATE_EVENT: any = gql`
  mutation CreateEvent($data: EventCreateInput!) {
    createEvent(data: $data) {
      eventTitle
    }
  }
`;

export const UPDATE_EVENT: any = gql`
  mutation UpdateEvent($data: EventUpdateInput!, $id: Float!) {
    updateEvent(data: $data, id: $id) {
      eventTitle
    }
  }
`;

export const DELETE_EVENT: any = gql`
  mutation DeleteEvent($id: Float!) {
    deleteEvent(id: $id) {
      id
    }
  }
`;
