import gql from "graphql-tag";
import React from "react";
import styled, { AnyStyledComponent } from "styled-components";

import { ProfileHeader } from "./profileHeader";
import { Membership } from "./membership";
import { Participation } from "./participation";
import { QuickAccess } from "../QuickAccess";
// import {
//   useMeProfileQuery,
//   MeProfileQueryHookResult
// } from "../../generated/graphql"


export const ME_PROFILE_QUERY: any = gql`
  query MeProfile {
    me {
      dateJoined
      membershipExpiration
      eventsAttended {
        hostSig {
          name
        }
      }
      groups {
        name
      }
    }
  }
`;

const ProfileWrapper: AnyStyledComponent = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  font-family: "Nunito Sans";
`;

export const ProfilePage: React.FC<{}> = () => {
  // const profileQuery: MeProfileQueryHookResult = useMeProfileQuery();
  // const meProfileData = profileQuery.data;
  const meProfileData: any = {
    "me": {
      "dateJoined": "1234",
      "membershipExpiration": "1234",
      "eventsAttended": [
        {
          "hostSig": {
            "name": "Game"
          }
        },
        {
          "hostSig": {
            "name": "Women"
          }
        },
        {
          "hostSig": {
            "name": "Game"
          }
        },
      ],
      "groups": [
        {
          "name": "Community Chair"
        },
        {
          "name": "Event Manager"
        }
      ]
    }
  }
  console.log(meProfileData.me);

  return (
    <ProfileWrapper>
      <ProfileHeader meGroups={meProfileData.me.groups} />
      <Membership />
      <Participation />
      <QuickAccess />
    </ProfileWrapper>
  );
};
