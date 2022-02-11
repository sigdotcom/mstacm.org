import { ResumeCardsQuery } from "../generated/graphql";

export type Resume = ResumeCardsQuery["resumes"][number];
export type User = Resume["user"] & { resume: Resume };
