import React, { useState } from "react";
import { Element } from "react-scroll";
import styled from "styled-components";
import { PageConstraint } from "../../../common/PageConstraint";
import events from "./Events.json";

import { Checkbox } from "./Checkbox";
import { Event } from "./Event";

const MOBILE_BREAKPOINT: string = "1001px";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding: 20px 0 100px 0;
  background: #fff;

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
    margin: 15px auto 15px auto;
  }

  button:focus {
    outline: none;
    color: #2d9cdb;
    background: #fff;
  }

  a:hover {
    color: #42C0FC;
  }

  @media all and (min-width: ${MOBILE_BREAKPOINT}) {
    padding: 50px 0;

    button:focus:hover {
      background: #2d9cdb;
      color: #fff;
    }
  }
`;

const FilterWrapper = styled.div`
  display: none;

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

  @media all and (min-width: ${MOBILE_BREAKPOINT}) {
    display: inline;
    height: 400px;
    min-width: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f7f7f7;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: 1px rgba(0, 0, 0, 0.25) solid;
    margin-left: 50px;
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
  height: 291px;
  margin-top: 12px;
  margin-left: 10px;
`;

const EventsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  margin-left: 2.5%;
  margin-right: 2.5%;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const CalendarLink = styled.a`
  margin: auto;
  color: #ababab;
  font-size: 20px;
`;

// Initalize no filters
let filterArr: boolean[] = events.events.map(event => {
  return false;
});

const FILTER_TYPES: string[] = [
  "ACM Comp",
  "ACM Data",
  "ACM Game",
  "ACM General",
  "ACM Hack",
  "ACM Sec",
  "ACM-W"
];
const DEFAULT_EVENTS_TO_DISPLAY: number = 3;
const CALENDAR_LINK: string =
  "https://calendar.google.com/calendar/embed?src=mst.edu_7u3stm8bn7l2umuastep5fmbl0%40group.calendar.google.com&ctz=America%2FChicago";

const Events: React.FC<{}> = (): JSX.Element => {
  const [filters, setFilters] = useState<boolean[][]>([filterArr]);
  const [maxEvents, setMaxEvents] = useState<number>(DEFAULT_EVENTS_TO_DISPLAY);
  const [scrollYPosition, setScrollYPosition] = useState<number>(0);

  // Toggle total number of events to show (for button click)
  const toggleNumEvents = (): void => {
    if (maxEvents > DEFAULT_EVENTS_TO_DISPLAY) {
      setMaxEvents(DEFAULT_EVENTS_TO_DISPLAY);
      window.scrollTo(0, scrollYPosition);
    } else {
      setMaxEvents(events.events.length);
      setScrollYPosition(window.pageYOffset);
    }
  };

  // Add filter if checkbox is checked
  const toggleCheckbox = (index: number): void => {
    filterArr[index] = !filterArr[index];
    setFilters([filterArr]);
  };

  // Check if default number of events should be shown
  const showDefault = (): boolean => {
    return countEvents() <= DEFAULT_EVENTS_TO_DISPLAY;
  };

  // Check if there are no events shown with the given filter
  const noFilteredEvents = (): boolean => {
    return countEvents() === 0;
  };

  // Determine if event should be shown
  const showEvent = (group: string): boolean => {
    if (
      filters[0].every(filter => {
        return filter === false;
      }) ||
      filters[0][FILTER_TYPES.indexOf(group)]
    ) {
      return true;
    }
    return false;
  };

  // Get the total number of events that should be shown with the given filter
  const countEvents = (): number => {
    let count = 0;

    if (
      filters[0].every(filter => {
        return filter === false;
      })
    ) {
      count = events.events.length;
    } else {
      for (let i = 0; i < events.events.length; i++) {
        if (filters[0][FILTER_TYPES.indexOf(events.events[i].group)]) {
          count += 1;
        }
      }
    }
    return count;
  };

  return (
    <Element name="events">
      <PageConstraint>
        <Wrapper>
          <div style={{ display: "flex" }}>
            <FilterWrapper>
              <h3>Filter</h3>
              <Sigs>
                <ImgWrapper>
                  <ImgImg
                    src={require("../../../../static/img/comp-dark.png")}
                  />
                  <ImgImg
                    src={require("../../../../static/img/data-dark.png")}
                  />
                  <ImgImg
                    src={require("../../../../static/img/game-dark.png")}
                  />
                  <ImgImg
                    src={require("../../../../static/img/acm-dark.png")}
                  />
                  <ImgImg
                    src={require("../../../../static/img/hack-dark.png")}
                  />
                  <ImgImg
                    src={require("../../../../static/img/sec-dark.png")}
                  />
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
                    checked={filters[0][0]}
                    onClick={() => {
                      toggleCheckbox(0);
                    }}
                  />
                  <Checkbox
                    checked={filters[0][1]}
                    onClick={() => {
                      toggleCheckbox(1);
                    }}
                  />
                  <Checkbox
                    checked={filters[0][2]}
                    onClick={() => {
                      toggleCheckbox(2);
                    }}
                  />
                  <Checkbox
                    checked={filters[0][3]}
                    onClick={() => {
                      toggleCheckbox(3);
                    }}
                  />
                  <Checkbox
                    checked={filters[0][4]}
                    onClick={() => {
                      toggleCheckbox(4);
                    }}
                  />
                  <Checkbox
                    checked={filters[0][5]}
                    onClick={() => {
                      toggleCheckbox(5);
                    }}
                  />
                  <Checkbox
                    checked={filters[0][6]}
                    onClick={() => {
                      toggleCheckbox(6);
                    }}
                  />
                </CheckBoxWrapper>
              </Sigs>
            </FilterWrapper>
            <EventsWrapper>
              {events.events
                .filter(event => {
                  return showEvent(event.group);
                })
                .slice(0, maxEvents)
                .map((event, i) => {
                  return <Event event={event} key={i} />;
                })}
              <CalendarLink
                style={{ display: noFilteredEvents() ? "" : "none" }}
                href={CALENDAR_LINK}
                target="_blank"
              >
                We have no events scheduled with this filter. Click here to take
                a look at our full calendar for more details.
              </CalendarLink>
            </EventsWrapper>
          </div>
          <button
            style={{ display: showDefault() ? "none" : "" }}
            onClick={toggleNumEvents}
          >
            {!showDefault() && maxEvents !== events.events.length
              ? "SHOW ALL EVENTS"
              : "SHOW FEWER EVENTS"}
          </button>
          <CalendarLink
            style={{
              display: noFilteredEvents() ? "none" : "",
              paddingTop: showDefault() ? "50px" : "",
              margin: "-10px auto 0 auto",
              fontSize: "15px"
            }}
            href={CALENDAR_LINK}
            target="_blank"
          >
            Or view the full ACM calendar
          </CalendarLink>
        </Wrapper>
      </PageConstraint>
    </Element>
  );
};

export { Events };
