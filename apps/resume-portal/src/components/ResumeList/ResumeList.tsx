import gql from "graphql-tag";
import pdfjs from "pdfjs-dist";
import React, { useContext } from "react";
import { ResumeCard } from "../ResumeCard";

import { FavoritesContext } from "../../context/FavoritesContext";

((pdfjs as any)
  .GlobalWorkerOptions as any).workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  (pdfjs as any).version
}/pdf.worker.js`;

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
  filterFavorites?: boolean;
}

const ResumeList: React.FC<IResumeListProps> = props => {
  const filterString = props.filterString || "";
  const { users, isFavorite } = useContext(FavoritesContext);
  // const filterFavorites = props.filterFavorites || false;

  const resumes = [];

  for (const user of users) {
    const lowerFirstName = user.firstName.toLowerCase();
    const lowerLastName = user.lastName.toLowerCase();
    const lowerFullName = `${lowerFirstName} ${lowerLastName}`;
    const filterStrMatch = lowerFullName.includes(filterString.toLowerCase());
    if (user.resume && filterStrMatch) {
      if (
        !props.filterFavorites ||
        (props.filterFavorites && isFavorite(user.id))
      ) {
        resumes.push(user);
      }
    }
  }

  return (
    <div className="flex flex-wrap justify-center">
      {resumes.map(item => {
        return <ResumeCard user={item} key={item.id} />;
      })}
    </div>
  );
};

export { ResumeList };
