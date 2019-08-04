import React, { useContext } from "react";
import gql from "graphql-tag";
import { useResumeCardsQuery } from "../../generated/graphql";
import { ResumeCard } from "../ResumeCard";
import pdfjs from "pdfjs-dist";

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
  const { error, loading, data } = useResumeCardsQuery();
  const filterString = props.filterString || "";
  const { favorites } = useContext(FavoritesContext);
  // const filterFavorites = props.filterFavorites || false;

  const resumes = [];
  console.log("loading", loading);
  console.log("error", error);

  if (data && data.users) {
    for (let user of data.users) {
      const lowerFirstName = user.firstName.toLowerCase();
      const lowerLastName = user.lastName.toLowerCase();
      const lowerFullName = lowerFirstName + " " + lowerLastName;
      const filterStrMatch = lowerFullName.includes(filterString.toLowerCase());
      if (user.resume && filterStrMatch) {
        if (
          !props.filterFavorites ||
          (props.filterFavorites && (favorites[user.id] || false))
        ) {
          resumes.push(user);
        }
      }
    }
  }

  return (
    <div className="flex flex-wrap justify-center">
      {resumes.map(item => {
        return <ResumeCard user={item} />;
      })}
    </div>
  );
};

export { ResumeList };
