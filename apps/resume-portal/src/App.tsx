import React, { useState } from "react";
import "./App.css";

import { ResumesPage } from "./screens/ResumesPage";

import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

import {
  FavoritesContext,
  IFavoriteContextProps
} from "./context/FavoritesContext";

const client = new ApolloClient({
  uri: "http://localhost/graphql"
});

const App: React.FC = () => {
  const favorites: { [id: string]: boolean | undefined } = {};
  const [filterFavorites, setFilterFavorites] = useState<boolean>(false);
  const context: IFavoriteContextProps = {
    favorites,
    filterFavorites,
    setFilterFavorites,
    isFavorite: (id: string) => {
      return favorites[id] || false;
    },
    flipFavorite: (id: string) => {
      favorites[id] = !(favorites[id] || false);
    }
  };

  return (
    <div style={{ backgroundColor: "#F4F5F8" }}>
      <FavoritesContext.Provider value={context}>
        <ApolloProvider client={client}>
          <ResumesPage />
        </ApolloProvider>
      </FavoritesContext.Provider>
    </div>
  );
};

export default App;
