import React, { useContext, useState } from "react";

import { FavoritesButton } from "../../components/FavoritesButton";
import { FavoritesDrawer } from "../../components/FavoritesDrawer";
import { ResumeList } from "../../components/ResumeList";
import { ResumePagination } from "../../components/ResumePagination";
import { SearchBar } from "../../components/SearchBar";

import { FavoritesContext } from "../../context/FavoritesContext";

const ResumesPage: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const { filterFavorites, setFilterFavorites } = useContext(FavoritesContext);

  const openDrawer = (): void => {
    setVisible(true);
  };

  const closeDrawer = (): void => {
    setVisible(false);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const onFilterFavorites = () => {
    setFilterFavorites(!filterFavorites);
  };

  const openDrawerOnClick = () => {
    openDrawer();
  };

  return (
    <div style={{ height: "100%" }}>
      <div className="flex flex-col md:flex-row content-center justify-center md:justify-between lg:justify-center items-center pt-4 px-4">
        <div className="text-5xl md:text-4xl md:w-2/12 lg:w-3/12 lg:text-5xl flex justify-end md:ml-8 lg:ml-0">
          S&T <strong>ACM</strong>
        </div>
        <div className="w-full mx-32 md:w-8/12 md:mx-16 lg:w-6/12">
          <SearchBar onSearch={onSearch} onClick={onFilterFavorites} />
        </div>
        <div className="w-2/12 lg:w-3/12 mr-8 lg:mr-0 hidden md:flex lg:block jcontent-center justify-center items-center">
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
