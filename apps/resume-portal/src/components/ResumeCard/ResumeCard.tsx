import { Tooltip } from "antd";
import React, { useContext } from "react";
import { Document, Page } from "react-pdf";
import ReactSVG from "react-svg";

import { FavoritesContext } from "../../context/FavoritesContext";
import { timeSince, toSemester } from "../../utils/time";
import { User } from "../../utils/types";

interface IResumeCardProps {
  user: User;
  onFavorite?(): void;
}

const ResumeCard: React.FC<IResumeCardProps> = props => {
  const user = props.user;

  if (!user.resume) {
    throw new Error("Passed invalid added time.");
  }

  const { isFavorite, flipFavorite } = useContext(FavoritesContext);
  const COLOR = isFavorite(user.id) ? "text-red-500" : "text-black";
  const PDF_WIDTH = 612;

  const PDF_URL = user.resume.url;
  const PROFILE_URL = user.profilePictureUrl;

  const FULL_NAME = `${user.firstName} ${user.lastName}`;
  const EMAIL = user.email;

  const GRADUATION_SEMESTER = user.graduationDate
    ? toSemester(new Date(user.graduationDate))
    : "";
  const GRADUATION_STR = GRADUATION_SEMESTER ? `· ${GRADUATION_SEMESTER}` : "";
  const ADDED_DATE = new Date(user.resume.added);
  const MODIFIED_DATE = user.resume ? timeSince(ADDED_DATE) : "NaN";

  const blue_icon_classes = `fill-current text-black focus:text-blue-500 focus:outline-none`;

  const onSuccess = (pdf: any) => {
    console.log(pdf.numPages);
  };

  const onClick = () => {
    flipFavorite(user.id);
    if (props.onFavorite) {
      props.onFavorite();
    }
  };

  return (
    <div
      style={{ width: PDF_WIDTH }}
      className="rounded overflow-hidden shadow-lg m-6 bg-white"
    >
      <Document onLoadSuccess={onSuccess} file={PDF_URL}>
        <Page pageNumber={1} width={PDF_WIDTH} />
      </Document>
      <div className="px-6 py-1 flex">
        <div className="w-2/12 flex flex-col items-center z-50 -my-12">
          <img
            width="96"
            height="96"
            className="rounded-full"
            src={PROFILE_URL}
            alt="Avatar"
          />
        </div>
        <div className="w-8/12 text-2xl flex justify-center content-center leading-normal">
          <p className="my-4">
            <span className="text-black">
              {`${FULL_NAME}`} <strong>{`${GRADUATION_STR}`}</strong>
            </span>
            <br />
            <span className="text-gray-600">{`Updated ${MODIFIED_DATE} ago`}</span>
          </p>
        </div>
        <div className="flex justify-between items-center w-3/12">
          <Tooltip title="Download Resume">
            <a href={PDF_URL} className={blue_icon_classes}>
              <ReactSVG src="./static/download.svg" />
            </a>
          </Tooltip>
          <Tooltip title="E-Mail">
            <a href={`mailto:${EMAIL}`} className={blue_icon_classes}>
              <ReactSVG src="./static/email.svg" />
            </a>
          </Tooltip>
          <Tooltip title="Favorite">
            <button
              className={`fill-current ${COLOR} hover:text-red-500 focus:outline-none`}
              onClick={onClick}
            >
              <ReactSVG src="./static/heart.svg" />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export { ResumeCard };
