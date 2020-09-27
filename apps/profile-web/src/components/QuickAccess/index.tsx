import React from "react";

import styled, { AnyStyledComponent } from "styled-components";

const QAWrapper: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
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

const ItemWrapper: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;
`;

const QAItem: AnyStyledComponent = styled.a`
  padding-bottom: 10px;
  padding-left: 20px; 
  color: #FFFFFF;
  font-weight: 600;
  font-size: 1.0625rem;
  max-width: fit-content;
`;

export const QuickAccess: React.FC<{}> = () => {
  return (
    <QAWrapper>
      <QAHeader>Quick Access</QAHeader>
      <ItemWrapper>
        <QAItem href = "https://google.com">
          Edit Profile
          <svg transform="translate(9.25)" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.25 12.25H1.75V1.75H7V0.25H1.75C0.9175 0.25 0.25 0.925 0.25 1.75V12.25C0.25 13.075 0.9175 13.75 1.75 13.75H12.25C13.075 13.75 13.75 13.075 13.75 12.25V7H12.25V12.25ZM8.5 0.25V1.75H11.1925L3.82 9.1225L4.8775 10.18L12.25 2.8075V5.5H13.75V0.25H8.5Z" fill="white"/>
          </svg>
        </QAItem>
        <QAItem href = "https://google.com">
          Notification Settings
          <svg transform="translate(9.25)" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.25 12.25H1.75V1.75H7V0.25H1.75C0.9175 0.25 0.25 0.925 0.25 1.75V12.25C0.25 13.075 0.9175 13.75 1.75 13.75H12.25C13.075 13.75 13.75 13.075 13.75 12.25V7H12.25V12.25ZM8.5 0.25V1.75H11.1925L3.82 9.1225L4.8775 10.18L12.25 2.8075V5.5H13.75V0.25H8.5Z" fill="white"/>
          </svg>
        </QAItem>
        <QAItem href = "https://google.com">
          Link Discord
          <svg transform="translate(9.25)" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.25 12.25H1.75V1.75H7V0.25H1.75C0.9175 0.25 0.25 0.925 0.25 1.75V12.25C0.25 13.075 0.9175 13.75 1.75 13.75H12.25C13.075 13.75 13.75 13.075 13.75 12.25V7H12.25V12.25ZM8.5 0.25V1.75H11.1925L3.82 9.1225L4.8775 10.18L12.25 2.8075V5.5H13.75V0.25H8.5Z" fill="white"/>
          </svg>
        </QAItem>
      </ItemWrapper>
    </QAWrapper>
  );
};
