import React, { useState, useEffect } from "react";

import styled, { AnyStyledComponent } from "styled-components";

import { Event } from "../../generated/graphql";

const ParticipationWrapper: AnyStyledComponent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: .5rem;

  @media all and (min-width: 600px) {
    margin-bottom: 1rem;
  }

  @media all and (min-width: 1280px) {
    margin-bottom: 0;
  }

  @media all and (min-width: 1340px) {
    width: 80%;
    margin-right: 1.5rem;
  }
`;

const ParticipationTitle: AnyStyledComponent = styled.div`
  font-size: 1.25rem;
  font-weight: 800;
  color: black;
  width: 100%;
  line-height: 1.25rem;
  white-space: nowrap;
  margin-right: 1.5rem;
  padding-left: 1.25rem;

  @media all and (min-width: 600px) {
    padding: 0;
  }

  @media all and (min-width: 960px) {
    line-height: 1.5rem;
    font-size: 1.5rem;
  }
`;

const MonthStart: AnyStyledComponent = styled.div`
  font-size: .875rem;
  color: #555555;
  padding-left: 1.45rem;
  margin-bottom: .75rem;
  width: 100%;

  @media all and (min-width: 600px) {
    padding-left: .2rem;
  }

  @media all and (min-width: 960px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

const CarouselWrapper: AnyStyledComponent = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 1.25rem;
  width: 100%;

  @media all and (min-width: 600px) {
    overflow: initial
    white-space: initial;
    padding: 0;
  }

  @media all and (min-width: 960px) {
    margin-left: 0;
  }

  @media all and (min-width: 1280px) {
    padding-right: 2rem;
    min-width: 27rem;
  }
`;

const ClubBox: AnyStyledComponent = styled.div`
  display: inline-block;
  border-radius: 12px;
  margin: 1rem 1rem 1rem 0;
  padding: 1.25rem 1rem;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.15);
  min-width: 8rem;
  transition: all .2s ease-in-out;

  div:first-child {
    margin-left: 0;
  }

  @media all and (min-width: 600px) {
    margin-top: 0;
    padding: 1rem;
  }

  @media all and (min-width: 1280px) {
    margin: 0 1.25rem 1.25rem 0;
    padding: 1.5rem 1.25rem;
    min-width: 11rem;
  }

  @media all and (min-width: 1500px) {
    min-width: 12.8rem;
  }
`;

const NumEvents: AnyStyledComponent = styled.div`
  font-size: 2rem;
  line-height: 27px;
  font-weight: 800;
  color: black;

  @media all and (min-width: 1280px) {
    font-size: 3rem;
    line-height: 40px;
  }

  @media all and (min-width: 1500px) {
    font-size: 4rem;
    line-height: 50px;
  }
`;

const ClubName: AnyStyledComponent = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: black;

  @media all and (min-width: 1280px) {
    font-size: 1.2rem;
  }

  @media all and (min-width: 1500px) {
    font-size: 1.5rem;
  }
`;

const CommunitiesBox: AnyStyledComponent = styled.div`
  background: #CCCCCC;
  width: 100%;
  max-width: 20rem;
  height: 7rem;
  border-radius: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1.25rem;
  margin-bottom: 1.5rem;

  @media all and (min-width: 600px) {
    margin-left: 0;
  }
`;

const CommunitiesLink: AnyStyledComponent = styled.a`
  font-size: 1rem;
`;

const COLORS = [
  "#F5DEB3", "#FFC0CB", "#C0F6BF", "#E8BFF6",
  "#F5F6BF", "#A9DEF9", "#F694C1", "#BCFFE2",
  "#F5DEB3", "#FFC0CB", "#C0F6BF", "#E8BFF6",
  "#F5F6BF", "#A9DEF9", "#F694C1", "#BCFFE2"
];

interface ParticipationProps {
  monthJoined: string;
  eventsAttended: Event[];
}

export const Participation: React.FC<ParticipationProps> = (
  props: ParticipationProps
) => {
  const [clubBoxes, setClubBoxes] = useState<any>(undefined);

  useEffect(() => {
    if (!props.eventsAttended.length) {
      return;
    }

    let clubEvents: {
      [key: string]: {
        amountAttended: number;
        color: string;
      }
    } = {};
    let sigName = "";

    let i = 0;
    props.eventsAttended.forEach((event: Event) => {
      if (event.hostSig) {
        sigName = event.hostSig.name;
        if (sigName in clubEvents) {
          clubEvents[sigName].amountAttended += 1;
        } else {
          clubEvents[sigName] = {
            amountAttended: 1,
            color: COLORS[i]
          }
          i++;
        }
      }
    });

    let clubBoxList = [];
    for (const club in clubEvents) {
      clubBoxList.push(
        <ClubBox key={club} style={{ background: clubEvents[club].color }}>
          <NumEvents>{clubEvents[club].amountAttended}</NumEvents>
          <ClubName>ACM {club}</ClubName>
        </ClubBox>
      )
    }
    setClubBoxes(clubBoxList);
  }, [props]);

  return (
    <ParticipationWrapper>
      <ParticipationTitle>Community Participation</ParticipationTitle>
      <MonthStart>events attended since {props.monthJoined}</MonthStart>
      {clubBoxes ?
        <CarouselWrapper>
          {clubBoxes}
        </CarouselWrapper> :
        <CommunitiesBox>
          <CommunitiesLink href="#">
            Find our communities here
          </CommunitiesLink>
        </CommunitiesBox>
      }
    </ParticipationWrapper>
  );
};
