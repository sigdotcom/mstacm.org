import { GetUsersQuery } from "../generated/graphql";

export type User = GetUsersQuery["users"][number];
export type Resume = User["resume"];
export type Community = { name: string };
