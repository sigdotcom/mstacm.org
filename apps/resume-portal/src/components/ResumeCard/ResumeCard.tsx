import React from "react";
import { Document, Page } from "react-pdf";

import { timeSince, toSemester } from "../../utils/time";
import { User } from "../../utils/types";
import { ActionBar } from "../ActionBar";

interface IResumeCardProps {
  user: User;
}

const ResumeCard: React.FC<IResumeCardProps> = props => {
  const user = props.user;

  if (!user.resume) {
    throw new Error("Passed invalid added time.");
  }

  const PDF_WIDTH = 612;

  const PDF_URL = user.resume.url;
  const PROFILE_URL = user.profilePictureUrl;

  const FULL_NAME = `${user.firstName} ${user.lastName}`;

  const GRADUATION_SEMESTER = user.graduationDate
    ? toSemester(new Date(user.graduationDate))
    : "";
  const GRADUATION_STR = GRADUATION_SEMESTER ? `· ${GRADUATION_SEMESTER}` : "";
  const ADDED_DATE = new Date(user.resume.added);
  const MODIFIED_DATE = user.resume ? timeSince(ADDED_DATE) : "NaN";

  const onSuccess = (pdf: any) => {
    console.log(pdf.numPages);
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
        <ActionBar user={user} />
      </div>
    </div>
  );
};

export { ResumeCard };
