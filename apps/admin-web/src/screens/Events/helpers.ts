import gql from "graphql-tag";

export const GET_SIGS: any = gql`
  query sigs {
    sigs {
      name
    }
  }
`;

export const GET_EVENTS: any = gql`
  query events {
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
  mutation CreateEvent($flier: Upload, $data: EventCreateInput!) {
    createEvent(flier: $flier, data: $data) {
      eventTitle
    }
  }
`;

export const UPDATE_EVENT: any = gql`
  mutation UpdateEvent($flier: Upload, $data: EventUpdateInput, $id: Float!) {
    updateEvent(flier: $flier, data: $data, id: $id) {
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
