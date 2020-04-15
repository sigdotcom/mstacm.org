import gql from "graphql-tag";

export const CREATE_CODE: any = gql`
  mutation CreateCode(
    $groups: [String!]
    $permissions: [String!]
    $products: [String!]
  ) {
    createRedemptionCode(
      groupIds: $groups
      permissionIds: $permissions
      productTags: $products
    ) {
      id
      expirationDate
      groups {
        name
      }
      permissions {
        name
      }
      transaction {
        id
      }
    }
  }
`;

export const GET_GROUPS: any = gql`
  query GetGroups {
    groups {
      name
    }
  }
`;
export const GET_PERMISSIONS: any = gql`
  query GetPermissions {
    permissions {
      name
    }
  }
`;
export const GET_PRODUCTS: any = gql`
  query GetProducts {
    products {
      displayName
    }
  }
`;
