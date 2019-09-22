import React, { useContext, useEffect, useState } from "react";

import { FavoritesButton } from "../../components/FavoritesButton";
import { FavoritesDrawer } from "../../components/FavoritesDrawer";
import { ResumeList } from "../../components/ResumeList";
import { ResumePagination } from "../../components/ResumePagination";
import { SearchBar } from "../../components/SearchBar";

import { config } from "../../config";
import { FavoritesContext } from "../../context/FavoritesContext";
import { useAuth0 } from "../../utils/react-auth0-wrapper";

const ResumesPage: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const { filterFavorites, setFilterFavorites } = useContext(FavoritesContext);

  const {
    loading,
    isAuthenticated,
    loginWithRedirect,
    getTokenSilently
  } = useAuth0();
  const path = "/";

  useEffect(() => {
    if (loading || !isAuthenticated) {
      return;
    }

    const setToken: () => void = async (): Promise<void> => {
      const token: string = (await getTokenSilently()) || "";
      localStorage.setItem(config.ACCESS_TOKEN_KEY, token);
    };

    setToken();
  }, [loading, isAuthenticated, getTokenSilently]);

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }

    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: path }
      });
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect, path]);

  const openDrawer = (): void => {
    setVisible(true);
  };

  const closeDrawer = (): void => {
    setVisible(false);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const onFilterFavorites = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setFilterFavorites(!filterFavorites);
  };

  const openDrawerOnClick = (e: any) => {
    openDrawer();
  };

  return (
    <div style={{ height: "100%" }}>
      <div className="flex content-center justify-center md:justify-between lg:justify-center items-center pt-4 px-4">
        <div className="text-5xl md:w-1/4 flex justify-end md:ml-8 lg:ml-0">
          S&T <strong>ACM</strong>
        </div>
        <div className="w-2/4 mx-16 hidden lg:block">
          <SearchBar onSearch={onSearch} onClick={onFilterFavorites} />
        </div>
        <div className="w-1/4 mr-8 lg:mr-0 hidden md:block">
          <FavoritesButton onClick={openDrawerOnClick} />
        </div>
      </div>
      <ResumePagination />
      <ResumeList filterString={search} />
      <ResumePagination />
      <FavoritesDrawer visible={visible} closeDrawer={closeDrawer} />
    </div>
  );
};

export { ResumesPage };
