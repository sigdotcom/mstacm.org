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

  const onFilterFavorites = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setFilterFavorites(!filterFavorites);
  };

  const openDrawerOnClick = (e: any) => {
    openDrawer();
  };

  return (
    <div>
      <div className="flex content-center justify-center items-center pt-4 px-4">
        <div className="text-5xl w-1/4 flex justify-end">
          S&T <strong>ACM</strong>
        </div>
        <div className="w-2/4 mx-16">
          <SearchBar onSearch={onSearch} onClick={onFilterFavorites} />
        </div>
        <div className="w-1/4">
          <FavoritesButton onClick={openDrawerOnClick} />
        </div>
      </div>
      <ResumePagination />
      <ResumeList filterString={search} />
      <FavoritesDrawer visible={visible} closeDrawer={closeDrawer} />
      <ResumePagination />
    </div>
  );
};

export { ResumesPage };
