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

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filterFavorites, setFilterFavorites] = useState<boolean>(false);
  const [curPage, setCurPage] = useState<number>(1);
  const [displayPerPage, setDisplayPerPage] = useState<number>(10);
  const [favorites, setFavorites] = useState<{
    [id: string]: boolean | undefined;
  }>({});

  const { data, loading } = useResumeCardsQuery();
  if (loading === false && users.length === 0 && data) {
    setUsers(data.users);
  }
  const favoritesContext: IFavoriteContextProps = {
    users,
    filterFavorites,
    setFilterFavorites,
    isFavorite: (id: string) => {
      return favorites[id] || false;
    },
    flipFavorite: (id: string) => {
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
    <div style={{ backgroundColor: "#F4F5F8" }}>
      <FavoritesContext.Provider value={favoritesContext}>
        <PaginationContext.Provider value={paginationContext}>
          <ResumesPage />
        </PaginationContext.Provider>
      </FavoritesContext.Provider>
    </div>
  );
};

export default App;
