import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  BadUserInput = 'BAD_USER_INPUT',
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  ResourceNotFound = 'RESOURCE_NOT_FOUND',
  Unauthenticated = 'UNAUTHENTICATED'
}

export type Event = {
  __typename?: 'Event';
  attendees?: Maybe<Array<User>>;
  creator: User;
  dateCreated: Scalars['DateTime'];
  dateExpire: Scalars['DateTime'];
  dateHosted: Scalars['DateTime'];
  description: Scalars['String'];
  eventLink?: Maybe<Scalars['String']>;
  eventTitle: Scalars['String'];
  flierLink?: Maybe<Scalars['String']>;
  hostSig: Sig;
  id: Scalars['ID'];
  location: Scalars['String'];
  urlKey?: Maybe<Scalars['String']>;
};

export type EventCreateInput = {
  dateExpire: Scalars['DateTime'];
  dateHosted: Scalars['DateTime'];
  description: Scalars['String'];
  eventLink?: InputMaybe<Scalars['String']>;
  eventTitle: Scalars['String'];
  flierLink?: InputMaybe<Scalars['String']>;
  hostSig: Scalars['String'];
  location: Scalars['String'];
};

export type EventDeletePayload = {
  __typename?: 'EventDeletePayload';
  id?: Maybe<Scalars['Float']>;
};

export type EventUpdateInput = {
  dateExpire?: InputMaybe<Scalars['DateTime']>;
  dateHosted?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  eventLink?: InputMaybe<Scalars['String']>;
  eventTitle?: InputMaybe<Scalars['String']>;
  flierLink?: InputMaybe<Scalars['String']>;
  hostSig: Scalars['String'];
  location?: InputMaybe<Scalars['String']>;
};

export type Extension = {
  __typename?: 'Extension';
  code: ErrorCodes;
};

export type Group = {
  __typename?: 'Group';
  name: Scalars['String'];
  permissions: Array<Permission>;
  redemptionCodes: Array<RedemptionCode>;
  users: Array<User>;
};

export type MembershipProduct = {
  __typename?: 'MembershipProduct';
  tag: MembershipTypes;
};

/** Different types of ACM memberships one can have. */
export enum MembershipTypes {
  Semesterly = 'SEMESTERLY',
  Yearly = 'YEARLY'
}

export type Mutation = {
  __typename?: 'Mutation';
  addAttendee: Event;
  addPermissionsToUser: User;
  addUserToGroups: User;
  attendEvent: Event;
  createEvent: Event;
  createGroup: Group;
  createPermission: Permission;
  createRedemptionCode: RedemptionCode;
  createSig: Sig;
  createUser: User;
  deleteEvent: EventDeletePayload;
  deleteResume: User;
  deleteSig: SigDeletePayload;
  deleteUser: UserDeletePayload;
  redeemRedemptionCode: RedemptionCode;
  resetShirtReceived: Array<User>;
  startMembershipTransaction: TransactionPayload;
  startProductTransaction: TransactionPayload;
  updateEvent: Event;
  updateExpirationDate: User;
  updateShirtReceived: User;
  updateSig: Sig;
  updateUser: User;
  uploadResume: Resume;
};


export type MutationAddAttendeeArgs = {
  eventId: Scalars['Float'];
  userId: Scalars['String'];
};


export type MutationAddPermissionsToUserArgs = {
  permissionIds: Array<Scalars['String']>;
  userId: Scalars['String'];
};


export type MutationAddUserToGroupsArgs = {
  groupIds: Array<Scalars['String']>;
  userId: Scalars['String'];
};


export type MutationAttendEventArgs = {
  eventId: Scalars['Float'];
};


export type MutationCreateEventArgs = {
  data: EventCreateInput;
  flier?: InputMaybe<Scalars['Upload']>;
};


export type MutationCreateGroupArgs = {
  name: Scalars['String'];
  permissionIds: Array<Scalars['String']>;
};


export type MutationCreatePermissionArgs = {
  data: PermissionCreateInput;
};


export type MutationCreateRedemptionCodeArgs = {
  groupIds?: InputMaybe<Array<Scalars['String']>>;
  permissionIds?: InputMaybe<Array<Scalars['String']>>;
  productTags?: InputMaybe<Array<Scalars['String']>>;
};


export type MutationCreateSigArgs = {
  data: SigCreateInput;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationDeleteEventArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteSigArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationRedeemRedemptionCodeArgs = {
  redemptionCode: Scalars['String'];
};


export type MutationStartMembershipTransactionArgs = {
  membershipType: MembershipTypes;
};


export type MutationStartProductTransactionArgs = {
  purchase: PurchaseInput;
};


export type MutationUpdateEventArgs = {
  data?: InputMaybe<EventUpdateInput>;
  flier?: InputMaybe<Scalars['Upload']>;
  id: Scalars['Float'];
};


export type MutationUpdateExpirationDateArgs = {
  newExpirationDate: Scalars['DateTime'];
  userId: Scalars['String'];
};


export type MutationUpdateShirtReceivedArgs = {
  updatedShirtStatus: Scalars['Boolean'];
  userId: Scalars['String'];
};


export type MutationUpdateSigArgs = {
  data: SigUpdateInput;
  id: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  id: Scalars['String'];
};


export type MutationUploadResumeArgs = {
  firstName: Scalars['String'];
  graduationDate: Scalars['DateTime'];
  lastName: Scalars['String'];
  resume: Scalars['Upload'];
};

export type Permission = {
  __typename?: 'Permission';
  name: Scalars['ID'];
  redemptionCodes: Array<RedemptionCode>;
  users: Array<User>;
};

export type PermissionCreateInput = {
  name: Scalars['String'];
};

export type PermissionDeletePayload = {
  __typename?: 'PermissionDeletePayload';
  name?: Maybe<Scalars['String']>;
};

export type PermissionUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type Product = {
  __typename?: 'Product';
  description: Scalars['String'];
  displayName: Scalars['String'];
  price: Scalars['Float'];
  statementDescriptor?: Maybe<Scalars['String']>;
  tag: Scalars['ID'];
};

export type Purchase = {
  __typename?: 'Purchase';
  id: Scalars['ID'];
  product: Product;
  quantity: Scalars['Float'];
  transaction: Array<Transaction>;
};

export type PurchaseInput = {
  quantity?: InputMaybe<Scalars['Int']>;
  tag: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  currentEvents: Array<Event>;
  event: Event;
  events: Array<Event>;
  eventsWithKey: Array<Event>;
  groups: Array<Group>;
  me?: Maybe<User>;
  permissions: Array<Permission>;
  products: Array<Product>;
  redemptionCodes: Array<RedemptionCode>;
  resumes: Array<Resume>;
  sig: Sig;
  sigs: Array<Sig>;
  transactions: Array<Transaction>;
  user: User;
  users: Array<User>;
};


export type QueryEventArgs = {
  id: Scalars['Float'];
};


export type QueryEventsWithKeyArgs = {
  urlKey: Scalars['String'];
};


export type QuerySigArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type RedemptionCode = {
  __typename?: 'RedemptionCode';
  expirationDate: Scalars['DateTime'];
  groups: Array<Group>;
  id: Scalars['ID'];
  permissions: Array<Permission>;
  redeemed?: Maybe<Scalars['Boolean']>;
  transaction?: Maybe<Transaction>;
};

export type Resume = {
  __typename?: 'Resume';
  added: Scalars['DateTime'];
  id: Scalars['ID'];
  url: Scalars['String'];
  user: User;
};

export type Sig = {
  __typename?: 'Sig';
  dateFounded: Scalars['DateTime'];
  description: Scalars['String'];
  hostedEvents: Array<Event>;
  name: Scalars['String'];
  users: Array<User>;
};

export type SigCreateInput = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type SigDeletePayload = {
  __typename?: 'SigDeletePayload';
  name?: Maybe<Scalars['String']>;
};

export type SigUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  charged?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  intent?: Maybe<Scalars['String']>;
  paymentType: Scalars['String'];
  purchases: Array<Purchase>;
  redemptionCode: RedemptionCode;
  status: Scalars['String'];
  user: User;
};

export type TransactionPayload = {
  __typename?: 'TransactionPayload';
  charged?: Maybe<Scalars['Float']>;
  clientSecret: Scalars['String'];
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  dateJoined: Scalars['DateTime'];
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  eventsAttended?: Maybe<Array<Event>>;
  firstName?: Maybe<Scalars['String']>;
  graduationDate?: Maybe<Scalars['DateTime']>;
  groups: Array<Group>;
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  isSuperAdmin?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  membershipExpiration?: Maybe<Scalars['DateTime']>;
  permissions?: Maybe<Array<Permission>>;
  profilePictureUrl: Scalars['String'];
  resume?: Maybe<Resume>;
  shirtReceived?: Maybe<Scalars['Boolean']>;
};

export type UserCreateInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  sub: Scalars['String'];
};

export type UserDeletePayload = {
  __typename?: 'UserDeletePayload';
  firstName?: Maybe<Scalars['String']>;
};

export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type RedeemRedemptionCodeMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type RedeemRedemptionCodeMutation = { __typename?: 'Mutation', redeemRedemptionCode: { __typename?: 'RedemptionCode', id: string, redeemed?: boolean | null } };

export type GetMembershipMutationVariables = Exact<{
  membershipType: MembershipTypes;
}>;


export type GetMembershipMutation = { __typename?: 'Mutation', startMembershipTransaction: { __typename?: 'TransactionPayload', id: string, charged?: number | null, clientSecret: string } };

export type GetCurrentEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentEventsQuery = { __typename?: 'Query', currentEvents: Array<{ __typename?: 'Event', id: string, dateCreated: any, dateHosted: any, dateExpire: any, eventTitle: string, description: string, location: string, flierLink?: string | null, eventLink?: string | null, hostSig: { __typename?: 'Sig', name: string } }> };

export type MeExpirationQueryVariables = Exact<{ [key: string]: never; }>;


export type MeExpirationQuery = { __typename?: 'Query', me?: { __typename?: 'User', membershipExpiration?: any | null } | null };


export const RedeemRedemptionCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RedeemRedemptionCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"redeemRedemptionCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"redemptionCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"redeemed"}}]}}]}}]} as unknown as DocumentNode<RedeemRedemptionCodeMutation, RedeemRedemptionCodeMutationVariables>;
export const GetMembershipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetMembership"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"membershipType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MembershipTypes"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startMembershipTransaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"membershipType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"membershipType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"charged"}},{"kind":"Field","name":{"kind":"Name","value":"clientSecret"}}]}}]}}]} as unknown as DocumentNode<GetMembershipMutation, GetMembershipMutationVariables>;
export const GetCurrentEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCurrentEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dateCreated"}},{"kind":"Field","name":{"kind":"Name","value":"dateHosted"}},{"kind":"Field","name":{"kind":"Name","value":"dateExpire"}},{"kind":"Field","name":{"kind":"Name","value":"hostSig"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"eventTitle"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"flierLink"}},{"kind":"Field","name":{"kind":"Name","value":"eventLink"}}]}}]}}]} as unknown as DocumentNode<GetCurrentEventsQuery, GetCurrentEventsQueryVariables>;
export const MeExpirationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MeExpiration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"membershipExpiration"}}]}}]}}]} as unknown as DocumentNode<MeExpirationQuery, MeExpirationQueryVariables>;