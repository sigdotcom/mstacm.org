import gql from "graphql-tag";
import React, { useContext } from "react";
import { ResumeCard } from "../ResumeCard";

import { FavoritesContext } from "../../context/FavoritesContext";
import { PaginationContext } from "../../context/PaginationContext";

export const GET_RESUME_CARDS = gql`
  query ResumeCards {
    users {
      id
      firstName
      lastName
      email
      profilePictureUrl
      graduationDate
      resume {
        url
        added
      }
    }
  }
`;

interface IResumeListProps {
  filterString?: string;
}

const ResumeList: React.FC<IResumeListProps> = props => {
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

  return (
    <div className="flex flex-wrap justify-center">
      {filtered_resumes.map(item => {
        return <ResumeCard user={item} key={item.id} />;
      })}
    </div>
  );
};

export { ResumeList };
