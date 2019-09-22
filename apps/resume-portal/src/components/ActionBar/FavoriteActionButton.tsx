import React, { useContext } from "react";

import { FavoritesContext } from "../../context/FavoritesContext";
import { CenteredIcon } from "../CenteredIcon";

export interface IFavoriteActionButtonProps {
  userId: string;
  onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export const FavoriteActionButton: React.FC<
  IFavoriteActionButtonProps
> = props => {
  const { isFavorite } = useContext(FavoritesContext);

  const COLOR = isFavorite(props.userId) ? "text-red-500" : "text-black";

  return (
    <button
      {...props}
      className={`fill-current ${COLOR} hover:text-red-500 focus:outline-none`}
    >
      <CenteredIcon name="heart-outline" size="large" fill="currentColor" />
    </button>
  );
};
