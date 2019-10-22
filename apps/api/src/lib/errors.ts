import { Field, ObjectType, registerEnumType } from "type-graphql";

import { ApolloError } from "apollo-server";

enum ErrorCodes {
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
  UNAUTHENTICATED = "UNATHENTICATED",
  BAD_USER_INPUT = "BAD_USER_INPUT"
}

registerEnumType(ErrorCodes, {
  description: "The potential errors codes that will be sent to a user.",
  name: "ErrorCodes"
});

@ObjectType()
export class Extension {
  @Field(() => ErrorCodes)
  public code: ErrorCodes;
}

export class NotFoundError extends ApolloError {
  constructor(id: number | string) {
    super(
      `Could not find resource with ID ${id}.`,
      ErrorCodes.RESOURCE_NOT_FOUND
    );
  }
}

export class BadUserInputError extends ApolloError {
  constructor(message: string) {
    super(message, ErrorCodes.BAD_USER_INPUT);
  }
}
