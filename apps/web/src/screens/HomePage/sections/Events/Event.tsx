import React, { useState } from "react";
import Icon from "react-eva-icons";
import HTMLEllipses from "react-lines-ellipsis/lib/html";
import styled from "styled-components";

import { config } from "../../../../config";
import { Event as IEvent } from "../../../../generated/graphql";

const MOBILE_BREAKPOINT: string = "1001px";

const EventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%
  margin-bottom: 10px;

  p {
    font-size: 17px;
  }

  a {
    font-weight: 600;
  }

  @media all and (min-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: row;
    margin-left: 5px;
  }
`;

const EventName = styled.h1`
  width: 95%;
  text-transform: uppercase;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  color: #42c0fc;
  margin: 0;

  @media all and (min-width: ${MOBILE_BREAKPOINT}) {
    font-size: 40px;
  }
`;

const FlierWrapper = styled.div`
  display: none;

  @media all and (min-width: ${MOBILE_BREAKPOINT}) {
    display: inline;
    width: 150px;

    img:hover {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }
  }
`;

const SmallInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: auto;

  img {
    display: none;
  }

  @media all and (min-width: ${MOBILE_BREAKPOINT}) {
    align-items: center;
    width: 75px;

    img {
      display: inline;
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
`;

const VerticalLine = styled.div`
  display: none;

  @media all and (min-width: ${MOBILE_BREAKPOINT}) {
    display: inline;
    margin-right: 25px;
    margin-left: 18px;
    margin-top: 4px;
    height: 130px;
    border-right: 2px solid #bdbdbd;
  }
`;

const Time = styled.div`
  display: flex;

  img {
    width: 15px;
    height: 15px;
    margin-top: 3px;
    margin-right: 0;
  }

  h2 {
    margin: 0;
    margin-left: 5px;
    color: #092b35;
    font-size: 16px;
  }
`;

const DateArea = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: -25px;

  h2,
  h3 {
    font-size: 30px;
    font-weight: normal;
    margin-right: 10px;
    color: #ef9c6d;
  }

  @media all and (min-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: column-reverse;
    margin: 0;

    h2 {
      margin: 0;
      margin-bottom: -20px;
      font-size: 46px;
    }

    h3 {
      margin: 0;
      font-size: 28px;
      text-transform: uppercase;
    }
  }
`;

const Show = styled.p`
  display: none;

  @media all and (min-width: ${MOBILE_BREAKPOINT}) {
    display: inline;
    color: black;
    font-weight: bold;
    margin-top: 10px;
  }
`;

const FlierLink = styled.a`
  color: #376b83;
  font-size: 17px;
  margin-bottom: 10px;

  @media all and (min-width: ${MOBILE_BREAKPOINT}) {
    display: none;
  }
`;

const Description = styled.div`
  &:hover {
    cursor: pointer;
  }

  .LinesEllipsis-ellipsis {
    color: #42c0fc;
  }
`;

const NUM_DESC_LINES: number = 3;

const Event: React.SFC<IEvent> = (event: IEvent): JSX.Element => {
  const [showFullDesc, setShowFullDesc] = useState<boolean>(false);

  const handleClick = (): void => {
    setShowFullDesc(!showFullDesc);
  };

  let logoLink: string;
  switch (event.hostCommunity.name) {
    case "Web":
      logoLink = "web.png";
      break;
    case "Women":
      logoLink = "acm-w.png";
      break;
    case "Competition":
      logoLink = "comp.png";
      break;
    case "Data":
      logoLink = "data.png";
      break;
    case "Game":
      logoLink = "game.png";
      break;
    case "Security":
      logoLink = "sec.png";
      break;
    case "Hack":
      logoLink = "hack.png";
      break;
    default:
      logoLink = "acm.png";
      break;
  }

  const eventDate: Date = new Date(event.dateHosted);
  const eventEndDate: Date = new Date(event.dateExpire);
  const time: string =
    event.dateHosted === event.dateExpire
      ? eventDate.toLocaleString("default", {
          hour: "numeric",
          minute: "numeric"
        })
      : `${eventDate.toLocaleString("default", {
          hour: "numeric",
          minute: "numeric"
        })} - ${eventEndDate.toLocaleString("default", {
          hour: "numeric",
          minute: "numeric"
        })}`;

  const flierLink: string = event.flierLink
    ? event.flierLink
    : `${config.CDN_URI}/static/blank.png`;

  return (
    <EventWrapper>
      <div style={{ display: "flex" }}>
        <FlierWrapper>
          <a
            style={{
              visibility: event.flierLink ? "visible" : "hidden"
            }}
            href={flierLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img alt="Flier" src={flierLink} style={{ width: "100%" }} />
          </a>
        </FlierWrapper>
        <SmallInfo>
          <DateArea>
            <h3>{eventDate.toLocaleString("default", { month: "short" })}</h3>
            <h2>{eventDate.getDate()}</h2>
          </DateArea>
          <img
            alt="Community Logo"
            src={`${config.CDN_URI}/static/${logoLink}`}
          />
        </SmallInfo>
      </div>
      <VerticalLine />
      <div>
        <EventName>{event.eventTitle}</EventName>
        <div style={{ marginBottom: "10px" }}>
          <Time>
            <img
              alt="Location Icon"
              src={`${config.CDN_URI}/static/location.png`}
            />
            <h2>{event.location}</h2>
          </Time>
          <Time>
            <img alt="Time Icon" src={`${config.CDN_URI}/static/clock.png`} />
            <h2>{time}</h2>
          </Time>
          <Time style={{ marginLeft: "-1.5px" }}>
            <Icon name="people" size="medium" fill="#000" />
            <h2
              style={{ margin: "-1px 0 0 3.5px" }}
            >{`ACM ${event.hostCommunity.name}`}</h2>
          </Time>
        </div>
        <Description onClick={handleClick} style={{ marginRight: "5px" }}>
          <HTMLEllipses
            unsafeHTML={
              event.description +
              (showFullDesc
                ? "&nbsp<span class='LinesEllipsis-ellipsis'>... Click to hide</span>"
                : "")
            }
            maxLine={showFullDesc ? Number.MAX_VALUE : NUM_DESC_LINES}
            ellipsis="... read more"
            basedOn="words"
            style={{ fontSize: "16px" }}
          />
        </Description>
        <FlierLink
          href={flierLink}
          target="_blank"
          style={{
            display: showFullDesc && event.flierLink ? "" : "none"
          }}
        >
          Click here to see the flier for this event.
        </FlierLink>
        <Show />
      </div>
    </EventWrapper>
  );
};

export { Event };
