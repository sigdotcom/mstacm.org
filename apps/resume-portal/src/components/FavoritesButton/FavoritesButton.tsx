import React from "react";

import { CenteredIcon } from "../CenteredIcon";

interface IFavoritesButtonProps {
  onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export const FavoritesButton: React.FC<IFavoritesButtonProps> = props => {
  return (
    <button
      className="inline-flex items-center rounded-full px-4 py-3 text-red-500 text-xl border-solid border-2 border-red-500 hover:text-white hover:bg-red-500"
      onClick={props.onClick}
    >
      <div className="outline-none fill-current">
        <CenteredIcon name="heart-outline" size="large" fill="currentColor" />
      </div>
      <div className="mx-6 hidden lg:block">Favorites</div>
    </button>
  );
};
