import React from "react";

import { toSemester } from "../../utils/time";
import { User } from "../../utils/types";
import { ActionBar } from "../ActionBar";

export interface IFavoritesCardProps {
  user: User;
}

export const FavoritesCard: React.FC<IFavoritesCardProps> = ({
  user
}: IFavoritesCardProps) => {
  const PROFILE_URL: string = user.profilePictureUrl;
  const FULL_NAME = `${user.firstName} ${user.lastName}`;
  const GRADUATION_DATE: string = toSemester(new Date(user.graduationDate));

  return (
    <div className="flex justify-between items-center rounded-full bg-gray-100 text-black m-4">
      <div className="flex items-center">
        <img
          width="96"
          height="96"
          className="rounded-full hidden sm:block"
          src={PROFILE_URL}
          alt="Avatar"
        />
        <div className="flex flex-col text-xl sm:text-2xl pl-6">
          <span>{FULL_NAME}</span>
          <span className="font-bold">{GRADUATION_DATE}</span>
        </div>
      </div>
      <ActionBar user={user} padding="pr-4" />
    </div>
  );
};
