import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
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

export type ResumeCardsQueryVariables = {};


export type ResumeCardsQuery = (
  { __typename?: 'Query' }
  & { resumes: Array<(
    { __typename?: 'Resume' }
    & Pick<Resume, 'url' | 'added'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'profilePictureUrl' | 'graduationDate'>
    ) }
  )> }
);


export const ResumeCardsDocument = gql`
    query ResumeCards {
  resumes {
    url
    added
    user {
      id
      firstName
      lastName
      email
      profilePictureUrl
      graduationDate
    }
  }
}
    `;

/**
 * __useResumeCardsQuery__
 *
 * To run a query within a React component, call `useResumeCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useResumeCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResumeCardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useResumeCardsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ResumeCardsQuery, ResumeCardsQueryVariables>) {
        return ApolloReactHooks.useQuery<ResumeCardsQuery, ResumeCardsQueryVariables>(ResumeCardsDocument, baseOptions);
      }
export function useResumeCardsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ResumeCardsQuery, ResumeCardsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ResumeCardsQuery, ResumeCardsQueryVariables>(ResumeCardsDocument, baseOptions);
        }
export type ResumeCardsQueryHookResult = ReturnType<typeof useResumeCardsQuery>;
export type ResumeCardsLazyQueryHookResult = ReturnType<typeof useResumeCardsLazyQuery>;
export type ResumeCardsQueryResult = ApolloReactCommon.QueryResult<ResumeCardsQuery, ResumeCardsQueryVariables>;