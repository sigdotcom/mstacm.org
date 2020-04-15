import gql from "graphql-tag";

export const GET_MEMBERS: any = gql`
  query members {
      users {
        id
        firstName
        lastName
        email
        isActive
        membershipExpiration
        shirtReceived
    }
  }
`;

export const UPDATE_EXPIRATION_DATE: any = gql`
  mutation UpdateExpirationDate($date: DateTime!, $id: String!) {
    updateExpirationDate(newExpirationDate: $date, userId: $id) {
      id
    }
  }
`;

export const UPDATE_SHIRT_RECEIVED: any = gql`
  mutation UpdateShirtReceived($received: Boolean!, $id: String!) {
    updateShirtReceived(updatedShirtStatus: $received, userId: $id) {
      id
    }
  }
`;

export const RESET_SHIRT_RECEIVED: any = gql`
  mutation ResetShirtReceived {
    resetShirtReceived {
        shirtReceived
    }
  }
`;

export const DELETE_USER: any = gql`
  mutation DeleteMember($id: String!) {
    deleteUser(id: $id) {
      firstName
    }
  }
`;