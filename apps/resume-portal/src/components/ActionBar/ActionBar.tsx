import { Tooltip } from "antd";
import React, { useContext } from "react";
import ReactSVG from "react-svg";

import { FavoritesContext } from "../../context/FavoritesContext";
import { downloadFile } from "../../utils/files";
import { User } from "../../utils/types";
import { FavoriteActionButton } from "./FavoriteActionButton";

export interface IActionBarProps {
  user: User;
  padding?: string;
}

export const ActionBar: React.FC<IActionBarProps> = props => {
  const user = props.user;

  if (!user.resume) {
    throw Error("User does not have resume");
  }
  const EMAIL = user.email;
  const blue_icon_classes = `fill-current text-black focus:text-blue-500 focus:outline-none`;
  const { flipFavorite } = useContext(FavoritesContext);
  const PDF_URL = user.resume.url;

  const onClick = () => {
    flipFavorite(user.id);
  };

  const downloadResume = async () => {
    await downloadFile(PDF_URL, `Resume-${user.lastName}${user.firstName}.pdf`);
  };

  return (
    <div
      className={`flex justify-between items-center w-3/12 ${props.padding}`}
    >
      <Tooltip title="Download Resume">
        <button onClick={downloadResume} className={blue_icon_classes}>
          <ReactSVG src="./static/download.svg" />
        </button>
      </Tooltip>
      <Tooltip title="E-Mail">
        <a href={`mailto:${EMAIL}`} className={blue_icon_classes}>
          <ReactSVG src="./static/email.svg" />
        </a>
      </Tooltip>
      <Tooltip title="Favorite">
        <FavoriteActionButton userId={user.id} onClick={onClick} />
      </Tooltip>
    </div>
  );
};
