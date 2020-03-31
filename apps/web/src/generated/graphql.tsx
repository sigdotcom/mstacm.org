import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
  Upload: any,
};


export enum ErrorCodes {
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  ResourceNotFound = 'RESOURCE_NOT_FOUND',
  Unauthenticated = 'UNAUTHENTICATED',
  BadUserInput = 'BAD_USER_INPUT'
}

export type Event = {
   __typename?: 'Event',
  id: Scalars['ID'],
  dateCreated: Scalars['DateTime'],
  dateHosted: Scalars['DateTime'],
  dateExpire: Scalars['DateTime'],
  creator: User,
  hostSig: Sig,
  eventTitle: Scalars['String'],
  description: Scalars['String'],
  location: Scalars['String'],
  flierLink?: Maybe<Scalars['String']>,
  eventLink?: Maybe<Scalars['String']>,
};

export type EventCreateInput = {
  eventTitle: Scalars['String'],
  dateHosted: Scalars['DateTime'],
  dateExpire: Scalars['DateTime'],
  description: Scalars['String'],
  location: Scalars['String'],
  flierLink?: Maybe<Scalars['String']>,
  eventLink?: Maybe<Scalars['String']>,
  hostSig: Scalars['String'],
};

export type EventDeletePayload = {
   __typename?: 'EventDeletePayload',
  id?: Maybe<Scalars['Float']>,
};

export type EventUpdateInput = {
  eventTitle?: Maybe<Scalars['String']>,
  dateHosted?: Maybe<Scalars['DateTime']>,
  dateExpire?: Maybe<Scalars['DateTime']>,
  description?: Maybe<Scalars['String']>,
  location?: Maybe<Scalars['String']>,
  flierLink?: Maybe<Scalars['String']>,
  eventLink?: Maybe<Scalars['String']>,
  hostSig: Scalars['String'],
};

export type Extension = {
   __typename?: 'Extension',
  code: ErrorCodes,
};

export type Group = {
   __typename?: 'Group',
  name: Scalars['String'],
  users: Array<User>,
  permissions: Array<Permission>,
  redemptionCodes: Array<RedemptionCode>,
};

export type MembershipProduct = {
   __typename?: 'MembershipProduct',
  tag: MembershipTypes,
};

export enum MembershipTypes {
  Yearly = 'YEARLY',
  Semesterly = 'SEMESTERLY'
}

export type Mutation = {
   __typename?: 'Mutation',
  createUser: User,
  updateUser: User,
  deleteUser: UserDeletePayload,
  createSig: Sig,
  updateSig: Sig,
  deleteSig: SigDeletePayload,
  deleteEvent: EventDeletePayload,
  updateEvent: Event,
  createEvent: Event,
  createPermission: Permission,
  createRedemptionCode: RedemptionCode,
  redeemRedemptionCode: RedemptionCode,
  deleteResume: User,
  uploadResume: Resume,
  startMembershipTransaction: TransactionPayload,
  startProductTransaction: TransactionPayload,
  addUserToGroups: User,
  addPermissionsToUser: User,
  updateExpirationDate: User,
  updateShirtReceived: User,
  resetShirtReceived?: Maybe<Array<User>>,
};


export type MutationCreateUserArgs = {
  data: UserCreateInput
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput,
  id: Scalars['String']
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']
};


export type MutationCreateSigArgs = {
  data: SigCreateInput
};


export type MutationUpdateSigArgs = {
  data: SigUpdateInput,
  id: Scalars['String']
};


export type MutationDeleteSigArgs = {
  id: Scalars['String']
};


export type MutationDeleteEventArgs = {
  id: Scalars['Float']
};


export type MutationUpdateEventArgs = {
  flier?: Maybe<Scalars['Upload']>,
  data?: Maybe<EventUpdateInput>,
  id: Scalars['Float']
};


export type MutationCreateEventArgs = {
  flier?: Maybe<Scalars['Upload']>,
  data: EventCreateInput
};


export type MutationCreatePermissionArgs = {
  data: PermissionCreateInput
};


export type MutationCreateRedemptionCodeArgs = {
  groupIds?: Maybe<Array<Scalars['String']>>,
  permissionIds?: Maybe<Array<Scalars['String']>>,
  productTags?: Maybe<Array<Scalars['String']>>
};


export type MutationRedeemRedemptionCodeArgs = {
  redemptionCode: Scalars['String']
};


export type MutationUploadResumeArgs = {
  lastName: Scalars['String'],
  firstName: Scalars['String'],
  graduationDate: Scalars['DateTime'],
  resume: Scalars['Upload']
};


export type MutationStartMembershipTransactionArgs = {
  membershipType: MembershipTypes
};


export type MutationStartProductTransactionArgs = {
  purchase: PurchaseInput
};


export type MutationAddUserToGroupsArgs = {
  groupIds: Array<Scalars['String']>,
  userId: Scalars['String']
};


export type MutationAddPermissionsToUserArgs = {
  permissionIds: Array<Scalars['String']>,
  userId: Scalars['String']
};


export type MutationUpdateExpirationDateArgs = {
  newExpirationDate: Scalars['DateTime'],
  userId: Scalars['String']
};


export type MutationUpdateShirtReceivedArgs = {
  updatedShirtStatus: Scalars['Boolean'],
  userId: Scalars['String']
};

export type Permission = {
   __typename?: 'Permission',
  name: Scalars['ID'],
  users: Array<User>,
  redemptionCodes: Array<RedemptionCode>,
};

export type PermissionCreateInput = {
  name: Scalars['String'],
};

export type PermissionDeletePayload = {
   __typename?: 'PermissionDeletePayload',
  name?: Maybe<Scalars['String']>,
};

export type PermissionUpdateInput = {
  name?: Maybe<Scalars['String']>,
};

export type Product = {
   __typename?: 'Product',
  tag: Scalars['ID'],
  displayName: Scalars['String'],
  description: Scalars['String'],
  statementDescriptor?: Maybe<Scalars['String']>,
  price: Scalars['Float'],
};

export type Purchase = {
   __typename?: 'Purchase',
  id: Scalars['ID'],
  quantity: Scalars['Float'],
  product: Product,
  transaction: Array<Transaction>,
};

export type PurchaseInput = {
  quantity?: Maybe<Scalars['Int']>,
  tag: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  user: User,
  users: Array<User>,
  sig: Sig,
  sigs: Array<Sig>,
  events: Array<Event>,
  currentEvents: Array<Event>,
  event: Event,
  permissions: Array<Permission>,
  products: Array<Product>,
  redemptionCodes: Array<RedemptionCode>,
  resumes: Array<Resume>,
  transactions: Array<Transaction>,
  me?: Maybe<User>,
};


export type QueryUserArgs = {
  id: Scalars['String']
};


export type QuerySigArgs = {
  id: Scalars['String']
};


export type QueryEventArgs = {
  id: Scalars['Float']
};

export type RedemptionCode = {
   __typename?: 'RedemptionCode',
  id: Scalars['ID'],
  redeemed?: Maybe<Scalars['Boolean']>,
  expirationDate: Scalars['DateTime'],
  transaction: Transaction,
  permissions: Array<Permission>,
  groups: Array<Group>,
};

export type Resume = {
   __typename?: 'Resume',
  id: Scalars['ID'],
  url: Scalars['String'],
  added: Scalars['DateTime'],
  user: User,
};

export type Sig = {
   __typename?: 'Sig',
  name: Scalars['String'],
  dateFounded: Scalars['DateTime'],
  description: Scalars['String'],
  users: Array<User>,
  hostedEvents: Array<Event>,
};

export type SigCreateInput = {
  name: Scalars['String'],
  description: Scalars['String'],
};

export type SigDeletePayload = {
   __typename?: 'SigDeletePayload',
  name?: Maybe<Scalars['String']>,
};

export type SigUpdateInput = {
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
};

export type Transaction = {
   __typename?: 'Transaction',
  id: Scalars['ID'],
  intent?: Maybe<Scalars['String']>,
  charged?: Maybe<Scalars['Float']>,
  paymentType: Scalars['String'],
  status: Scalars['String'],
  user: User,
  purchases: Array<Purchase>,
  redemptionCode: RedemptionCode,
};

export type TransactionPayload = {
   __typename?: 'TransactionPayload',
  id: Scalars['String'],
  charged?: Maybe<Scalars['Float']>,
  clientSecret: Scalars['String'],
};


export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  emailVerified: Scalars['Boolean'],
  profilePictureUrl: Scalars['String'],
  graduationDate?: Maybe<Scalars['DateTime']>,
  shirtReceived?: Maybe<Scalars['Boolean']>,
  isSuperAdmin?: Maybe<Scalars['Boolean']>,
  dateJoined: Scalars['DateTime'],
  membershipExpiration?: Maybe<Scalars['DateTime']>,
  isActive?: Maybe<Scalars['Boolean']>,
  resume?: Maybe<Resume>,
  permissions?: Maybe<Array<Permission>>,
  groups: Array<Group>,
};

export type UserCreateInput = {
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  sub: Scalars['String'],
};

export type UserDeletePayload = {
   __typename?: 'UserDeletePayload',
  firstName?: Maybe<Scalars['String']>,
};

export type UserUpdateInput = {
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
};

export type RedeemRedemptionCodeMutationVariables = {
  code: Scalars['String']
};


export type RedeemRedemptionCodeMutation = (
  { __typename?: 'Mutation' }
  & { redeemRedemptionCode: (
    { __typename?: 'RedemptionCode' }
    & Pick<RedemptionCode, 'id' | 'redeemed'>
  ) }
);

export type GetMembershipMutationVariables = {
  membershipType: MembershipTypes
};


export type GetMembershipMutation = (
  { __typename?: 'Mutation' }
  & { startMembershipTransaction: (
    { __typename?: 'TransactionPayload' }
    & Pick<TransactionPayload, 'id' | 'charged' | 'clientSecret'>
  ) }
);

export type GetCurrentEventsQueryVariables = {};


export type GetCurrentEventsQuery = (
  { __typename?: 'Query' }
  & { currentEvents: Array<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'dateCreated' | 'dateHosted' | 'dateExpire' | 'eventTitle' | 'description' | 'location' | 'flierLink' | 'eventLink'>
    & { hostSig: (
      { __typename?: 'Sig' }
      & Pick<Sig, 'name'>
    ) }
  )> }
);

export type MeExpirationQueryVariables = {};


export type MeExpirationQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'membershipExpiration'>
  )> }
);

export type MembersQueryVariables = {};


export type MembersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'isActive' | 'membershipExpiration' | 'shirtReceived'>
  )> }
);

export type UpdateExpirationDateMutationVariables = {
  date: Scalars['DateTime'],
  id: Scalars['String']
};


export type UpdateExpirationDateMutation = (
  { __typename?: 'Mutation' }
  & { updateExpirationDate: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type UpdateShirtReceivedMutationVariables = {
  received: Scalars['Boolean'],
  id: Scalars['String']
};


export type UpdateShirtReceivedMutation = (
  { __typename?: 'Mutation' }
  & { updateShirtReceived: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type ResetShirtReceivedMutationVariables = {};


export type ResetShirtReceivedMutation = (
  { __typename?: 'Mutation' }
  & { resetShirtReceived: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'shirtReceived'>
  )>> }
);

export type DeleteMemberMutationVariables = {
  id: Scalars['String']
};


export type DeleteMemberMutation = (
  { __typename?: 'Mutation' }
  & { deleteUser: (
    { __typename?: 'UserDeletePayload' }
    & Pick<UserDeletePayload, 'firstName'>
  ) }
);


export const RedeemRedemptionCodeDocument = gql`
    mutation RedeemRedemptionCode($code: String!) {
  redeemRedemptionCode(redemptionCode: $code) {
    id
    redeemed
  }
}
    `;
export type RedeemRedemptionCodeMutationFn = ApolloReactCommon.MutationFunction<RedeemRedemptionCodeMutation, RedeemRedemptionCodeMutationVariables>;

/**
 * __useRedeemRedemptionCodeMutation__
 *
 * To run a mutation, you first call `useRedeemRedemptionCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRedeemRedemptionCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [redeemRedemptionCodeMutation, { data, loading, error }] = useRedeemRedemptionCodeMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useRedeemRedemptionCodeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RedeemRedemptionCodeMutation, RedeemRedemptionCodeMutationVariables>) {
        return ApolloReactHooks.useMutation<RedeemRedemptionCodeMutation, RedeemRedemptionCodeMutationVariables>(RedeemRedemptionCodeDocument, baseOptions);
      }
export type RedeemRedemptionCodeMutationHookResult = ReturnType<typeof useRedeemRedemptionCodeMutation>;
export type RedeemRedemptionCodeMutationResult = ApolloReactCommon.MutationResult<RedeemRedemptionCodeMutation>;
export type RedeemRedemptionCodeMutationOptions = ApolloReactCommon.BaseMutationOptions<RedeemRedemptionCodeMutation, RedeemRedemptionCodeMutationVariables>;
export const GetMembershipDocument = gql`
    mutation GetMembership($membershipType: MembershipTypes!) {
  startMembershipTransaction(membershipType: $membershipType) {
    id
    charged
    clientSecret
  }
}
    `;
export type GetMembershipMutationFn = ApolloReactCommon.MutationFunction<GetMembershipMutation, GetMembershipMutationVariables>;

/**
 * __useGetMembershipMutation__
 *
 * To run a mutation, you first call `useGetMembershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetMembershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getMembershipMutation, { data, loading, error }] = useGetMembershipMutation({
 *   variables: {
 *      membershipType: // value for 'membershipType'
 *   },
 * });
 */
export function useGetMembershipMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GetMembershipMutation, GetMembershipMutationVariables>) {
        return ApolloReactHooks.useMutation<GetMembershipMutation, GetMembershipMutationVariables>(GetMembershipDocument, baseOptions);
      }
export type GetMembershipMutationHookResult = ReturnType<typeof useGetMembershipMutation>;
export type GetMembershipMutationResult = ApolloReactCommon.MutationResult<GetMembershipMutation>;
export type GetMembershipMutationOptions = ApolloReactCommon.BaseMutationOptions<GetMembershipMutation, GetMembershipMutationVariables>;
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

/**
 * __useGetCurrentEventsQuery__
 *
 * To run a query within a React component, call `useGetCurrentEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentEventsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCurrentEventsQuery, GetCurrentEventsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCurrentEventsQuery, GetCurrentEventsQueryVariables>(GetCurrentEventsDocument, baseOptions);
      }
export function useGetCurrentEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrentEventsQuery, GetCurrentEventsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCurrentEventsQuery, GetCurrentEventsQueryVariables>(GetCurrentEventsDocument, baseOptions);
        }
export type GetCurrentEventsQueryHookResult = ReturnType<typeof useGetCurrentEventsQuery>;
export type GetCurrentEventsLazyQueryHookResult = ReturnType<typeof useGetCurrentEventsLazyQuery>;
export type GetCurrentEventsQueryResult = ApolloReactCommon.QueryResult<GetCurrentEventsQuery, GetCurrentEventsQueryVariables>;
export const MeExpirationDocument = gql`
    query MeExpiration {
  me {
    membershipExpiration
  }
}
    `;

/**
 * __useMeExpirationQuery__
 *
 * To run a query within a React component, call `useMeExpirationQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeExpirationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeExpirationQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeExpirationQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeExpirationQuery, MeExpirationQueryVariables>) {
        return ApolloReactHooks.useQuery<MeExpirationQuery, MeExpirationQueryVariables>(MeExpirationDocument, baseOptions);
      }
export type DeleteEventMutationHookResult = ReturnType<typeof useDeleteEventMutation>;
export type DeleteEventMutationResult = ApolloReactCommon.MutationResult<DeleteEventMutation>;
export type DeleteEventMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteEventMutation, DeleteEventMutationVariables>;
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
export function useMembersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MembersQuery, MembersQueryVariables>) {
        return ApolloReactHooks.useQuery<MembersQuery, MembersQueryVariables>(MembersDocument, baseOptions);
      }
export function useMembersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MembersQuery, MembersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MembersQuery, MembersQueryVariables>(MembersDocument, baseOptions);
        }
export type MembersQueryHookResult = ReturnType<typeof useMembersQuery>;
export type MembersLazyQueryHookResult = ReturnType<typeof useMembersLazyQuery>;
export type MembersQueryResult = ApolloReactCommon.QueryResult<MembersQuery, MembersQueryVariables>;
export const UpdateExpirationDateDocument = gql`
    mutation UpdateExpirationDate($date: DateTime!, $id: String!) {
  updateExpirationDate(newExpirationDate: $date, userId: $id) {
    id
  }
}
    `;
export type UpdateExpirationDateMutationFn = ApolloReactCommon.MutationFunction<UpdateExpirationDateMutation, UpdateExpirationDateMutationVariables>;

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
export function useUpdateExpirationDateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateExpirationDateMutation, UpdateExpirationDateMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateExpirationDateMutation, UpdateExpirationDateMutationVariables>(UpdateExpirationDateDocument, baseOptions);
      }
export type UpdateExpirationDateMutationHookResult = ReturnType<typeof useUpdateExpirationDateMutation>;
export type UpdateExpirationDateMutationResult = ApolloReactCommon.MutationResult<UpdateExpirationDateMutation>;
export type UpdateExpirationDateMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateExpirationDateMutation, UpdateExpirationDateMutationVariables>;
export const UpdateShirtReceivedDocument = gql`
    mutation UpdateShirtReceived($received: Boolean!, $id: String!) {
  updateShirtReceived(updatedShirtStatus: $received, userId: $id) {
    id
  }
}
    `;
export type UpdateShirtReceivedMutationFn = ApolloReactCommon.MutationFunction<UpdateShirtReceivedMutation, UpdateShirtReceivedMutationVariables>;

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
export function useUpdateShirtReceivedMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateShirtReceivedMutation, UpdateShirtReceivedMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateShirtReceivedMutation, UpdateShirtReceivedMutationVariables>(UpdateShirtReceivedDocument, baseOptions);
      }
export type UpdateShirtReceivedMutationHookResult = ReturnType<typeof useUpdateShirtReceivedMutation>;
export type UpdateShirtReceivedMutationResult = ApolloReactCommon.MutationResult<UpdateShirtReceivedMutation>;
export type UpdateShirtReceivedMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateShirtReceivedMutation, UpdateShirtReceivedMutationVariables>;
export const ResetShirtReceivedDocument = gql`
    mutation ResetShirtReceived {
  resetShirtReceived {
    shirtReceived
  }
}
    `;
export type ResetShirtReceivedMutationFn = ApolloReactCommon.MutationFunction<ResetShirtReceivedMutation, ResetShirtReceivedMutationVariables>;

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
export function useResetShirtReceivedMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetShirtReceivedMutation, ResetShirtReceivedMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetShirtReceivedMutation, ResetShirtReceivedMutationVariables>(ResetShirtReceivedDocument, baseOptions);
      }
export type ResetShirtReceivedMutationHookResult = ReturnType<typeof useResetShirtReceivedMutation>;
export type ResetShirtReceivedMutationResult = ApolloReactCommon.MutationResult<ResetShirtReceivedMutation>;
export type ResetShirtReceivedMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetShirtReceivedMutation, ResetShirtReceivedMutationVariables>;
export const DeleteMemberDocument = gql`
    mutation DeleteMember($id: String!) {
  deleteUser(id: $id) {
    firstName
  }
}
    `;
export type DeleteMemberMutationFn = ApolloReactCommon.MutationFunction<DeleteMemberMutation, DeleteMemberMutationVariables>;

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
export function useDeleteMemberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMemberMutation, DeleteMemberMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteMemberMutation, DeleteMemberMutationVariables>(DeleteMemberDocument, baseOptions);
      }
export type DeleteMemberMutationHookResult = ReturnType<typeof useDeleteMemberMutation>;
export type DeleteMemberMutationResult = ApolloReactCommon.MutationResult<DeleteMemberMutation>;
export type DeleteMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteMemberMutation, DeleteMemberMutationVariables>;
