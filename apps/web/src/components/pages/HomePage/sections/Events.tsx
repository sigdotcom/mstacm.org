import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { Checkbox } from "antd";
import events from "./Events.json";
import { Element } from "react-scroll";
import windowSize from "react-window-size";
import Icon from "react-eva-icons";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background: #FFFFFF;
  padding: 50px 0;

  button {
    transition: 0.2s ease-in-out;
    font-weight: bold;
    border-radius: 30px;
    padding: 10px 40px
    font-size: 17px;
    color: #2d9cdb;
    border: 3px solid #2d9cdb;
    cursor: pointer;
    background: #fff;
    &:hover {
      background: #2d9cdb;
      color: #fff;
    }
    margin: 0 auto;
    margin-bottom: 15px;
  }

  @media all and (max-width: 1000px) {
    padding: 20px 0 100px 0;
    height: 100%;

    button:focus {
      outline: none;
      color: #2d9cdb;
      background: #fff;
    }
  }
`;

const FilterWrapper = styled.div`
  height: 400px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7f7f7;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px rgba(0, 0, 0, 0.25) solid;
  margin-left: 50px;

  h3 {
    padding-top: 25px;
    text-align: center;
    text-transform: uppercase;
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    line-height: 25px;
  }

  h4 {
    text-align: left;
    text-transform: uppercase;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    color: #092b35;
  }

  @media all and (max-width: 1000px) {
    display: none;
  }
`;

const Sigs = styled.div`
  display: flex;
  height: 300px;
`;

const ImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 15px;
  height: 300px;
  margin-top: 8px;
`;

const ImgImg = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;

const SigWrapper = styled.div`
  padding: 5px;
  height: 325px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 295px;
  margin-top: 10px;

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #ef9c6d;
  }

  .ant-checkbox-checked .ant-checkbox-inner,
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner,
  .ant-checkbox-checked::after,
  .ant-checkbox-inner {
    border: 2px solid #092b35;
    border-color: #092b35;
  }
`;

const EventsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  margin-left: 50px;
  margin-right: 50px;
  overflow-x: hidden;
  overflow-y: hidden;

  @media all and (max-width: 1000px) {
    width: 90%;
    margin-left: 5%;
    max-height: 100%;
    box-shadow: none;
  }
`;

const EventWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%
  margin-bottom: 10px;
  margin-left: 5px;

  p {
    font-size: 17px;
  }

  a {
    font-weight: 600;
  }

  a:hover {
    color: #42C0FC;
  }

  @media all and (max-width: 1000px) {
    flex-direction: column;
    margin: 0;
    margin-bottom: 10px;
    height: 100%;
  }
`;

const EventName = styled.h1`
  width: 95%;
  text-transform: uppercase;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  color: #42c0fc;
  margin: 0;

  @media all and (max-width: 1000px) {
    font-size: 30px;
  }
`;

const LeftWrapper = styled.div`
  width: 225px;
  display: flex;

  a {
    width: 150px;
  }

  @media all and (max-width: 1000px) {
    a {
      display: none;
    }
  }
`;

const FlierImg = styled.img`
  width: 100%;
`;

const SmallInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75px;

  img {
    margin-top: -15px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }

  @media all and (max-width: 1000px) {
    width: auto;
    align-items: flex-start;
    justify-content: flex-start;

    img {
      display: none;
    }
  }
`;

const VerticalLine = styled.div`
  margin-right: 25px;
  margin-left: 18px;
  margin-top: 4px;
  height: 130px;
  border-right: 2px solid #bdbdbd;

  @media all and (max-width: 1000px) {
    display: none;
    height: 120px;
    margin-left: 0;
  }
`;

const Details = styled.div`
  margin-bottom: 10px;
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
  flex-direction: column-reverse;
  align-items: center;

  h2 {
    margin: 0;
    margin-bottom: -20px;
    color: #ef9c6d;
    font-size: 46px;
  }

  h3 {
    color: #ef9c6d;
    font-size: 28px;
    text-transform: uppercase;
  }

  @media all and (max-width: 1000px) {
    flex-direction: row;
    width: 100%;
    margin: 0;
    margin-bottom: -10px;

    h2,
    h3 {
      font-size: 30px;
      font-weight: normal;
      margin: 0;
      margin-right: 10px;
    }
  }
`;

const Description = styled.p`
  flierimgcolor: #777777;
  margin-bottom: 10px;
  width: 95%;

  @media all and (max-width: 1000px) {
    width: 100%;
  }
`;

const Show = styled.p`
  color: black;
  font-weight: bold;
  margin-top: 10px;

  @media all and (min-width: 1001px) {
    display: none;
  }
`;

const FlierLink = styled.a`
  color: #376b83;
  font-size: 17px;
  margin-bottom: 10px;

  @media all and (min-width: 1001px) {
    display: none;
  }
`;

interface IProps {
  windowWidth?: any; // Used to check if user is on mobile for initially showing short description
}

// Initalize all events to show abbreviated description
var descArr: Boolean[] = events.events.map(event => {
  return false;
});

// Initalize no filters
var filterArr: Boolean[] = events.events.map(event => {
  return false;
});

var eventCounter: number = 0;

const Events: React.FC<IProps> = props => {
  const [isMobile, setIsMobile] = useState(true);
  const [showLongDesc, setShowLongDesc] = useState([descArr]);
  const [filters, setFilters] = useState([filterArr]);
  const [maxEvents, setMaxEvents] = useState(3);

  useLayoutEffect(() => {
    if (props.windowWidth > 1000) {
      setIsMobile(false);

      for (var i = 0; i < events.events.length; i++) {
        toggleDesc(i);
      }
    }
  }, []);

  // Toggle total number of events to show (for button click)
  const toggleNumEvents = () => {
    eventCounter = 0;
    if (maxEvents > 3) {
      setMaxEvents(3);
    } else {
      setMaxEvents(events.events.length);
    }
  };

  // Toggle whether to show short or long description on event (mobile only)
  const toggleDesc = (i: number) => {
    if (isMobile) {
      descArr[i] = !descArr[i];
      setShowLongDesc([descArr]);
    }
  };

  // Add filter if checkbox is checked
  const toggleCheckbox = (index: number) => {
    filterArr[index] = !filterArr[index];
    setFilters([filterArr]);
  };

  // Determine if event should be shown
  const showEvent = (i: number, group: string) => {
    if (eventCounter < maxEvents) {
      if (
        filters[0].every(filter => {
          return filter === false;
        })
      ) {
        eventCounter += 1;
        return true;
      } else if (group === "ACM Comp" && filters[0][0]) {
        eventCounter += 1;
        return true;
      } else if (group === "ACM Data" && filters[0][1]) {
        eventCounter += 1;
        return true;
      } else if (group === "ACM Game" && filters[0][2]) {
        eventCounter += 1;
        return true;
      } else if (group === "ACM General" && filters[0][3]) {
        eventCounter += 1;
        return true;
      } else if (group === "ACM Hack" && filters[0][4]) {
        eventCounter += 1;
        return true;
      } else if (group === "ACM Sec" && filters[0][5]) {
        eventCounter += 1;
        return true;
      } else if (group === "ACM-W" && filters[0][6]) {
        eventCounter += 1;
        return true;
      }
    }
    return false;
  };

  // Get the total number of events that should be shown with the given filter
  // to determine which button text should be shown
  const countEvents = () => {
    var count = 0;
    var showAll = false;

    for (var i = 0; i < events.events.length; i++) {
      if (
        filters[0].every(filter => {
          return filter === false;
        })
      ) {
        showAll = true;
      } else if (events.events[i].group === "ACM Comp" && filters[0][0]) {
        count += 1;
      } else if (events.events[i].group === "ACM Data" && filters[0][1]) {
        count += 1;
      } else if (events.events[i].group === "ACM Game" && filters[0][2]) {
        count += 1;
      } else if (events.events[i].group === "ACM General" && filters[0][3]) {
        count += 1;
      } else if (events.events[i].group === "ACM Hack" && filters[0][4]) {
        count += 1;
      } else if (events.events[i].group === "ACM Sec" && filters[0][5]) {
        count += 1;
      } else if (events.events[i].group === "ACM-W" && filters[0][6]) {
        count += 1;
      }
    }
    if (!count && showAll) {
      count = events.events.length;
    }
    return count;
  };

  // Create list of events
  const makeEvents = () => {
    var eventList = [];
    for (var i = 0; i < events.events.length; i++) {
      var show = showEvent(i, events.events[i].group);
      if (show) {
        eventList.push(Event(i));
      }
    }
    eventCounter = 0;
    return eventList;
  };

  const Event = (i: number) => {
    return (
      <EventWrapper key={i}>
        <LeftWrapper>
          <a
            style={{
              visibility:
                events.events[i].img_path === "" ? "hidden" : "visible"
            }}
            href={require("../../../../static/img/" +
              (events.events[i].img_path === ""
                ? "acm.png"
                : events.events[i].img_path))}
            target="_blank"
          >
            <FlierImg
              src={require("../../../../static/img/" +
                (events.events[i].img_path === ""
                  ? "acm.png"
                  : events.events[i].img_path))}
            />
          </a>
          <SmallInfo>
            <Date>
              <h3>{events.events[i].month}</h3>
              <h2>{events.events[i].day}</h2>
            </Date>
            <img
              src={require("../../../../static/img/" +
                events.events[i].sig_logo)}
            />
          </SmallInfo>
        </LeftWrapper>
        <VerticalLine />
        <div style={{ width: '95%' }}>
          <EventName>{events.events[i].title}</EventName>
          <Details>
            <Time>
              <img src={require("../../../../static/img/location.png")} />
              <h2>{events.events[i].location}</h2>
            </Time>
            <Time>
              <img src={require("../../../../static/img/clock.png")} />
              <h2>{events.events[i].time}</h2>
            </Time>
            <Time style={{ marginLeft: '-1.5px' }}>
              <Icon name="people" size="medium" fill="#000" />
              <h2 style={{ margin: '-1px 0 0 3.5px' }}>{events.events[i].group}</h2>
            </Time>
          </Details>
          <Description onClick={() => toggleDesc(i)}>
            {showLongDesc[0][i]
              ? events.events[i].desc
              : events.events[i].shortDesc}
          </Description>
          <FlierLink
            style={{
              display:
                showLongDesc[0][i] && events.events[i].img_path !== ""
                  ? ""
                  : "none"
            }}
            href={require("../../../../static/img/" +
              (events.events[i].img_path === ""
                ? "acm.png"
                : events.events[i].img_path))}
            target="_blank"
          >
            Click here to see the flier for this event.
          </FlierLink>
          <Show onClick={() => toggleDesc(i)}>
            {showLongDesc[0][i] ? "See less..." : "See more..."}
          </Show>
        </div>
      </EventWrapper>
    );
  };

  return (
    <Element name="events">
      <Wrapper>
        <div style={{ display: "flex" }}>
          <FilterWrapper>
            <h3>Filter</h3>
            <Sigs>
              <ImgWrapper>
                <ImgImg src={require("../../../../static/img/comp-dark.png")} />
                <ImgImg src={require("../../../../static/img/data-dark.png")} />
                <ImgImg src={require("../../../../static/img/game-dark.png")} />
                <ImgImg src={require("../../../../static/img/acm-dark.png")} />
                <ImgImg src={require("../../../../static/img/hack-dark.png")} />
                <ImgImg src={require("../../../../static/img/sec-dark.png")} />
                <ImgImg
                  src={require("../../../../static/img/acm-w-dark.png")}
                />
              </ImgWrapper>
              <SigWrapper>
                <h4>ACM Comp</h4>
                <h4>ACM Data</h4>
                <h4>ACM Game</h4>
                <h4>ACM General</h4>
                <h4>ACM Hack</h4>
                <h4>ACM Sec</h4>
                <h4>ACM-W</h4>
              </SigWrapper>
              <CheckBoxWrapper>
                <Checkbox
                  onChange={() => {
                    toggleCheckbox(0);
                  }}
                  style={{ marginLeft: "8px" }}
                />
                <Checkbox
                  onChange={() => {
                    toggleCheckbox(1);
                  }}
                />
                <Checkbox
                  onChange={() => {
                    toggleCheckbox(2);
                  }}
                />
                <Checkbox
                  onChange={() => {
                    toggleCheckbox(3);
                  }}
                />
                <Checkbox
                  onChange={() => {
                    toggleCheckbox(4);
                  }}
                />
                <Checkbox
                  onChange={() => {
                    toggleCheckbox(5);
                  }}
                />
                <Checkbox
                  onChange={() => {
                    toggleCheckbox(6);
                  }}
                />
              </CheckBoxWrapper>
            </Sigs>
          </FilterWrapper>
          <EventsWrapper>{makeEvents()}</EventsWrapper>
        </div>
        <button
          style={{ display: countEvents() <= 3 ? "none" : "" }}
          onClick={toggleNumEvents}
        >
          {countEvents() >= 3 && maxEvents !== events.events.length
            ? "SHOW ALL EVENTS"
            : "SHOW FEWER EVENTS"}
        </button>
      </Wrapper>
    </Element>
  );
};

export default windowSize(Events);
