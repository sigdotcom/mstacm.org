import "./App.css";

import React, { useState } from "react";

import { useResumeCardsQuery } from "./generated/graphql";
import { ResumesPage } from "./screens/ResumesPage";
import { User } from "./utils/types";

import {
  FavoritesContext,
  IFavoriteContextProps
} from "./context/FavoritesContext";

import {
  IPaginationContextProps,
  PaginationContext
} from "./context/PaginationContext";

type Favorites = {
  [id: string]: boolean | undefined;
};

const useJSONLocalStorage = (
  key: string
): [Favorites, ((favorites: Favorites) => void)] => {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem(key) || "{}")
  );

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filterFavorites, setFilterFavorites] = useState<boolean>(false);
  const [curPage, setCurPage] = useState<number>(1);
  const [displayPerPage, setDisplayPerPage] = useState<number>(10);
  const [favorites, setFavorites] = useJSONLocalStorage("favorites");

  const { data, loading } = useResumeCardsQuery();
  if (loading === false && users.length === 0 && data) {
    setUsers(data.users);
  }
  const favoritesContext: IFavoriteContextProps = {
    users,
    filterFavorites,
    setFilterFavorites,
    isFavorite: (id: string): boolean => {
      return favorites[id] || false;
    },
    flipFavorite: (id: string): void => {
      setFavorites({
        ...favorites,
        [id]: !(favorites[id] || false)
      });
    }
  };

  const paginationContext: IPaginationContextProps = {
    curPage,
    displayPerPage,
    setCurPage,
    setDisplayPerPage
  };

  return (
    <div style={{ backgroundColor: "#F4F5F8", minHeight: "100vh" }}>
      <FavoritesContext.Provider value={favoritesContext}>
        <PaginationContext.Provider value={paginationContext}>
          <ResumesPage />
        </PaginationContext.Provider>
      </FavoritesContext.Provider>
    </div>
  );
};

export default App;
