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
