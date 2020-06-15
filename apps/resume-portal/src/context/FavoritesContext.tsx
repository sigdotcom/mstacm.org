import { createContext } from "react";
import { User } from "../utils/types";

export interface IFavoriteContextProps {
  users: User[];
  selectedCommunities: string[];
  filterFavorites: boolean;
  flipFavorite(id: string): void;
  isFavorite(id: string): boolean;
  setFilterFavorites(filter: boolean): void;
  changeCommunities(selected: string[]): void;
}

export const FavoritesContext = createContext<IFavoriteContextProps>({
  users: [],
  selectedCommunities: [],
  flipFavorite: () => {},
  isFavorite: () => false,
  filterFavorites: false,
  setFilterFavorites: () => {},
  changeCommunities: () => {}
});
