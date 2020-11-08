import React, { useState, useEffect } from "react";
import styled, { AnyStyledComponent } from "styled-components";
import Icon from "react-eva-icons";

import { useAuth0 } from "../../utils/react-auth0-wrapper";

import { ProfileOptions } from "./Nav/profileOptions";
import { Events } from "./events";
import { Group } from "../../generated/graphql";


const HeaderWrapper: AnyStyledComponent = styled.div`
  background: #F4F5F8;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
  width: 100%;
`;

const Header: AnyStyledComponent = styled.div`
  width: 86%;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: 2rem 0 3rem;

  @media all and (min-width: 600px) {
    padding: 2rem 0;
  }

  @media all and (min-width: 960px) {
    max-width: 80rem;
  }
`;

const ProfileInfo: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media all and (min-width: 600px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const PictureWrapper: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
`;

const ProfilePicture: AnyStyledComponent = styled.img`
  min-width: 124px;
  max-width: 124px;
  min-height: 124px;
  max-height: 124px;
  border-radius: 50%;

  @media all and (min-width: 600px) {
    min-width: 200px;
    max-width: 200px;
    min-height: 200px;
    max-height: 200px;
  }

  @media all and (min-width: 1280px) {
    min-width: 256px;
    max-width: 256px;
    min-height: 256px;
    max-height: 256px;
  }
`;

const EditProfileShortcut: AnyStyledComponent = styled.a`
  display: none;
  align-items: center;
  justify-content: center;

  @media all and (min-width: 600px) {
    display: flex;
  }
`;

const EditProfileText: AnyStyledComponent = styled.div`
  color: #777777;
  font-size: .875rem;
  font-weight: 800;
  margin-right: .4rem;
`;

const UserInfo: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;

  @media all and (min-width: 600px) {
    margin-left: 1.1rem;
  }
`;

const Username: AnyStyledComponent = styled.div`
  display: flex;
  margin-top: .4rem;
  justify-content: center;

  div {
    color: #376B83;
    font-weight: 900;
  }
  
  @media all and (min-width: 600px) {
    flex-direction: column;

    div {
      color: black;
    }
  }
`;

const UserFirstName: AnyStyledComponent = styled.div`
  margin-right: .4rem;
  font-size: 1.4rem;
  
  @media all and (min-width: 600px) {
    margin-right: 0;
    padding-left: .2rem;
    font-size: 1.5rem;
  }
  
  @media all and (min-width: 1280px) {
    font-size: 2rem;
  }
`;

const UserLastName: AnyStyledComponent = styled.div`
  font-size: 1.4rem;
    
  @media all and (min-width: 600px) {
    line-height: 40px;
    font-size: 3rem;
  }
  
  @media all and (min-width: 1280px) {
    font-size: 4rem;
    line-height: 50px;
  }
`;

const UserEmail: AnyStyledComponent = styled.div`
  display: none;
  color: #777777;
  font-size: 1.125rem;
  margin-bottom: .7rem;
  padding-left: .3rem;

  @media all and (min-width: 600px) {
    display: block;
  }
    
  @media all and (min-width: 1280px) {
    margin-bottom: 1.4rem;
  }
`;

const Groups: AnyStyledComponent = styled.div`
  display: flex;
  margin: .5rem 0 .8rem;

  div {
    border-radius: 12px;
    padding: .1rem 1rem;
    margin-right: .56rem;
    font-size: .75rem;
    font-weight: 700;
    color: black;
    white-space: nowrap;
  }

  div:last-child {
    margin-right: 0;
  }

  @media all and (min-width: 1280px) {
    div {
      margin-right: 1.5rem;
      font-size: 1.25rem;
    }
  }
`;

const WhiteSpace: AnyStyledComponent = styled.div`
  width: 100%;
  display: none;

  @media all and (min-width: 960px) {
    display: block;
  }
`;

const ShortcutGroup: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: auto;
`;

const NotificationShortcut: AnyStyledComponent = styled.a`
  position: absolute;
  top: 16px;
  right: 16px;

  @media all and (min-width: 960px) {
    position: initial;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0.625rem;
    margin-right: .75rem;
  }
`;

interface ProfileHeaderProps {
  meGroups: Group[];
  numEvents: number;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = (
  props: ProfileHeaderProps
): JSX.Element => {
  const { user } = useAuth0();
  const [groupComponents, setGroupComponents]: any = useState<any>(undefined);

  useEffect(() => {
    setGroupComponents(props.meGroups.map((group: Group) =>
      <div
        style={{ background: "#C0F6BF" }}
        key={group.name}
      >{group.name}</div>
    ));
  }, [props]);

  return (
    <HeaderWrapper>
      <Header>
        <ProfileInfo>
          <PictureWrapper>
            <ProfilePicture src={user.picture} alt="ProfilePicture" />
            <EditProfileShortcut href="#">
              <EditProfileText>Edit profile</EditProfileText>
              <Icon
                name="edit"
                size="medium"
                fill="#777777"
              />
            </EditProfileShortcut>
          </PictureWrapper>
          <UserInfo>
            <Username>
              <UserFirstName>{user.given_name}</UserFirstName>
              <UserLastName>{user.family_name}</UserLastName>
            </Username>
            <UserEmail>{user.email}</UserEmail>
            <Groups>{groupComponents}</Groups>
          </UserInfo>
        </ProfileInfo>
        <WhiteSpace style={{ width: "100%" }}></WhiteSpace>
        <ShortcutGroup>
          <NotificationShortcut href="#">
            <Icon
              name="bell"
              size="medium"
              fill={
                window.innerWidth < 960 ? "#087ABB" : "#333333"
              }
            />
          </NotificationShortcut>
          <ProfileOptions />
        </ShortcutGroup>
      </Header>
      <Events numEvents={props.numEvents} />
    </HeaderWrapper>
  );
};
