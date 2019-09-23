import gql from "graphql-tag";
import React, { useContext } from "react";
import { useWindowSize } from "react-use";

import { FavoritesContext } from "../../context/FavoritesContext";
import { PaginationContext } from "../../context/PaginationContext";
import { FavoritesCard } from "../FavoritesCard";
import { ResumeCard } from "../ResumeCard";

export const GET_RESUME_CARDS = gql`
  query ResumeCards {
    resumes {
      url
      added
      user {
        id
        firstName
        lastName
        email
        profilePictureUrl
        graduationDate
      }
    }
  }
`;

interface IResumeListProps {
  filterString?: string;
}

const ResumeList: React.FC<IResumeListProps> = props => {
  const { width } = useWindowSize();
  const filterString = props.filterString || "";
  const { users, isFavorite, filterFavorites } = useContext(FavoritesContext);
  const { curPage, displayPerPage } = useContext(PaginationContext);

  const resumes = [];

  for (const user of users) {
    const lowerFirstName = (user.firstName || "Unknown").toLowerCase();
    const lowerLastName = (user.lastName || "Unknown").toLowerCase();
    const lowerFullName = `${lowerFirstName} ${lowerLastName}`;
    const filterStrMatch = lowerFullName.includes(filterString.toLowerCase());
    if (user.resume && filterStrMatch) {
      if (!filterFavorites || (filterFavorites && isFavorite(user.id))) {
        resumes.push(user);
      }
    }
  }

  const startingPage = (curPage - 1) * displayPerPage;
  const filtered_resumes = resumes.slice(
    startingPage,
    startingPage + displayPerPage
  );

  if (width > 698) {
    return (
      <div className="flex flex-wrap justify-center">
        {filtered_resumes.map(item => {
          return <ResumeCard user={item} key={item.id} />;
        })}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col p-2">
        {filtered_resumes.map(item => {
          return <FavoritesCard user={item} key={item.id} />;
        })}
      </div>
    );
  }
};

export { ResumeList };
