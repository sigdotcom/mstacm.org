import React, { useContext } from "react";
import ReactSVG from "react-svg";

import { FavoritesContext } from "../../context/FavoritesContext";

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
      <ReactSVG src="./static/heart.svg" />
    </button>
  );
};
