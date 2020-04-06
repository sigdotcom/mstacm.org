import gql from "graphql-tag";

export const SU_QUERY: any = gql`
  query superUser {
    me {
      isSuperAdmin
    }
  }
`;
