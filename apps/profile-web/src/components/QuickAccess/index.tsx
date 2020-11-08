import React from "react";
import Icon from "react-eva-icons";

import styled, { AnyStyledComponent } from "styled-components";

const QAWrapper: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 220px;
  max-width: 280px;
  height: 174px;
  border-radius: 12px;
  background: #113366;
`;

const QAHeader: AnyStyledComponent = styled.div`
  padding-top: 13px;
  padding-left: 20px;
  padding-bottom: 25px;
  font-weight: 800;
  font-size: 1.25rem;
  color: #FFFFFF;
  width: 100%;
`;

const QAItem: AnyStyledComponent = styled.a`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  padding-left: 20px; 
  color: #FFFFFF;
  font-weight: 600;
  font-size: 1.0625rem;
  max-width: fit-content;
`;

const IconWrapper: AnyStyledComponent = styled.span`
  transform: translateY(10%);
  padding-left: 9.25px;
`;

export const QuickAccess: React.FC<{}> = () => {
  return (
    <QAWrapper>
      <QAHeader>Quick Access</QAHeader>
      <QAItem href="#">
        Edit Profile
        <IconWrapper>
          <Icon
            name="external-link-outline"
            size="medium"
            fill="white"
          />
        </IconWrapper>
      </QAItem>
      <QAItem href="#">
        Notification Settings
        <IconWrapper>
          <Icon
            name="external-link-outline"
            size="medium"
            fill="white"
          />
        </IconWrapper>
      </QAItem>
      <QAItem href="#">
        Link Discord
        <IconWrapper>
          <Icon
            name="external-link-outline"
            size="medium"
            fill="white"
          />
        </IconWrapper>
      </QAItem>
    </QAWrapper>
  );
};
