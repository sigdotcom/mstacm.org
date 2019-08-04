import React, { useContext, useState } from "react";

import { Drawer } from "antd";
import ReactSVG from "react-svg";

import { FavoritesButton } from "../../components/FavoritesButton";
import { FavoritesCard } from "../../components/FavoritesCard";
import { ResumeList } from "../../components/ResumeList";
import { SearchBar } from "../../components/SearchBar";
import { FavoritesContext } from "../../context/FavoritesContext";

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
      <ResumeList filterString={search} filterFavorites={filterFavorites} />
      <Drawer
        placement="right"
        visible={visible}
        onClose={closeDrawer}
        width={700}
        bodyStyle={{ padding: 0 }}
      >
        <div className="flex items-baseline bg-red-500 pt-8 pb-4 px-6 text-5xl text-white">
          <div>Favorites</div>
          <div className="flex text-lg leading-relaxed fill-current pl-16 text-red-200">
            <button className="flex items-center font-bold px-1">
              DOWNLOAD ALL <ReactSVG src="./static/chevron_right.svg" />
            </button>
            <button className="flex items-center font-bold px-1">
              EMAIL ALL <ReactSVG src="./static/chevron_right.svg" />
            </button>
          </div>
        </div>
        <div className="flex flex-col p-8">
          <FavoritesCard />
          <FavoritesCard />
        </div>
      </Drawer>
    </div>
  );
};

export { ResumesPage };
