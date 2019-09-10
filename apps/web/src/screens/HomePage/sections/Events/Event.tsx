import React, { useState } from "react";
import styled from "styled-components";
import Icon from "react-eva-icons";
import LinesEllipsis from "react-lines-ellipsis";

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

const Date = styled.div`
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

interface IEventProps {
  img_path: string;
  day: string;
  month: string;
  sig_logo: string;
  title: string;
  location: string;
  time: string;
  desc: string;
  group: string;
}

const Event: React.SFC<{ event: IEventProps }> = props => {
  const { event } = props;
  const [showFullDesc, setShowFullDesc] = useState<boolean>(false);

  const handleClick = (): void => {
    setShowFullDesc(!showFullDesc);
  };

  const doesFlierExist = (img_path: string): boolean => {
    return img_path != "";
  };

  return (
    <EventWrapper>
      <div style={{ display: "flex" }}>
        <FlierWrapper>
          <a
            style={{
              visibility: doesFlierExist(event.img_path) ? "visible" : "hidden"
            }}
            href={require("../../../../static/img/" +
              (doesFlierExist(event.img_path) ? event.img_path : "blank.png"))}
            target="_blank"
          >
            <img
              src={require("../../../../static/img/" +
                (doesFlierExist(event.img_path)
                  ? event.img_path
                  : "blank.png"))}
              style={{ width: "100%" }}
            />
          </a>
        </FlierWrapper>
        <SmallInfo>
          <Date>
            <h3>{event.month}</h3>
            <h2>{event.day}</h2>
          </Date>
          <img src={require("../../../../static/img/" + event.sig_logo)} />
        </SmallInfo>
      </div>
      <VerticalLine />
      <div>
        <EventName>{event.title}</EventName>
        <div style={{ marginBottom: "10px" }}>
          <Time>
            <img src={require("../../../../static/img/location.png")} />
            <h2>{event.location}</h2>
          </Time>
          <Time>
            <img src={require("../../../../static/img/clock.png")} />
            <h2>{event.time}</h2>
          </Time>
          <Time style={{ marginLeft: "-1.5px" }}>
            <Icon name="people" size="medium" fill="#000" />
            <h2 style={{ margin: "-1px 0 0 3.5px" }}>{event.group}</h2>
          </Time>
        </div>
        <Description onClick={handleClick} style={{ marginRight: "5px" }}>
          <LinesEllipsis
            text={event.desc}
            maxLine={showFullDesc ? Number.MAX_VALUE : NUM_DESC_LINES}
            ellipsis="... read more"
            basedOn="words"
            style={{ fontSize: "16px" }}
          />
        </Description>
        <FlierLink
          href={require("../../../../static/img/" +
            (doesFlierExist(event.img_path) ? event.img_path : "acm.png"))}
          target="_blank"
          style={{
            display:
              showFullDesc && doesFlierExist(event.img_path) ? "" : "none"
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
