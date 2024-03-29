// import { Icon, Spin } from "antd";
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
  transition: 0.3s;
  color: rgba(0, 0, 0, 0);
  text-align: center;
  padding-top: 263px; // 275px - 12px (height/2 - font size/2)
`;

const Container: AnyStyledComponent = styled.div`
  &:hover ${ResumeClickArea} {
    background-color: rgba(0,0,0,0.2);
    color: black;
    cursor: pointer;
  }
`;

const ResumeCard: React.FC<IResumeCardProps> = (props) => {
  const user = props.user;
  const firstName = user.firstName || "Unknown";
  const lastName = user.lastName || "Unknown";
  const [resumeFull, setResumeFull] = useState(false);

  const toggleResumePreview = (): void => {
    setResumeFull(!resumeFull);
  };

  if (!user.resume) {
    throw new Error("Passed invalid added time.");
  }

  const PDF_WIDTH = 645;
  const PDF_HEIGHT = 550;

  const PDF_URL = user.resume.url;
  const PDF_URL_DISABLED =
    user.resume.url + "#toolbar=0&navpanes=0&scrollbar=0&statusbar=0&nozoom=1";
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
      style={{ width: PDF_WIDTH, zIndex: 0 }}
      className="rounded overflow-hidden shadow-lg m-6 bg-white text-2xl"
    >
      <Container
        className="flex items-center content-center justify-center"
        style={{ width: PDF_WIDTH, height: PDF_HEIGHT }}
      >
        <ResumeClickArea
          style={{
            position: "absolute",
            width: PDF_WIDTH,
            height: PDF_HEIGHT,
            backgroundColor: ""
          }}
          onClick={toggleResumePreview}
        >
          Click to Expand
        </ResumeClickArea>
        <div
          style={{
            width: PDF_WIDTH,
            height: 14000,
            marginTop: 13450,
            zIndex: -1
          }}
        >
          <object
            data={PDF_URL_DISABLED}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <a href={PDF_URL}>Resume URL</a>
          </object>
        </div>
        <Modal
          visible={resumeFull}
          footer={null}
          onCancel={toggleResumePreview}
          width="90%"
          style={{ top: "5vh", padding: 0 }}
          bodyStyle={{ height: "90vh", padding: 40 }}
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
      </Container>
      <div className="px-6 py-1 flex" style={{ backgroundColor: "white" }}>
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
