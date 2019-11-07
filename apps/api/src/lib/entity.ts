import { BaseEntity } from "typeorm";

export function mergeEntityLists<T extends BaseEntity>(
  lhs: T[],
  rhs: T[]
): T[] {
  return [...new Set<T>([...lhs, ...rhs])];
}
