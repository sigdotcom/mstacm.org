import { createContext } from "react";

export interface IPaginationContextProps {
  curPage: number;
  displayPerPage: number;
  setCurPage(page: number): void;
  setDisplayPerPage(numPerPage: number): void;
}

export const PaginationContext = createContext<IPaginationContextProps>({
  curPage: 1,
  displayPerPage: 10,
  setCurPage: (): void => {},
  setDisplayPerPage: (): void => {}
});
