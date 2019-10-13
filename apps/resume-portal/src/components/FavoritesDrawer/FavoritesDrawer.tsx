import { Drawer } from "antd";
import React, { useContext } from "react";
import { CenteredIcon } from "../CenteredIcon";

import { FavoritesContext } from "../../context/FavoritesContext";
import { downloadFile } from "../../utils/files";
import { FavoritesCard } from "../FavoritesCard";

export interface IFavoritesDrawerProps {
  visible: boolean;
  closeDrawer(): void;
}

export const FavoritesDrawer: React.FC<IFavoritesDrawerProps> = props => {
  const { users, isFavorite } = useContext(FavoritesContext);
  const favorites = users.filter(user => isFavorite(user.id));
  const seperatedFavorites = favorites.map(user => user.email).join(";");
  const mailtoString = `mailto:${seperatedFavorites}`;

  const favoritesCards = favorites.map(item => {
    return <FavoritesCard user={item} key={item.id} />;
  });

  const downloadAll = async () => {
    Promise.all(
      favorites.map(async user => {
        if (!user.resume) {
          throw Error("User's resume not specified");
        }
        downloadFile(
          user.resume.url,
          `Resume-${user.lastName}${user.firstName}.pdf`
        );
      })
    );
  };

  return (
    <Drawer
      placement="right"
      visible={props.visible}
      onClose={props.closeDrawer}
      width={700}
      bodyStyle={{ padding: 0 }}
    >
      <div className="flex items-baseline bg-red-500 pt-8 pb-4 px-6 text-5xl text-white">
        <div>Favorites</div>
        <div className="flex text-lg leading-relaxed fill-current pl-16 text-red-200">
          <button
            className="flex items-center font-bold px-1"
            onClick={downloadAll}
          >
            DOWNLOAD ALL{" "}
            <CenteredIcon
              name="chevron-right-outline"
              size="large"
              fill="currentColor"
            />
          </button>
          <a
            href={mailtoString}
            className="flex items-center font-bold px-1 no-underline text-red-200 hover:text-red-200"
          >
            EMAIL ALL{" "}
            <CenteredIcon
              name="chevron-right-outline"
              size="large"
              fill="currentColor"
            />
          </a>
        </div>
      </div>
      <div className="flex flex-col p-8">{favoritesCards}</div>
    </Drawer>
  );
};
