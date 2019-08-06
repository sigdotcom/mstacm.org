import { Pagination } from "antd";
import React, { useContext, useState } from "react";

import { FavoritesButton } from "../../components/FavoritesButton";
import { FavoritesDrawer } from "../../components/FavoritesDrawer";
import { ResumeList } from "../../components/ResumeList";
import { SearchBar } from "../../components/SearchBar";

import { FavoritesContext } from "../../context/FavoritesContext";

const ResumePagination: React.FC = () => {
  const { users } = useContext(FavoritesContext);

  return (
    <div className="flex content-center justify-center items-center">
      <div className="p-3">
        <Pagination
          showSizeChanger={true}
          defaultCurrent={3}
          total={users.length}
        />
      </div>
    </div>
  );
};

const ResumesPage: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const { filterFavorites, setFilterFavorites } = useContext(FavoritesContext);

  const openDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
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
      <ResumeList filterString={search} filterFavorites={filterFavorites} />
      <FavoritesDrawer visible={visible} closeDrawer={closeDrawer} />
      <ResumePagination />
    </div>
  );
};

export { ResumesPage };
