import { createContext } from "react";
import { User } from "../utils/types";

export interface IFavoriteContextProps {
  users: User[];
  filterFavorites: boolean;
  flipFavorite(id: string): void;
  isFavorite(id: string): boolean;
  setFilterFavorites(filter: boolean): void;
}

export const FavoritesContext = createContext<IFavoriteContextProps>({
  users: [],
  flipFavorite: () => {},
  isFavorite: () => false,
  filterFavorites: false,
  setFilterFavorites: () => {}
});
