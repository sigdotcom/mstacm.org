import gql from "graphql-tag";
import * as ReactApolloHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

/** The potential errors codes that will be sent to a user. */
export enum ErrorCodes {
  InternalServerError = "INTERNAL_SERVER_ERROR",
  ResourceNotFound = "RESOURCE_NOT_FOUND",
  Unauthenticated = "UNAUTHENTICATED",
  BadUserInput = "BAD_USER_INPUT"
}

export type Extension = {
  __typename?: "Extension";
  code: ErrorCodes;
};

export type Mutation = {
  __typename?: "Mutation";
  createUser: User;
  updateUser: User;
  deleteUser: UserDeletePayload;
  createPermission: Permission;
  deleteResume: User;
  uploadResume: Resume;
  startTransaction: Transaction;
};

export type MutationCreateUserArgs = {
  data: UserCreateInput;
};

export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  id: Scalars["String"];
};

export type MutationDeleteUserArgs = {
  id: Scalars["String"];
};

export type MutationCreatePermissionArgs = {
  data: PermissionCreateInput;
};

export type MutationUploadResumeArgs = {
  resume: Scalars["Upload"];
};

export type MutationStartTransactionArgs = {
  purchases: Array<PurchaseInput>;
};

export type Permission = {
  __typename?: "Permission";
  name: Scalars["ID"];
  users: Array<User>;
};

export type PermissionCreateInput = {
  name: Scalars["String"];
};

export type PermissionDeletePayload = {
  __typename?: "PermissionDeletePayload";
  name?: Maybe<Scalars["String"]>;
};

export type PermissionUpdateInput = {
  name?: Maybe<Scalars["String"]>;
};

export type Product = {
  __typename?: "Product";
  id: Scalars["ID"];
  name: ProductNames;
};

/** All possible products. */
export enum ProductNames {
  SemesterMembership = "SEMESTER_MEMBERSHIP",
  YearMembership = "YEAR_MEMBERSHIP"
}

export type Purchase = {
  __typename?: "Purchase";
  id: Scalars["ID"];
  quantity: Scalars["Float"];
  product: Product;
  transaction: Array<Transaction>;
};

export type PurchaseInput = {
  quantity: Scalars["Float"];
  productName: ProductNames;
};

export type Query = {
  __typename?: "Query";
  user: User;
  users: Array<User>;
  permissions: Array<Permission>;
  transactions: Array<Transaction>;
  me?: Maybe<User>;
};

export type QueryUserArgs = {
  id: Scalars["String"];
};

export type Resume = {
  __typename?: "Resume";
  id: Scalars["ID"];
  url: Scalars["String"];
  added: Scalars["DateTime"];
  user?: Maybe<User>;
};

export type Transaction = {
  __typename?: "Transaction";
  id: Scalars["ID"];
  intent: Scalars["String"];
  charged: Scalars["Float"];
  status: Scalars["String"];
  user: User;
  purchases: Array<Purchase>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  profilePictureUrl: Scalars["String"];
  isSuperAdmin?: Maybe<Scalars["Boolean"]>;
  dateJoined: Scalars["DateTime"];
  graduationDate?: Maybe<Scalars["DateTime"]>;
  membershipExpiration?: Maybe<Scalars["DateTime"]>;
  isActive?: Maybe<Scalars["Boolean"]>;
  resume?: Maybe<Resume>;
  permissions: Array<Permission>;
};

export type UserCreateInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  googleSub: Scalars["String"];
};

export type UserDeletePayload = {
  __typename?: "UserDeletePayload";
  firstName?: Maybe<Scalars["String"]>;
};

export type UserUpdateInput = {
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
};
export type ResumeCardsQueryVariables = {};

export type ResumeCardsQuery = { __typename?: "Query" } & {
  users: Array<
    { __typename?: "User" } & Pick<
      User,
      | "id"
      | "firstName"
      | "lastName"
      | "email"
      | "profilePictureUrl"
      | "graduationDate"
    > & {
        resume: Maybe<
          { __typename?: "Resume" } & Pick<Resume, "url" | "added">
        >;
      }
  >;
};

export const ResumeCardsDocument = gql`
  query ResumeCards {
    users {
      id
      firstName
      lastName
      email
      profilePictureUrl
      graduationDate
      resume {
        url
        added
      }
    }
  }
`;

export function useResumeCardsQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<
    ResumeCardsQuery,
    ResumeCardsQueryVariables
  >
) {
  return ReactApolloHooks.useQuery<ResumeCardsQuery, ResumeCardsQueryVariables>(
    ResumeCardsDocument,
    baseOptions
  );
}
export type ResumeCardsQueryHookResult = ReturnType<typeof useResumeCardsQuery>;
