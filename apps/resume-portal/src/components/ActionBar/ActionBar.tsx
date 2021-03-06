import { Tooltip } from "antd";
import React, { useContext } from "react";

import { FavoritesContext } from "../../context/FavoritesContext";
import { downloadFile } from "../../utils/files";
import { User } from "../../utils/types";
import { CenteredIcon } from "../CenteredIcon";
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
  const firstName = user.firstName || "Unknown";
  const lastName = user.lastName || "Unknown";
  const EMAIL = user.email;
  const blue_icon_classes = `fill-current text-black focus:text-blue-500 focus:outline-none hover:text-blue-500`;
  const { flipFavorite } = useContext(FavoritesContext);
  const PDF_URL = user.resume.url;

  const onClick = () => {
    flipFavorite(user.id);
  };

  const downloadResume = async () => {
    await downloadFile(PDF_URL, `Resume-${lastName}${firstName}.pdf`);
  };

  return (
    <div
      className={`flex justify-between items-center w-5/12 sm:w-3/12 ${props.padding}`}
    >
      <Tooltip title="Open Fullscreen (New Tab)">
        <a href={PDF_URL} target="noreferrer" className={blue_icon_classes}>
          <CenteredIcon
            name="external-link-outline"
            size="large"
            fill="currentColor"
          />
        </a>
      </Tooltip>
      <Tooltip title="Download Resume">
        <button onClick={downloadResume} className={blue_icon_classes}>
          <CenteredIcon
            name="download-outline"
            size="large"
            fill="currentColor"
          />
        </button>
      </Tooltip>
      <Tooltip title="E-Mail">
        <a href={`mailto:${EMAIL}`} className={blue_icon_classes}>
          <CenteredIcon name="email-outline" size="large" fill="currentColor" />
        </a>
      </Tooltip>
      <Tooltip title="Favorite">
        <FavoriteActionButton userId={user.id} onClick={onClick} />
      </Tooltip>
    </div>
  );
};
