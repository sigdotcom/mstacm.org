import "./App.css";

import React, { useState } from "react";
import { useLocalStorage } from "react-use";

import { config } from "./config";
import { useResumeCardsQuery } from "./generated/graphql";
import { ResumesPage } from "./screens/ResumesPage";
import { Auth0Provider, onRedirectCallback } from "./utils/react-auth0-wrapper";
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

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filterFavorites, setFilterFavorites] = useState<boolean>(false);
  const [curPage, setCurPage] = useState<number>(1);
  const [displayPerPage, setDisplayPerPage] = useState<number>(10);
  const [favorites, setFavorites]: [Favorites, any] = useLocalStorage(
    "favorites",
    {}
  );
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
          <Auth0Provider
            domain={config.AUTH0_DOMAIN}
            client_id={config.AUTH0_CLIENT_ID}
            redirect_uri={window.location.origin}
            audience={config.AUTH0_AUDIENCE}
            onRedirectCallback={onRedirectCallback}
          >
            <ResumesPage />
          </Auth0Provider>
        </PaginationContext.Provider>
      </FavoritesContext.Provider>
    </div>
  );
};

export default App;
