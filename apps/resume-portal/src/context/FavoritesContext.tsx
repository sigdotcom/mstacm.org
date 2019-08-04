import { createContext } from "react";

export interface IFavoriteContextProps {
  favorites: { [id: string]: boolean | undefined };
  flipFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  filterFavorites: boolean;
  setFilterFavorites: (filter: boolean) => void;
}

export const FavoritesContext = createContext<IFavoriteContextProps>({
  favorites: {},
  flipFavorite: (id: string) => {},
  isFavorite: (id: string) => false,
  filterFavorites: false,
  setFilterFavorites: (filter: boolean) => {}
});
