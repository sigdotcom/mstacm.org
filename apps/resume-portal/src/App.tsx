import "./App.css";

import React, { useState } from "react";

import { useResumeCardsQuery } from "./generated/graphql";
import { ResumesPage } from "./screens/ResumesPage";
import { User } from "./utils/types";

import {
  FavoritesContext,
  IFavoriteContextProps
} from "./context/FavoritesContext";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filterFavorites, setFilterFavorites] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<{
    [id: string]: boolean | undefined;
  }>({});

  const { data, loading } = useResumeCardsQuery();
  if (loading === false && users.length === 0 && data) {
    setUsers(data.users);
  }
  const context: IFavoriteContextProps = {
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

  return (
    <div style={{ backgroundColor: "#F4F5F8" }}>
      <FavoritesContext.Provider value={context}>
        <ResumesPage />
      </FavoritesContext.Provider>
    </div>
  );
};

export default App;
