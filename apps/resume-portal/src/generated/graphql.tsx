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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};


/** The potential errors codes that will be sent to a user. */
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

export type MembershipProduct = {
   __typename?: 'MembershipProduct',
  tag: MembershipTypes,
};

/** Different types of ACM memberships one can have. */
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
  deleteResume: User,
  uploadResume: Resume,
  startMembershipTransaction: TransactionPayload,
  startProductTransaction: TransactionPayload,
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
  data: EventUpdateInput,
  id: Scalars['Float']
};


export type MutationCreateEventArgs = {
  data: EventCreateInput
};


export type MutationCreatePermissionArgs = {
  data: PermissionCreateInput
};


export type MutationUploadResumeArgs = {
  resume: Scalars['Upload']
};


export type MutationStartMembershipTransactionArgs = {
  membershipType: MembershipTypes
};


export type MutationStartProductTransactionArgs = {
  purchase: PurchaseInput
};

export type Permission = {
   __typename?: 'Permission',
  name: Scalars['ID'],
  users: Array<User>,
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
  event: Event,
  permissions: Array<Permission>,
  products: Array<Product>,
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
  intent: Scalars['String'],
  charged: Scalars['Float'],
  status: Scalars['String'],
  user: User,
  purchases: Array<Purchase>,
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
  isSuperAdmin?: Maybe<Scalars['Boolean']>,
  dateJoined: Scalars['DateTime'],
  membershipExpiration?: Maybe<Scalars['DateTime']>,
  isActive?: Maybe<Scalars['Boolean']>,
  resume?: Maybe<Resume>,
  permissions?: Maybe<Array<Permission>>,
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

    export function useResumeCardsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ResumeCardsQuery, ResumeCardsQueryVariables>) {
      return ApolloReactHooks.useQuery<ResumeCardsQuery, ResumeCardsQueryVariables>(ResumeCardsDocument, baseOptions);
    }
      export function useResumeCardsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ResumeCardsQuery, ResumeCardsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ResumeCardsQuery, ResumeCardsQueryVariables>(ResumeCardsDocument, baseOptions);
      }
      
export type ResumeCardsQueryHookResult = ReturnType<typeof useResumeCardsQuery>;
export type ResumeCardsQueryResult = ApolloReactCommon.QueryResult<ResumeCardsQuery, ResumeCardsQueryVariables>;