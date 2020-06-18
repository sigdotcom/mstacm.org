import "./App.css";

import React, { useEffect, useState, setGlobal } from "reactn";

import { useLocalStorage } from "react-use";
import gql from "graphql-tag"

import { config } from "./config";
import { useAuth0 } from "./utils/react-auth0-wrapper";
import { Community } from "./utils/types";

import { ResumesPage } from "./screens/ResumesPage";
import { Loader } from "./components/Loader";

import { useGetUsersLazyQuery, useGetCommunitiesLazyQuery } from "./generated/graphql";

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

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      firstName
      lastName
      sigs {
        name
      }
      email
      profilePictureUrl
      graduationDate
      resume {
        url
        added
      }
    }
  }
`;


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
  const [forbidden, setForbidden] = useState<boolean>(false);
  const [tokenStored, setTokenStored] = useState<boolean>(false);

  const [favorites, setFavorites]: [Favorites, any] = useLocalStorage(
    "favorites",
    {}
  );

  const [getUsers, { data: usersData, error: usersError }] = useGetUsersLazyQuery();
  const [getCommunities, { data: communitiesData }] = useGetCommunitiesLazyQuery();

  const {
    loading: loginLoading,
    isAuthenticated,
    loginWithRedirect,
    getTokenSilently,
  } = useAuth0();

  // Once community data has been retrieved, populates communityFilters
  useEffect(() => {
    if (communitiesData) {
      setGlobal({
        communityFilters: communitiesData.sigs.reduce((dict: any, x: Community) => {
          dict[x.name] = true;
          return dict;
        }, {})
      });
    }
  }, [communitiesData]);


  // Handles filling of userdata if authorized
  useEffect(() => {
    if (loginLoading) {
      return;
    } else if (isAuthenticated) {
      const setToken: () => void = async (): Promise<void> => {
        const token: string = (await getTokenSilently()) || "";
        localStorage.setItem(config.ACCESS_TOKEN_KEY, token);
        setTokenStored(true);
      };
      setToken();
    } else {
      const fn = async () => {
        await loginWithRedirect({});
      };
      fn();
      return;
    }
  }, [loginLoading, isAuthenticated, loginWithRedirect]);

  useEffect(()=>{
    if (tokenStored) {
      getUsers();
      getCommunities();
    }
  }, [tokenStored])

  useEffect(()=>{
    if (localStorage.getItem(config.ACCESS_TOKEN_KEY)) {
      if (usersError && !forbidden) {
        setForbidden(usersError.graphQLErrors[0].message.includes("Access denied!"));
      } else if (usersData) {
        setGlobal({
          users: usersData.users
        });
      }
    }
  }, [
    usersError,
    usersData,
    forbidden
  ]);

  setGlobal({
    isFavorite: (id: string): boolean => {
      return favorites[id] || false;
    },
    flipFavorite: (id: string): void => {
      setFavorites({
        ...favorites,
        [id]: !(favorites[id] || false),
      });
    }
  })

  // No more hooks left!

  if (loginLoading || !usersData || !isAuthenticated) {
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
      {forbidden ? <Forbidden /> : <ResumesPage />}
    </div>
  );
};

export { App };
