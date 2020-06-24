import React, { useGlobal } from "reactn";

import { CenteredIcon } from "../CenteredIcon";

export interface IFavoriteActionButtonProps {
  userId: string;
  onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export const FavoriteActionButton: React.FC<IFavoriteActionButtonProps> = props => {
  const [isFavorite] = useGlobal("isFavorite");

  const { userId, ...buttonProps } = props;

  const COLOR = isFavorite(userId) ? "text-red-500" : "text-black";

  return (
    <button
      {...buttonProps}
      className={`fill-current ${COLOR} hover:text-red-500 focus:outline-none`}
    >
      <CenteredIcon name="heart-outline" size="large" fill="currentColor" />
    </button>
  );
};
