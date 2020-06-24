// import { Icon, Spin } from "antd";
import React from "react";

import { timeSince, toSemester } from "../../utils/time";
import { User } from "../../utils/types";
import { ActionBar } from "../ActionBar";

interface ResumeCardProps {
  user: User;
}

const ResumeCard: React.FC<ResumeCardProps> = (
  props: ResumeCardProps
): JSX.Element => {
  const { user } = props;
  const firstName = user.firstName || "Unknown";
  const lastName = user.lastName || "Unknown";

  if (!user.resume) {
    throw new Error("Passed invalid added time.");
  }

  const PDF_WIDTH = 645;
  const PDF_HEIGHT = 550;

  const PDF_URL = user.resume.url;
  const PROFILE_URL = user.profilePictureUrl;

  const FULL_NAME = `${firstName} ${lastName}`;

  const GRADUATION_SEMESTER = user.graduationDate
    ? toSemester(new Date(user.graduationDate))
    : "";
  const GRADUATION_STR = GRADUATION_SEMESTER ? `· ${GRADUATION_SEMESTER}` : "";
  const ADDED_DATE = new Date(user.resume.added);
  const MODIFIED_DATE = user.resume ? timeSince(ADDED_DATE) : "NaN";

  // const antIcon = <Icon type="loading" spin={true} />;

  return (
    <div
      style={{ width: PDF_WIDTH }}
      className="rounded overflow-hidden shadow-lg m-6 bg-white text-2xl"
    >
      <div
        className="flex items-center content-center justify-center"
        style={{ width: PDF_WIDTH, height: PDF_HEIGHT }}
      >
        <object
          data={PDF_URL}
          type="application/pdf"
          width="100%"
          height="100%"
        >
          <a href={PDF_URL}>Resume URL</a>
        </object>
      </div>
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
        <div className="w-8/12 text-xl flex justify-center content-center leading-normal">
          <p style={{ textAlign: "center" }} className="my-2">
            <span className="text-black">
              {`${FULL_NAME}`} <strong>{`${GRADUATION_STR}`}</strong>
            </span>
            <br />
            <span className="text-gray-600 text-base">{`Updated ${MODIFIED_DATE} ago`}</span>
          </p>
        </div>
        <ActionBar user={user} />
      </div>
    </div>
  );
};

export { ResumeCard };
