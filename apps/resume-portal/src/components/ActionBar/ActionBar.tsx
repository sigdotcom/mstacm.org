import { Tooltip } from "antd";
import React, { useGlobal } from "reactn";

import { downloadFile } from "../../utils/files";
import { User } from "../../utils/types";
import { CenteredIcon } from "../CenteredIcon";
import { FavoriteActionButton } from "./FavoriteActionButton";

export interface ActionBarProps {
  user: User;
  padding?: string;
}

export const ActionBar: React.FC<ActionBarProps> = (
  props: ActionBarProps
): JSX.Element => {
  const { user } = props;

  if (!user.resume) {
    throw Error("User does not have resume");
  }
  const firstName = user.firstName || "Unknown";
  const lastName = user.lastName || "Unknown";
  const EMAIL = user.email;
  const blueIconClasses = `fill-current text-black focus:text-blue-500 focus:outline-none hover:text-blue-500`;
  const [flipFavorite] = useGlobal("flipFavorite");
  const PDF_URL = user.resume.url;

  const onClick = (): void => {
    flipFavorite(user.id);
  };

  const downloadResume = async (): Promise<void> => {
    await downloadFile(PDF_URL, `Resume-${lastName}${firstName}.pdf`);
  };

  return (
    <div
      className={`flex justify-between items-center w-5/12 sm:w-3/12 ${props.padding}`}
    >
      <Tooltip title="Open Fullscreen (New Tab)">
        <a href={PDF_URL} target="noreferrer" className={blueIconClasses}>
          <CenteredIcon
            name="external-link-outline"
            size="large"
            fill="currentColor"
          />
        </a>
      </Tooltip>
      <Tooltip title="Download Resume">
        <button onClick={downloadResume} className={blueIconClasses}>
          <CenteredIcon
            name="download-outline"
            size="large"
            fill="currentColor"
          />
        </button>
      </Tooltip>
      <Tooltip title="E-Mail">
        <a href={`mailto:${EMAIL}`} className={blueIconClasses}>
          <CenteredIcon name="email-outline" size="large" fill="currentColor" />
        </a>
      </Tooltip>
      <Tooltip title="Favorite">
        <FavoriteActionButton userId={user.id} onClick={onClick} />
      </Tooltip>
    </div>
  );
};
