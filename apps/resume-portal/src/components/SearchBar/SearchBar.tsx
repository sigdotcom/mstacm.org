import { Tooltip } from "antd";
import React, { useState } from "react";
import { CenteredIcon } from "../CenteredIcon";

interface ISearchBarProps {
  onSearch?(e: React.ChangeEvent<HTMLInputElement>): void;
  onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export const SearchBar: React.FC<ISearchBarProps> = props => {
  const [active, setActive] = useState<Boolean>(false);

  const SVG_COLOR_CLASSES = active ? "text-red-500" : "";

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setActive(!active);
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <div className="flex align-center items-center bg-white shadow rounded-full p-4 text-grey-400">
      <CenteredIcon name="search-outline" fill="currentColor" size="large" />
      <input
        className="text-xl w-3/4 pl-4"
        type="text"
        name="search"
        placeholder="Search by Name"
        onChange={props.onSearch}
      />
      <div
        className={`w-1/4 float-right flex justify-end align-center fill-current ${SVG_COLOR_CLASSES}`}
      >
        <Tooltip placement="bottom" title="Filter Favorites">
          <button className="outline-none" onClick={onClick}>
            <CenteredIcon
              name="heart-outline"
              size="large"
              fill="currentColor"
            />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};
