import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
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
  BadUserInput = "BAD_USER_INPUT",
}

export type Event = {
  __typename?: "Event";
  id: Scalars["ID"];
  dateCreated: Scalars["DateTime"];
  dateHosted: Scalars["DateTime"];
  dateExpire: Scalars["DateTime"];
  creator: User;
  hostSig: Sig;
  eventTitle: Scalars["String"];
  description: Scalars["String"];
  location: Scalars["String"];
  flierLink?: Maybe<Scalars["String"]>;
  eventLink?: Maybe<Scalars["String"]>;
  urlKey?: Maybe<Scalars["String"]>;
  attendees?: Maybe<Array<User>>;
};

export type EventCreateInput = {
  eventTitle: Scalars["String"];
  dateHosted: Scalars["DateTime"];
  dateExpire: Scalars["DateTime"];
  description: Scalars["String"];
  location: Scalars["String"];
  flierLink?: Maybe<Scalars["String"]>;
  eventLink?: Maybe<Scalars["String"]>;
  hostSig: Scalars["String"];
};

export type EventDeletePayload = {
  __typename?: "EventDeletePayload";
  id?: Maybe<Scalars["Float"]>;
};

export type EventUpdateInput = {
  eventTitle?: Maybe<Scalars["String"]>;
  dateHosted?: Maybe<Scalars["DateTime"]>;
  dateExpire?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  location?: Maybe<Scalars["String"]>;
  flierLink?: Maybe<Scalars["String"]>;
  eventLink?: Maybe<Scalars["String"]>;
  hostSig: Scalars["String"];
};

export type Extension = {
  __typename?: "Extension";
  code: ErrorCodes;
};

export type Group = {
  __typename?: "Group";
  name: Scalars["String"];
  users: Array<User>;
  permissions: Array<Permission>;
  redemptionCodes: Array<RedemptionCode>;
};

export type MembershipProduct = {
  __typename?: "MembershipProduct";
  tag: MembershipTypes;
};

/** Different types of ACM memberships one can have. */
export enum MembershipTypes {
  Yearly = "YEARLY",
  Semesterly = "SEMESTERLY",
}

export type Mutation = {
  __typename?: "Mutation";
  createUser: User;
  updateUser: User;
  deleteUser: UserDeletePayload;
  createSig: Sig;
  updateSig: Sig;
  deleteSig: SigDeletePayload;
  deleteEvent: EventDeletePayload;
  updateEvent: Event;
  createEvent: Event;
  addAttendee: Event;
  createGroup: Group;
  createPermission: Permission;
  createRedemptionCode: RedemptionCode;
  redeemRedemptionCode: RedemptionCode;
  deleteResume: User;
  uploadResume: Resume;
  startMembershipTransaction: TransactionPayload;
  startProductTransaction: TransactionPayload;
  addUserToGroups: User;
  addPermissionsToUser: User;
  updateExpirationDate: User;
  updateShirtReceived: User;
  resetShirtReceived: Array<User>;
  attendEvent: Event;
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

export type MutationCreateSigArgs = {
  data: SigCreateInput;
};

export type MutationUpdateSigArgs = {
  data: SigUpdateInput;
  id: Scalars["String"];
};

export type MutationDeleteSigArgs = {
  id: Scalars["String"];
};

export type MutationDeleteEventArgs = {
  id: Scalars["Float"];
};

export type MutationUpdateEventArgs = {
  flier?: Maybe<Scalars["Upload"]>;
  data?: Maybe<EventUpdateInput>;
  id: Scalars["Float"];
};

export type MutationCreateEventArgs = {
  flier?: Maybe<Scalars["Upload"]>;
  data: EventCreateInput;
};

export type MutationAddAttendeeArgs = {
  eventId: Scalars["Float"];
  userId: Scalars["String"];
};

export type MutationCreateGroupArgs = {
  permissionIds: Array<Scalars["String"]>;
  name: Scalars["String"];
};

export type MutationCreatePermissionArgs = {
  data: PermissionCreateInput;
};

export type MutationCreateRedemptionCodeArgs = {
  groupIds?: Maybe<Array<Scalars["String"]>>;
  permissionIds?: Maybe<Array<Scalars["String"]>>;
  productTags?: Maybe<Array<Scalars["String"]>>;
};

export type MutationRedeemRedemptionCodeArgs = {
  redemptionCode: Scalars["String"];
};

export type MutationUploadResumeArgs = {
  lastName: Scalars["String"];
  firstName: Scalars["String"];
  graduationDate: Scalars["DateTime"];
  resume: Scalars["Upload"];
};

export type MutationStartMembershipTransactionArgs = {
  membershipType: MembershipTypes;
};

export type MutationStartProductTransactionArgs = {
  purchase: PurchaseInput;
};

export type MutationAddUserToGroupsArgs = {
  groupIds: Array<Scalars["String"]>;
  userId: Scalars["String"];
};

export type MutationAddPermissionsToUserArgs = {
  permissionIds: Array<Scalars["String"]>;
  userId: Scalars["String"];
};

export type MutationUpdateExpirationDateArgs = {
  newExpirationDate: Scalars["DateTime"];
  userId: Scalars["String"];
};

export type MutationUpdateShirtReceivedArgs = {
  updatedShirtStatus: Scalars["Boolean"];
  userId: Scalars["String"];
};

export type MutationAttendEventArgs = {
  eventId: Scalars["Float"];
};

export type Permission = {
  __typename?: "Permission";
  name: Scalars["ID"];
  users: Array<User>;
  redemptionCodes: Array<RedemptionCode>;
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
  tag: Scalars["ID"];
  displayName: Scalars["String"];
  description: Scalars["String"];
  statementDescriptor?: Maybe<Scalars["String"]>;
  price: Scalars["Float"];
};

export type Purchase = {
  __typename?: "Purchase";
  id: Scalars["ID"];
  quantity: Scalars["Float"];
  product: Product;
  transaction: Array<Transaction>;
};

export type PurchaseInput = {
  quantity?: Maybe<Scalars["Int"]>;
  tag: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  user: User;
  users: Array<User>;
  sig: Sig;
  sigs: Array<Sig>;
  events: Array<Event>;
  currentEvents: Array<Event>;
  event: Event;
  eventsWithKey: Array<Event>;
  groups: Array<Group>;
  permissions: Array<Permission>;
  products: Array<Product>;
  redemptionCodes: Array<RedemptionCode>;
  resumes: Array<Resume>;
  transactions: Array<Transaction>;
  me?: Maybe<User>;
};

export type QueryUserArgs = {
  id: Scalars["String"];
};

export type QuerySigArgs = {
  id: Scalars["String"];
};

export type QueryEventArgs = {
  id: Scalars["Float"];
};

export type QueryEventsWithKeyArgs = {
  urlKey: Scalars["String"];
};

export type RedemptionCode = {
  __typename?: "RedemptionCode";
  id: Scalars["ID"];
  redeemed?: Maybe<Scalars["Boolean"]>;
  expirationDate: Scalars["DateTime"];
  transaction?: Maybe<Transaction>;
  permissions: Array<Permission>;
  groups: Array<Group>;
};

export type Resume = {
  __typename?: "Resume";
  id: Scalars["ID"];
  url: Scalars["String"];
  added: Scalars["DateTime"];
  user: User;
};

export type Sig = {
  __typename?: "Sig";
  name: Scalars["String"];
  dateFounded: Scalars["DateTime"];
  description: Scalars["String"];
  users: Array<User>;
  hostedEvents: Array<Event>;
};

export type SigCreateInput = {
  name: Scalars["String"];
  description: Scalars["String"];
};

export type SigDeletePayload = {
  __typename?: "SigDeletePayload";
  name?: Maybe<Scalars["String"]>;
};

export type SigUpdateInput = {
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
};

export type Transaction = {
  __typename?: "Transaction";
  id: Scalars["ID"];
  intent?: Maybe<Scalars["String"]>;
  charged?: Maybe<Scalars["Float"]>;
  paymentType: Scalars["String"];
  status: Scalars["String"];
  user: User;
  purchases: Array<Purchase>;
  redemptionCode: RedemptionCode;
};

export type TransactionPayload = {
  __typename?: "TransactionPayload";
  id: Scalars["String"];
  charged?: Maybe<Scalars["Float"]>;
  clientSecret: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
  emailVerified: Scalars["Boolean"];
  profilePictureUrl: Scalars["String"];
  graduationDate?: Maybe<Scalars["DateTime"]>;
  shirtReceived?: Maybe<Scalars["Boolean"]>;
  isSuperAdmin?: Maybe<Scalars["Boolean"]>;
  dateJoined: Scalars["DateTime"];
  membershipExpiration?: Maybe<Scalars["DateTime"]>;
  isActive?: Maybe<Scalars["Boolean"]>;
  resume?: Maybe<Resume>;
  permissions?: Maybe<Array<Permission>>;
  groups: Array<Group>;
  eventsAttended?: Maybe<Array<Event>>;
};

export type UserCreateInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  sub: Scalars["String"];
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

export type SigsQueryVariables = Exact<{ [key: string]: never }>;

export type SigsQuery = { __typename?: "Query" } & {
  sigs: Array<{ __typename?: "Sig" } & Pick<Sig, "name">>;
};

export type EventsQueryVariables = Exact<{ [key: string]: never }>;

export type EventsQuery = { __typename?: "Query" } & {
  events: Array<
    { __typename?: "Event" } & Pick<
      Event,
      | "id"
      | "dateCreated"
      | "dateHosted"
      | "dateExpire"
      | "eventTitle"
      | "description"
      | "location"
      | "flierLink"
      | "eventLink"
      | "urlKey"
    > & {
        creator: { __typename?: "User" } & Pick<User, "firstName" | "lastName">;
        hostSig: { __typename?: "Sig" } & Pick<Sig, "name">;
      }
  >;
};

export type CreateEventMutationVariables = Exact<{
  flier?: Maybe<Scalars["Upload"]>;
  data: EventCreateInput;
}>;

export type CreateEventMutation = { __typename?: "Mutation" } & {
  createEvent: { __typename?: "Event" } & Pick<Event, "eventTitle">;
};

export type UpdateEventMutationVariables = Exact<{
  flier?: Maybe<Scalars["Upload"]>;
  data?: Maybe<EventUpdateInput>;
  id: Scalars["Float"];
}>;

export type UpdateEventMutation = { __typename?: "Mutation" } & {
  updateEvent: { __typename?: "Event" } & Pick<Event, "eventTitle">;
};

export type DeleteEventMutationVariables = Exact<{
  id: Scalars["Float"];
}>;

export type DeleteEventMutation = { __typename?: "Mutation" } & {
  deleteEvent: { __typename?: "EventDeletePayload" } & Pick<
    EventDeletePayload,
    "id"
  >;
};

export type MembersQueryVariables = Exact<{ [key: string]: never }>;

export type MembersQuery = { __typename?: "Query" } & {
  users: Array<
    { __typename?: "User" } & Pick<
      User,
      | "id"
      | "firstName"
      | "lastName"
      | "email"
      | "isActive"
      | "membershipExpiration"
      | "shirtReceived"
    >
  >;
};

export type UpdateExpirationDateMutationVariables = Exact<{
  date: Scalars["DateTime"];
  id: Scalars["String"];
}>;

export type UpdateExpirationDateMutation = { __typename?: "Mutation" } & {
  updateExpirationDate: { __typename?: "User" } & Pick<User, "id">;
};

export type UpdateShirtReceivedMutationVariables = Exact<{
  received: Scalars["Boolean"];
  id: Scalars["String"];
}>;

export type UpdateShirtReceivedMutation = { __typename?: "Mutation" } & {
  updateShirtReceived: { __typename?: "User" } & Pick<User, "id">;
};

export type ResetShirtReceivedMutationVariables = Exact<{
  [key: string]: never;
}>;

export type ResetShirtReceivedMutation = { __typename?: "Mutation" } & {
  resetShirtReceived: Array<
    { __typename?: "User" } & Pick<User, "shirtReceived">
  >;
};

export type DeleteMemberMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type DeleteMemberMutation = { __typename?: "Mutation" } & {
  deleteUser: { __typename?: "UserDeletePayload" } & Pick<
    UserDeletePayload,
    "firstName"
  >;
};

export type CreateCodeMutationVariables = Exact<{
  groups?: Maybe<Array<Scalars["String"]>>;
  permissions?: Maybe<Array<Scalars["String"]>>;
  products?: Maybe<Array<Scalars["String"]>>;
}>;

export type CreateCodeMutation = { __typename?: "Mutation" } & {
  createRedemptionCode: { __typename?: "RedemptionCode" } & Pick<
    RedemptionCode,
    "id" | "expirationDate"
  > & {
      groups: Array<{ __typename?: "Group" } & Pick<Group, "name">>;
      permissions: Array<
        { __typename?: "Permission" } & Pick<Permission, "name">
      >;
      transaction?: Maybe<
        { __typename?: "Transaction" } & Pick<Transaction, "id">
      >;
    };
};

export type GetGroupsQueryVariables = Exact<{ [key: string]: never }>;

export type GetGroupsQuery = { __typename?: "Query" } & {
  groups: Array<{ __typename?: "Group" } & Pick<Group, "name">>;
};

export type GetPermissionsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPermissionsQuery = { __typename?: "Query" } & {
  permissions: Array<{ __typename?: "Permission" } & Pick<Permission, "name">>;
};

export type GetProductsQueryVariables = Exact<{ [key: string]: never }>;

export type GetProductsQuery = { __typename?: "Query" } & {
  products: Array<
    { __typename?: "Product" } & Pick<Product, "displayName" | "tag">
  >;
};

export const SigsDocument = gql`
  query sigs {
    sigs {
      name
    }
  }
`;

/**
 * __useSigsQuery__
 *
 * To run a query within a React component, call `useSigsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSigsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSigsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSigsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<SigsQuery, SigsQueryVariables>
) {
  return ApolloReactHooks.useQuery<SigsQuery, SigsQueryVariables>(
    SigsDocument,
    baseOptions
  );
}
export function useSigsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SigsQuery,
    SigsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<SigsQuery, SigsQueryVariables>(
    SigsDocument,
    baseOptions
  );
}
export type SigsQueryHookResult = ReturnType<typeof useSigsQuery>;
export type SigsLazyQueryHookResult = ReturnType<typeof useSigsLazyQuery>;
export type SigsQueryResult = ApolloReactCommon.QueryResult<
  SigsQuery,
  SigsQueryVariables
>;
export const EventsDocument = gql`
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
      urlKey
    }
  }
`;

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useEventsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    EventsQuery,
    EventsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<EventsQuery, EventsQueryVariables>(
    EventsDocument,
    baseOptions
  );
}
export function useEventsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    EventsQuery,
    EventsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<EventsQuery, EventsQueryVariables>(
    EventsDocument,
    baseOptions
  );
}
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsQueryResult = ApolloReactCommon.QueryResult<
  EventsQuery,
  EventsQueryVariables
>;
export const CreateEventDocument = gql`
  mutation CreateEvent($flier: Upload, $data: EventCreateInput!) {
    createEvent(flier: $flier, data: $data) {
      eventTitle
    }
  }
`;
export type CreateEventMutationFn = ApolloReactCommon.MutationFunction<
  CreateEventMutation,
  CreateEventMutationVariables
>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      flier: // value for 'flier'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateEventMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateEventMutation,
    CreateEventMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateEventMutation,
    CreateEventMutationVariables
  >(CreateEventDocument, baseOptions);
}
export type CreateEventMutationHookResult = ReturnType<
  typeof useCreateEventMutation
>;
export type CreateEventMutationResult = ApolloReactCommon.MutationResult<
  CreateEventMutation
>;
export type CreateEventMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateEventMutation,
  CreateEventMutationVariables
>;
export const UpdateEventDocument = gql`
  mutation UpdateEvent($flier: Upload, $data: EventUpdateInput, $id: Float!) {
    updateEvent(flier: $flier, data: $data, id: $id) {
      eventTitle
    }
  }
`;
export type UpdateEventMutationFn = ApolloReactCommon.MutationFunction<
  UpdateEventMutation,
  UpdateEventMutationVariables
>;

/**
 * __useUpdateEventMutation__
 *
 * To run a mutation, you first call `useUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventMutation, { data, loading, error }] = useUpdateEventMutation({
 *   variables: {
 *      flier: // value for 'flier'
 *      data: // value for 'data'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateEventMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateEventMutation,
    UpdateEventMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdateEventMutation,
    UpdateEventMutationVariables
  >(UpdateEventDocument, baseOptions);
}
export type UpdateEventMutationHookResult = ReturnType<
  typeof useUpdateEventMutation
>;
export type UpdateEventMutationResult = ApolloReactCommon.MutationResult<
  UpdateEventMutation
>;
export type UpdateEventMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateEventMutation,
  UpdateEventMutationVariables
>;
export const DeleteEventDocument = gql`
  mutation DeleteEvent($id: Float!) {
    deleteEvent(id: $id) {
      id
    }
  }
`;
export type DeleteEventMutationFn = ApolloReactCommon.MutationFunction<
  DeleteEventMutation,
  DeleteEventMutationVariables
>;

/**
 * __useDeleteEventMutation__
 *
 * To run a mutation, you first call `useDeleteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEventMutation, { data, loading, error }] = useDeleteEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEventMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteEventMutation,
    DeleteEventMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    DeleteEventMutation,
    DeleteEventMutationVariables
  >(DeleteEventDocument, baseOptions);
}
export type DeleteEventMutationHookResult = ReturnType<
  typeof useDeleteEventMutation
>;
export type DeleteEventMutationResult = ApolloReactCommon.MutationResult<
  DeleteEventMutation
>;
export type DeleteEventMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteEventMutation,
  DeleteEventMutationVariables
>;
export const MembersDocument = gql`
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

/**
 * __useMembersQuery__
 *
 * To run a query within a React component, call `useMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMembersQuery({
 *   variables: {
 *   },
 * });
 */
export function useMembersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    MembersQuery,
    MembersQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<MembersQuery, MembersQueryVariables>(
    MembersDocument,
    baseOptions
  );
}
export function useMembersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    MembersQuery,
    MembersQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<MembersQuery, MembersQueryVariables>(
    MembersDocument,
    baseOptions
  );
}
export type MembersQueryHookResult = ReturnType<typeof useMembersQuery>;
export type MembersLazyQueryHookResult = ReturnType<typeof useMembersLazyQuery>;
export type MembersQueryResult = ApolloReactCommon.QueryResult<
  MembersQuery,
  MembersQueryVariables
>;
export const UpdateExpirationDateDocument = gql`
  mutation UpdateExpirationDate($date: DateTime!, $id: String!) {
    updateExpirationDate(newExpirationDate: $date, userId: $id) {
      id
    }
  }
`;
export type UpdateExpirationDateMutationFn = ApolloReactCommon.MutationFunction<
  UpdateExpirationDateMutation,
  UpdateExpirationDateMutationVariables
>;

/**
 * __useUpdateExpirationDateMutation__
 *
 * To run a mutation, you first call `useUpdateExpirationDateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExpirationDateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExpirationDateMutation, { data, loading, error }] = useUpdateExpirationDateMutation({
 *   variables: {
 *      date: // value for 'date'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateExpirationDateMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateExpirationDateMutation,
    UpdateExpirationDateMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdateExpirationDateMutation,
    UpdateExpirationDateMutationVariables
  >(UpdateExpirationDateDocument, baseOptions);
}
export type UpdateExpirationDateMutationHookResult = ReturnType<
  typeof useUpdateExpirationDateMutation
>;
export type UpdateExpirationDateMutationResult = ApolloReactCommon.MutationResult<
  UpdateExpirationDateMutation
>;
export type UpdateExpirationDateMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateExpirationDateMutation,
  UpdateExpirationDateMutationVariables
>;
export const UpdateShirtReceivedDocument = gql`
  mutation UpdateShirtReceived($received: Boolean!, $id: String!) {
    updateShirtReceived(updatedShirtStatus: $received, userId: $id) {
      id
    }
  }
`;
export type UpdateShirtReceivedMutationFn = ApolloReactCommon.MutationFunction<
  UpdateShirtReceivedMutation,
  UpdateShirtReceivedMutationVariables
>;

/**
 * __useUpdateShirtReceivedMutation__
 *
 * To run a mutation, you first call `useUpdateShirtReceivedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateShirtReceivedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateShirtReceivedMutation, { data, loading, error }] = useUpdateShirtReceivedMutation({
 *   variables: {
 *      received: // value for 'received'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateShirtReceivedMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateShirtReceivedMutation,
    UpdateShirtReceivedMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdateShirtReceivedMutation,
    UpdateShirtReceivedMutationVariables
  >(UpdateShirtReceivedDocument, baseOptions);
}
export type UpdateShirtReceivedMutationHookResult = ReturnType<
  typeof useUpdateShirtReceivedMutation
>;
export type UpdateShirtReceivedMutationResult = ApolloReactCommon.MutationResult<
  UpdateShirtReceivedMutation
>;
export type UpdateShirtReceivedMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateShirtReceivedMutation,
  UpdateShirtReceivedMutationVariables
>;
export const ResetShirtReceivedDocument = gql`
  mutation ResetShirtReceived {
    resetShirtReceived {
      shirtReceived
    }
  }
`;
export type ResetShirtReceivedMutationFn = ApolloReactCommon.MutationFunction<
  ResetShirtReceivedMutation,
  ResetShirtReceivedMutationVariables
>;

/**
 * __useResetShirtReceivedMutation__
 *
 * To run a mutation, you first call `useResetShirtReceivedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetShirtReceivedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetShirtReceivedMutation, { data, loading, error }] = useResetShirtReceivedMutation({
 *   variables: {
 *   },
 * });
 */
export function useResetShirtReceivedMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ResetShirtReceivedMutation,
    ResetShirtReceivedMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ResetShirtReceivedMutation,
    ResetShirtReceivedMutationVariables
  >(ResetShirtReceivedDocument, baseOptions);
}
export type ResetShirtReceivedMutationHookResult = ReturnType<
  typeof useResetShirtReceivedMutation
>;
export type ResetShirtReceivedMutationResult = ApolloReactCommon.MutationResult<
  ResetShirtReceivedMutation
>;
export type ResetShirtReceivedMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ResetShirtReceivedMutation,
  ResetShirtReceivedMutationVariables
>;
export const DeleteMemberDocument = gql`
  mutation DeleteMember($id: String!) {
    deleteUser(id: $id) {
      firstName
    }
  }
`;
export type DeleteMemberMutationFn = ApolloReactCommon.MutationFunction<
  DeleteMemberMutation,
  DeleteMemberMutationVariables
>;

/**
 * __useDeleteMemberMutation__
 *
 * To run a mutation, you first call `useDeleteMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMemberMutation, { data, loading, error }] = useDeleteMemberMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMemberMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteMemberMutation,
    DeleteMemberMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    DeleteMemberMutation,
    DeleteMemberMutationVariables
  >(DeleteMemberDocument, baseOptions);
}
export type DeleteMemberMutationHookResult = ReturnType<
  typeof useDeleteMemberMutation
>;
export type DeleteMemberMutationResult = ApolloReactCommon.MutationResult<
  DeleteMemberMutation
>;
export type DeleteMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteMemberMutation,
  DeleteMemberMutationVariables
>;
export const CreateCodeDocument = gql`
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
export type CreateCodeMutationFn = ApolloReactCommon.MutationFunction<
  CreateCodeMutation,
  CreateCodeMutationVariables
>;

/**
 * __useCreateCodeMutation__
 *
 * To run a mutation, you first call `useCreateCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCodeMutation, { data, loading, error }] = useCreateCodeMutation({
 *   variables: {
 *      groups: // value for 'groups'
 *      permissions: // value for 'permissions'
 *      products: // value for 'products'
 *   },
 * });
 */
export function useCreateCodeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateCodeMutation,
    CreateCodeMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateCodeMutation,
    CreateCodeMutationVariables
  >(CreateCodeDocument, baseOptions);
}
export type CreateCodeMutationHookResult = ReturnType<
  typeof useCreateCodeMutation
>;
export type CreateCodeMutationResult = ApolloReactCommon.MutationResult<
  CreateCodeMutation
>;
export type CreateCodeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateCodeMutation,
  CreateCodeMutationVariables
>;
export const GetGroupsDocument = gql`
  query GetGroups {
    groups {
      name
    }
  }
`;

/**
 * __useGetGroupsQuery__
 *
 * To run a query within a React component, call `useGetGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGroupsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetGroupsQuery,
    GetGroupsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetGroupsQuery, GetGroupsQueryVariables>(
    GetGroupsDocument,
    baseOptions
  );
}
export function useGetGroupsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetGroupsQuery,
    GetGroupsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<GetGroupsQuery, GetGroupsQueryVariables>(
    GetGroupsDocument,
    baseOptions
  );
}
export type GetGroupsQueryHookResult = ReturnType<typeof useGetGroupsQuery>;
export type GetGroupsLazyQueryHookResult = ReturnType<
  typeof useGetGroupsLazyQuery
>;
export type GetGroupsQueryResult = ApolloReactCommon.QueryResult<
  GetGroupsQuery,
  GetGroupsQueryVariables
>;
export const GetPermissionsDocument = gql`
  query GetPermissions {
    permissions {
      name
    }
  }
`;

/**
 * __useGetPermissionsQuery__
 *
 * To run a query within a React component, call `useGetPermissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPermissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPermissionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPermissionsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetPermissionsQuery,
    GetPermissionsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetPermissionsQuery,
    GetPermissionsQueryVariables
  >(GetPermissionsDocument, baseOptions);
}
export function useGetPermissionsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPermissionsQuery,
    GetPermissionsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetPermissionsQuery,
    GetPermissionsQueryVariables
  >(GetPermissionsDocument, baseOptions);
}
export type GetPermissionsQueryHookResult = ReturnType<
  typeof useGetPermissionsQuery
>;
export type GetPermissionsLazyQueryHookResult = ReturnType<
  typeof useGetPermissionsLazyQuery
>;
export type GetPermissionsQueryResult = ApolloReactCommon.QueryResult<
  GetPermissionsQuery,
  GetPermissionsQueryVariables
>;
export const GetProductsDocument = gql`
  query GetProducts {
    products {
      displayName
      tag
    }
  }
`;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetProductsQuery,
    GetProductsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetProductsQuery, GetProductsQueryVariables>(
    GetProductsDocument,
    baseOptions
  );
}
export function useGetProductsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetProductsQuery,
    GetProductsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetProductsQuery,
    GetProductsQueryVariables
  >(GetProductsDocument, baseOptions);
}
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<
  typeof useGetProductsLazyQuery
>;
export type GetProductsQueryResult = ApolloReactCommon.QueryResult<
  GetProductsQuery,
  GetProductsQueryVariables
>;

export function useGetCurrentEventsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCurrentEventsQuery,
    GetCurrentEventsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetCurrentEventsQuery,
    GetCurrentEventsQueryVariables
  >(GetCurrentEventsDocument, baseOptions);
}
export function useGetCurrentEventsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCurrentEventsQuery,
    GetCurrentEventsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetCurrentEventsQuery,
    GetCurrentEventsQueryVariables
  >(GetCurrentEventsDocument, baseOptions);
}
export type GetCurrentEventsQueryHookResult = ReturnType<
  typeof useGetCurrentEventsQuery
>;
export type GetCurrentEventsLazyQueryHookResult = ReturnType<
  typeof useGetCurrentEventsLazyQuery
>;
export type GetCurrentEventsQueryResult = ApolloReactCommon.QueryResult<
  GetCurrentEventsQuery,
  GetCurrentEventsQueryVariables
>;
export const MeExpirationDocument = gql`
  query MeExpiration {
    me {
      membershipExpiration
    }
  }
`;

export type GetCurrentEventsQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentEventsQuery = { __typename?: "Query" } & {
  currentEvents: Array<
    { __typename?: "Event" } & Pick<
      Event,
      | "id"
      | "dateCreated"
      | "dateHosted"
      | "dateExpire"
      | "eventTitle"
      | "description"
      | "location"
      | "flierLink"
      | "eventLink"
    > & { hostSig: { __typename?: "Sig" } & Pick<Sig, "name"> }
  >;
};
export const GetCurrentEventsDocument = gql`
  query getCurrentEvents {
    currentEvents {
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
    }
  }
`;
