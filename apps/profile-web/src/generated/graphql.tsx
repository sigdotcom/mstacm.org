import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
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
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  ResourceNotFound = 'RESOURCE_NOT_FOUND',
  Unauthenticated = 'UNAUTHENTICATED',
  BadUserInput = 'BAD_USER_INPUT'
}

export type Event = {
  __typename?: 'Event';
  id: Scalars['ID'];
  dateCreated: Scalars['DateTime'];
  dateHosted: Scalars['DateTime'];
  dateExpire: Scalars['DateTime'];
  creator: User;
  hostSig: Sig;
  eventTitle: Scalars['String'];
  description: Scalars['String'];
  location: Scalars['String'];
  flierLink?: Maybe<Scalars['String']>;
  eventLink?: Maybe<Scalars['String']>;
  urlKey?: Maybe<Scalars['String']>;
  attendees?: Maybe<Array<User>>;
};

export type EventCreateInput = {
  eventTitle: Scalars['String'];
  dateHosted: Scalars['DateTime'];
  dateExpire: Scalars['DateTime'];
  description: Scalars['String'];
  location: Scalars['String'];
  flierLink?: Maybe<Scalars['String']>;
  eventLink?: Maybe<Scalars['String']>;
  hostSig: Scalars['String'];
};

export type EventDeletePayload = {
  __typename?: 'EventDeletePayload';
  id?: Maybe<Scalars['Float']>;
};

export type EventUpdateInput = {
  eventTitle?: Maybe<Scalars['String']>;
  dateHosted?: Maybe<Scalars['DateTime']>;
  dateExpire?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  flierLink?: Maybe<Scalars['String']>;
  eventLink?: Maybe<Scalars['String']>;
  hostSig: Scalars['String'];
};

export type Extension = {
  __typename?: 'Extension';
  code: ErrorCodes;
};

export type Group = {
  __typename?: 'Group';
  name: Scalars['String'];
  users: Array<User>;
  permissions: Array<Permission>;
  redemptionCodes: Array<RedemptionCode>;
};

export type MembershipProduct = {
  __typename?: 'MembershipProduct';
  tag: MembershipTypes;
};

/** Different types of ACM memberships one can have. */
export enum MembershipTypes {
  Yearly = 'YEARLY',
  Semesterly = 'SEMESTERLY'
}

export type Mutation = {
  __typename?: 'Mutation';
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
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationCreateSigArgs = {
  data: SigCreateInput;
};


export type MutationUpdateSigArgs = {
  data: SigUpdateInput;
  id: Scalars['String'];
};


export type MutationDeleteSigArgs = {
  id: Scalars['String'];
};


export type MutationDeleteEventArgs = {
  id: Scalars['Float'];
};


export type MutationUpdateEventArgs = {
  flier?: Maybe<Scalars['Upload']>;
  data?: Maybe<EventUpdateInput>;
  id: Scalars['Float'];
};


export type MutationCreateEventArgs = {
  flier?: Maybe<Scalars['Upload']>;
  data: EventCreateInput;
};


export type MutationAddAttendeeArgs = {
  eventId: Scalars['Float'];
  userId: Scalars['String'];
};


export type MutationCreateGroupArgs = {
  permissionIds: Array<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationCreatePermissionArgs = {
  data: PermissionCreateInput;
};


export type MutationCreateRedemptionCodeArgs = {
  groupIds?: Maybe<Array<Scalars['String']>>;
  permissionIds?: Maybe<Array<Scalars['String']>>;
  productTags?: Maybe<Array<Scalars['String']>>;
};


export type MutationRedeemRedemptionCodeArgs = {
  redemptionCode: Scalars['String'];
};


export type MutationUploadResumeArgs = {
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  graduationDate: Scalars['DateTime'];
  resume: Scalars['Upload'];
};


export type MutationStartMembershipTransactionArgs = {
  membershipType: MembershipTypes;
};


export type MutationStartProductTransactionArgs = {
  purchase: PurchaseInput;
};


export type MutationAddUserToGroupsArgs = {
  groupIds: Array<Scalars['String']>;
  userId: Scalars['String'];
};


export type MutationAddPermissionsToUserArgs = {
  permissionIds: Array<Scalars['String']>;
  userId: Scalars['String'];
};


export type MutationUpdateExpirationDateArgs = {
  newExpirationDate: Scalars['DateTime'];
  userId: Scalars['String'];
};


export type MutationUpdateShirtReceivedArgs = {
  updatedShirtStatus: Scalars['Boolean'];
  userId: Scalars['String'];
};


export type MutationAttendEventArgs = {
  eventId: Scalars['Float'];
};

export type Permission = {
  __typename?: 'Permission';
  name: Scalars['ID'];
  users: Array<User>;
  redemptionCodes: Array<RedemptionCode>;
};

export type PermissionCreateInput = {
  name: Scalars['String'];
};

export type PermissionDeletePayload = {
  __typename?: 'PermissionDeletePayload';
  name?: Maybe<Scalars['String']>;
};

export type PermissionUpdateInput = {
  name?: Maybe<Scalars['String']>;
};

export type Product = {
  __typename?: 'Product';
  tag: Scalars['ID'];
  displayName: Scalars['String'];
  description: Scalars['String'];
  statementDescriptor?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
};

export type Purchase = {
  __typename?: 'Purchase';
  id: Scalars['ID'];
  quantity: Scalars['Float'];
  product: Product;
  transaction: Array<Transaction>;
};

export type PurchaseInput = {
  quantity?: Maybe<Scalars['Int']>;
  tag: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
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
  id: Scalars['String'];
};


export type QuerySigArgs = {
  id: Scalars['String'];
};


export type QueryEventArgs = {
  id: Scalars['Float'];
};


export type QueryEventsWithKeyArgs = {
  urlKey: Scalars['String'];
};

export type RedemptionCode = {
  __typename?: 'RedemptionCode';
  id: Scalars['ID'];
  redeemed?: Maybe<Scalars['Boolean']>;
  expirationDate: Scalars['DateTime'];
  transaction?: Maybe<Transaction>;
  permissions: Array<Permission>;
  groups: Array<Group>;
};

export type Resume = {
  __typename?: 'Resume';
  id: Scalars['ID'];
  url: Scalars['String'];
  added: Scalars['DateTime'];
  user: User;
};

export type Sig = {
  __typename?: 'Sig';
  name: Scalars['String'];
  dateFounded: Scalars['DateTime'];
  description: Scalars['String'];
  users: Array<User>;
  hostedEvents: Array<Event>;
};

export type SigCreateInput = {
  name: Scalars['String'];
  description: Scalars['String'];
};

export type SigDeletePayload = {
  __typename?: 'SigDeletePayload';
  name?: Maybe<Scalars['String']>;
};

export type SigUpdateInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  id: Scalars['ID'];
  intent?: Maybe<Scalars['String']>;
  charged?: Maybe<Scalars['Float']>;
  paymentType: Scalars['String'];
  status: Scalars['String'];
  user: User;
  purchases: Array<Purchase>;
  redemptionCode: RedemptionCode;
};

export type TransactionPayload = {
  __typename?: 'TransactionPayload';
  id: Scalars['String'];
  charged?: Maybe<Scalars['Float']>;
  clientSecret: Scalars['String'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  profilePictureUrl: Scalars['String'];
  graduationDate?: Maybe<Scalars['DateTime']>;
  shirtReceived?: Maybe<Scalars['Boolean']>;
  isSuperAdmin?: Maybe<Scalars['Boolean']>;
  dateJoined: Scalars['DateTime'];
  membershipExpiration?: Maybe<Scalars['DateTime']>;
  isActive?: Maybe<Scalars['Boolean']>;
  resume?: Maybe<Resume>;
  permissions?: Maybe<Array<Permission>>;
  groups: Array<Group>;
  eventsAttended?: Maybe<Array<Event>>;
};

export type UserCreateInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  sub: Scalars['String'];
};

export type UserDeletePayload = {
  __typename?: 'UserDeletePayload';
  firstName?: Maybe<Scalars['String']>;
};

export type UserUpdateInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type EventsQueryVariables = Exact<{ [key: string]: never; }>;


export type EventsQuery = (
  { __typename?: 'Query' }
  & { events: Array<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'dateCreated' | 'dateHosted' | 'dateExpire' | 'eventTitle' | 'description' | 'location' | 'flierLink' | 'eventLink' | 'urlKey'>
    & { hostSig: (
      { __typename?: 'Sig' }
      & Pick<Sig, 'name'>
    ) }
  )> }
);

export type AttendEventMutationVariables = Exact<{
  eventId: Scalars['Float'];
}>;


export type AttendEventMutation = (
  { __typename?: 'Mutation' }
  & { attendEvent: (
    { __typename?: 'Event' }
    & { attendees?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>> }
  ) }
);

export type UploadResumeMutationVariables = Exact<{
  resume: Scalars['Upload'];
  grad: Scalars['DateTime'];
  fname: Scalars['String'];
  lname: Scalars['String'];
}>;


export type UploadResumeMutation = (
  { __typename?: 'Mutation' }
  & { uploadResume: (
    { __typename?: 'Resume' }
    & Pick<Resume, 'url'>
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'firstName' | 'lastName' | 'id'>
  )> }
);


export const EventsDocument = gql`
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
    flierLink
    eventLink
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
export function useEventsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EventsQuery, EventsQueryVariables>) {
        return ApolloReactHooks.useQuery<EventsQuery, EventsQueryVariables>(EventsDocument, baseOptions);
      }
export function useEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EventsQuery, EventsQueryVariables>(EventsDocument, baseOptions);
        }
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsQueryResult = ApolloReactCommon.QueryResult<EventsQuery, EventsQueryVariables>;
export const AttendEventDocument = gql`
    mutation attendEvent($eventId: Float!) {
  attendEvent(eventId: $eventId) {
    attendees {
      id
    }
  }
}
    `;
export type AttendEventMutationFn = ApolloReactCommon.MutationFunction<AttendEventMutation, AttendEventMutationVariables>;

/**
 * __useAttendEventMutation__
 *
 * To run a mutation, you first call `useAttendEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttendEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attendEventMutation, { data, loading, error }] = useAttendEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useAttendEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AttendEventMutation, AttendEventMutationVariables>) {
        return ApolloReactHooks.useMutation<AttendEventMutation, AttendEventMutationVariables>(AttendEventDocument, baseOptions);
      }
export type AttendEventMutationHookResult = ReturnType<typeof useAttendEventMutation>;
export type AttendEventMutationResult = ApolloReactCommon.MutationResult<AttendEventMutation>;
export type AttendEventMutationOptions = ApolloReactCommon.BaseMutationOptions<AttendEventMutation, AttendEventMutationVariables>;
export const UploadResumeDocument = gql`
    mutation uploadResume($resume: Upload!, $grad: DateTime!, $fname: String!, $lname: String!) {
  uploadResume(resume: $resume, graduationDate: $grad, firstName: $fname, lastName: $lname) {
    url
  }
}
    `;
export type UploadResumeMutationFn = ApolloReactCommon.MutationFunction<UploadResumeMutation, UploadResumeMutationVariables>;

/**
 * __useUploadResumeMutation__
 *
 * To run a mutation, you first call `useUploadResumeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadResumeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadResumeMutation, { data, loading, error }] = useUploadResumeMutation({
 *   variables: {
 *      resume: // value for 'resume'
 *      grad: // value for 'grad'
 *      fname: // value for 'fname'
 *      lname: // value for 'lname'
 *   },
 * });
 */
export function useUploadResumeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UploadResumeMutation, UploadResumeMutationVariables>) {
        return ApolloReactHooks.useMutation<UploadResumeMutation, UploadResumeMutationVariables>(UploadResumeDocument, baseOptions);
      }
export type UploadResumeMutationHookResult = ReturnType<typeof useUploadResumeMutation>;
export type UploadResumeMutationResult = ApolloReactCommon.MutationResult<UploadResumeMutation>;
export type UploadResumeMutationOptions = ApolloReactCommon.BaseMutationOptions<UploadResumeMutation, UploadResumeMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    firstName
    lastName
    id
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;