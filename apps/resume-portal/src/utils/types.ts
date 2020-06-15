import { ResumeCardsQuery } from "../generated/graphql";

export type User = ResumeCardsQuery["users"][number];
export type Resume = User["resume"];
export type Community = {name: string;};
