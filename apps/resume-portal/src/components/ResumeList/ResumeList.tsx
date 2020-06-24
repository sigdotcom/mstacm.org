import React, { useGlobal } from "reactn";

import { useWindowSize } from "react-use";

import { Community } from "../../utils/types";

import { FavoritesCard } from "../FavoritesCard";
import { ResumeCard } from "../ResumeCard";

interface ResumeListProps {
  filterString?: string;
}

const ResumeList: React.FC<ResumeListProps> = (props: ResumeListProps) => {
  const { width } = useWindowSize();
  const filterString = props.filterString || "";

  const [communityFilters] = useGlobal("communityFilters");
  const [curPage] = useGlobal("curPage");
  const [displayPerPage] = useGlobal("displayPerPage");
  const [filterFavorites] = useGlobal("filterFavorites");
  const [isFavorite] = useGlobal("isFavorite");
  const [users] = useGlobal("users");

  const resumes = [];

  for (const user of users) {
    const lowerFirstName = (user.firstName || "Unknown").toLowerCase();
    const lowerLastName = (user.lastName || "Unknown").toLowerCase();
    const lowerFullName = `${lowerFirstName} ${lowerLastName}`;
    const filterStrMatch = lowerFullName.includes(filterString.toLowerCase());
    const filterCommunityMatch =
      user.sigs &&
      user.sigs?.filter(
        (community: Community) => communityFilters[community.name] === true
      ).length > 0;
    if (user.resume && filterStrMatch && filterCommunityMatch) {
      if (!filterFavorites || (filterFavorites && isFavorite(user.id))) {
        resumes.push(user);
      }
    }
  }

  const startingPage = (curPage - 1) * displayPerPage;
  const filteredResumes = resumes.slice(
    startingPage,
    startingPage + displayPerPage
  );

  if (width > 698) {
    return (
      <div className="flex flex-wrap justify-center">
        {filteredResumes.map(item => {
          return <ResumeCard user={item} key={item.id} />;
        })}
      </div>
    );
  }
  return (
    <div className="flex flex-col p-2">
      {filteredResumes.map(item => {
        return <FavoritesCard user={item} key={item.id} />;
      })}
    </div>
  );
};

export { ResumeList };
