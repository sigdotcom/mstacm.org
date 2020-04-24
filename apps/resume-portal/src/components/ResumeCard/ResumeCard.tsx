// import { Icon, Spin } from "antd";
import { Tooltip } from "antd";
import React, { useState } from "react";
import styled, { AnyStyledComponent } from "styled-components";

import { Modal } from "antd";
import { timeSince, toSemester } from "../../utils/time";
import { User } from "../../utils/types";
import { ActionBar } from "../ActionBar";

interface IResumeCardProps {
  user: User;
}

const ResumeClickArea: AnyStyledComponent = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const ResumeCard: React.FC<IResumeCardProps> = (props) => {
  const user = props.user;
  const firstName = user.firstName || "Unknown";
  const lastName = user.lastName || "Unknown";
  const [resumeFull, setResumeFull] = useState(false);

  const toggleResumePreview = (): void => {
    setResumeFull(resumeFull !== true);
  };

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
        <Tooltip title="Preview Resume" placement="leftTop">
          <ResumeClickArea
            style={{
              position: "absolute",
              width: 615,
              height: 465,
              background: "transparent"
            }}
            onClick={toggleResumePreview}
          />
        </Tooltip>
        <object
          data={PDF_URL}
          type="application/pdf"
          width="100%"
          height="100%"
        >
          <a href={PDF_URL}>Resume URL</a>
        </object>

        <Modal
          visible={resumeFull}
          footer={null}
          onCancel={toggleResumePreview}
          width="60%"
          style={{ top: 20 }}
          bodyStyle={{ height: "95vh", padding: 40 }}
        >
          <object
            data={PDF_URL}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <a href={PDF_URL}>Resume URL</a>
          </object>
        </Modal>
      </div>
      <div className="px-6 py-1 flex">
        <div className="w-2/12 flex flex-col items-center z-50 -my-12">
          <img className="rounded-full" src={PROFILE_URL} />
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
