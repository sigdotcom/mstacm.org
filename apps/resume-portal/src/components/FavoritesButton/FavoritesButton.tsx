import React from "react";
import ReactSVG from "react-svg";

interface IFavoritesButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const FavoritesButton: React.FC<IFavoritesButtonProps> = props => {
  return (
    <button
      className="inline-flex rounded-full px-4 py-3 text-red-500 text-xl border-solid border-2 border-red-500 hover:text-white hover:bg-red-500"
      onClick={props.onClick}
    >
      <button className="outline-none fill-current">
        <ReactSVG src="./static/heart.svg" />
      </button>
      <div className="mx-6">Favorites</div>
    </button>
  );
};
