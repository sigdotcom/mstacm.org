import gql from "graphql-tag";
import React from "react";
import styled, { AnyStyledComponent } from "styled-components";

import { ProfileHeader } from "./profileHeader";
import { Membership } from "./membership";
import { Participation } from "./participation";
import { RecentlyAttendedEvents } from "./recentlyAttendedEvents";
import { QuickAccess } from "../QuickAccess";
import {
  useMeProfileQuery,
  MeProfileQueryHookResult
} from "../../generated/graphql"


export const ME_PROFILE_QUERY: any = gql`
  query MeProfile {
    me {
      graduationDate
      dateJoined
      membershipExpiration
      eventsAttended {
        dateHosted
        hostSig {
          name
        }
        eventTitle
        description
        location
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

const AttendedEventsWrapper: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 2.5rem;

  @media all and (min-width: 600px) {
    padding: 0 1.25rem;
  }

  @media all and (min-width: 960px) {
    padding: 0;
    width: 86%
    max-width: 80rem;
    margin-bottom: 0;
  }

  @media all and (min-width: 1280px) {
    flex-direction: row;
  }
`;

const QuickAccessMargins: AnyStyledComponent = styled.div`
  width: 100%;
  padding: 0 1.25rem;

  @media all and (min-width: 600px) {
    display: none;
  }
`;

export const ProfilePage: React.FC<{}> = () => {
  const { data: meProfileData, loading, error }: MeProfileQueryHookResult = useMeProfileQuery();
  console.log(meProfileData, loading, error);

  if (!meProfileData || loading || error)
    return (<div>That Sucks!</div>)

  if (!meProfileData.me)
    return (<div>That Sucks!</div>)

  if (!meProfileData.me.eventsAttended)
    return (<div>That Sucks!</div>)

  return (
    <ProfileWrapper>
      <ProfileHeader
        meGroups={meProfileData.me.groups}
        numEvents={meProfileData.me.eventsAttended.length}
      />
      <Membership
        dateJoined={meProfileData.me.dateJoined}
        numEventsAttended={meProfileData.me.eventsAttended.length}
        graduationDate={meProfileData.me.graduationDate}
        membershipExpiration={meProfileData.me.membershipExpiration}
      />
      <AttendedEventsWrapper>
        <Participation
          monthJoined={meProfileData.me.dateJoined}
          eventsAttended={meProfileData.me.eventsAttended}
        />
        <RecentlyAttendedEvents
          eventsAttended={meProfileData.me.eventsAttended}
        />
      </AttendedEventsWrapper>
      <QuickAccessMargins>
        <QuickAccess />
      </QuickAccessMargins>
    </ProfileWrapper>
  );
};

// meProfileData = {
//   "me": {
//     "graduationDate": "May 2021",
//     "dateJoined": "August 2019",
//     "membershipExpiration": "FebruaryA",
//     "eventsAttended": [
//       {
//         "dateHosted": "September 25, 2019 10:00 - 12:00pm",
//         "hostSig": { "name": "Women" },
//         "eventTitle": "Dr. Katrina Ward Talk",
//         "description": "ACM-W is proud to welcome Dr. Katrina Ward from Sandia National Laboratories. She'll be offering insight on her career at Sandia...",
//         "location": "CS 202"
//       },
//       {
//         "dateHosted": "",
//         "hostSig": { "name": "Game" },
//         "eventTitle": "Deniz Kerim Unlucky Talk",
//         "description": "ACM-W is proud to welcome Dr. Katrina Ward from Sandia National Laboratories. She'll be offering insight on her career at Sandia...",
//         "location": "CS 202"
//       },
//       {
//         "dateHosted": "September 25, 2019 5:00 - 6:00pm",
//         "hostSig": { "name": "Web" },
//         "eventTitle": "Jeter Frog Talk",
//         "description": "ACM-W is proud to welcome Dr. Katrina Ward from Sandia National Laboratories. She'll be offering insight on her career at Sandia...",
//         "location": ""
//       },
//       {
//         "dateHosted": "September 25, 2019 5:00 - 6:00pm",
//         "hostSig": { "name": "" },
//         "eventTitle": "",
//         "description": "ACM-W is proud to welcome Dr. Katrina Ward from Sandia National Laboratories. She'll be offering insight on her career at Sandia and potato",
//         "location": ""
//       }
//     ],
//     "groups": [
//       {
//         "name": "Community Chair"
//       },
//       {
//         "name": "Event Manager"
//       },
//       {
//         "name": "Event Manager"
//       },
//     ]
//   }
// }
