import "./App.css";

import React, { useEffect, useState, setGlobal } from "reactn";
import { useLocalStorage } from "react-use";

import { Loader } from "./components/Loader";
import { config } from "./config";
import { useResumeCardsQuery } from "./generated/graphql";
import { ResumesPage } from "./screens/ResumesPage";
import { useAuth0 } from "./utils/react-auth0-wrapper";
import { User, Community } from "./utils/types";
import gql from "graphql-tag"

import { useGetCommunitiesQuery } from "./generated/graphql"

import {
  FavoritesContext,
  IFavoriteContextProps,
} from "./context/FavoritesContext";

import {
  IPaginationContextProps,
  PaginationContext,
} from "./context/PaginationContext";

type Favorites = {
  [id: string]: boolean | undefined;
};

export const GET_COMMUNITIES = gql`
  query GetCommunities {
    sigs {
      name
    }
  }
`

const Forbidden: React.FC = () => {
  return (
    <div className="h-screen w-full flex content-center justify-center items-center flex-col">
      <h1 className="text-5xl">403 Forbidden</h1>
      <p style={{ textAlign: "center" }} className="text-xl">
        It appears your permissions prevent me from letting you pass.
        <br />
        Please contact <a href="mailto:acm@mst.edu">acm@mst.edu</a> if you
        believe this is a mistake.
      </p>
    </div>
  );
};

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>(["Web", "Game"]);
  const [filterFavorites, setFilterFavorites] = useState<boolean>(false);
  const [curPage, setCurPage] = useState<number>(1);
  const [displayPerPage, setDisplayPerPage] = useState<number>(10);
  const [forbidden, setForbidden] = useState<boolean>(false);
  const [fetched, setFetched] = useState<boolean>(false);
  const [favorites, setFavorites]: [Favorites, any] = useLocalStorage(
    "favorites",
    {}
  );
  const {
    loading,
    isAuthenticated,
    loginWithRedirect,
    getTokenSilently,
  } = useAuth0();
  const path = "/";

  const { data, loading: gqlLoading, error, refetch } = useResumeCardsQuery();
  const { data: cdata } = useGetCommunitiesQuery();


  useEffect(() => {
    if (cdata) {
      setGlobal({
        communityFilters: cdata.sigs.reduce((dict: any, x: Community) => {
    dict[x.name] = false;
    return dict;
}, {})
      });
    }
  }, [cdata])

  useEffect(() => {
    if (loading) {
      return;
    } else if (isAuthenticated) {
      const setToken: () => void = async (): Promise<void> => {
        const token: string = (await getTokenSilently()) || "";
        localStorage.setItem(config.ACCESS_TOKEN_KEY, token);
        await refetch();
      };

      setToken();
    } else {
      const fn = async () => {
        await loginWithRedirect({
          appState: { targetUrl: path },
        });
      };
      fn();
    }

    if (localStorage.getItem(config.ACCESS_TOKEN_KEY)) {
      if (gqlLoading) {
        return;
      } else if (error && !forbidden) {
        setForbidden(error.graphQLErrors[0].message.includes("Access denied!"));
      } else if (gqlLoading === false && !fetched && data) {
        setFetched(true);
        setUsers(data.users);
      }
    }
  }, [
    loading,
    isAuthenticated,
    loginWithRedirect,
    path,
    getTokenSilently,
    refetch,
    gqlLoading,
    error,
  ]);

  const favoritesContext: IFavoriteContextProps = {
    users,
    selectedCommunities,
    filterFavorites,
    setFilterFavorites,
    isFavorite: (id: string): boolean => {
      return favorites[id] || false;
    },
    flipFavorite: (id: string): void => {
      setFavorites({
        ...favorites,
        [id]: !(favorites[id] || false),
      });
    },
    changeCommunities: (selected: string[]): void => {
      setSelectedCommunities(selected);
    }
  };

  const paginationContext: IPaginationContextProps = {
    curPage,
    displayPerPage,
    setCurPage,
    setDisplayPerPage,
  };

  if (loading || !isAuthenticated) {
    return (
      <div style={{ backgroundColor: "#F4F5F8", minHeight: "100vh" }}>
        <div className="h-screen w-full flex content-center justify-center items-center">
          <Loader />
          <div className="text-2xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#F4F5F8", minHeight: "100vh" }}>
      <FavoritesContext.Provider value={favoritesContext}>
        <PaginationContext.Provider value={paginationContext}>
          {forbidden ? <Forbidden /> : <ResumesPage />}
        </PaginationContext.Provider>
      </FavoritesContext.Provider>
    </div>
  );
};

export { App };
