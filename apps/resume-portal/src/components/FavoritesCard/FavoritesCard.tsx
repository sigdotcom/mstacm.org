import React from "react";

import ReactSVG from "react-svg";
import { Tooltip } from "antd";

export const FavoritesCard: React.FC = () => {
  const PROFILE_URL = "./static/Guillermo.jpeg";
  const FULL_NAME = "Kevin Schoonover";
  const GRADUATION_DATE = "Dec '19";

  return (
    <div className="flex justify-between items-center rounded-full bg-gray-100 text-black m-4">
      <div className="flex items-center">
        <img
          width="96"
          height="96"
          className="rounded-full"
          src={PROFILE_URL}
          alt="Avatar"
        />
        <div className="flex flex-col text-2xl pl-6">
          <span>{FULL_NAME}</span>
          <span className="font-bold">{GRADUATION_DATE}</span>
        </div>
      </div>
      <div className="flex justify-between items-center w-3/12 pr-4">
        <Tooltip title="Download Resume">
          <a href="https://google.com">
            <ReactSVG src="./static/download.svg" />
          </a>
        </Tooltip>
        <Tooltip title="E-Mail">
          <a href="https://google.com">
            <ReactSVG src="./static/email.svg" />
          </a>
        </Tooltip>
        <Tooltip title="Favorite">
          <button
            className={`fill-current hover:text-red-500 focus:outline-none`}
          >
            <ReactSVG src="./static/heart.svg" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};
