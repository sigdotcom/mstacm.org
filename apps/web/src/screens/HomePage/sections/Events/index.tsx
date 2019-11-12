import gql from "graphql-tag";
import React, { useState } from "react";
import { Element } from "react-scroll";
import styled from "styled-components";
import { PageConstraint } from "../../../../components/PageConstraint";

import { Checkbox } from "./Checkbox";
import { Event } from "./Event";

import { config } from "../../../../config";

import {
  Event as IEvent,
  GetCurrentEventsQueryHookResult,
  useGetCurrentEventsQuery
} from "../../../../generated/graphql";

export const GET_CURRENT_EVENTS_QUERY: any = gql`
  query getCurrentEvents {
    currentEvents {
      id
      dateCreated
      dateHosted
      dateExpire
      hostCommunity {
        name
      }
      eventTitle
      description
      location
      flierLink
      eventLink
    }
  }
`;

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

const Communitys = styled.div`
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

const CommunityWrapper = styled.div`
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

const FILTER_TYPES: string[] = [
  "Competition",
  "Data",
  "Game",
  "General",
  "Hack",
  "Security",
  "Women"
];

const DEFAULT_EVENTS_TO_DISPLAY: number = 3;
const CALENDAR_LINK: string =
  "https://calendar.google.com/calendar/embed?src=mst.edu_7u3stm8bn7l2umuastep5fmbl0%40group.calendar.google.com&ctz=America%2FChicago";

const Events: React.FC<{}> = (): JSX.Element => {
  const result: GetCurrentEventsQueryHookResult = useGetCurrentEventsQuery();
  let events: IEvent[] = [];
  if (result.data && result.data.currentEvents) {
    events = result.data.currentEvents as IEvent[];
    events.sort(
      (a: IEvent, b: IEvent) =>
        new Date(a.dateHosted).getTime() - new Date(b.dateHosted).getTime()
    );
  }

  const [filters, setFilters]: [boolean[], (x: boolean[]) => void] = useState<
    boolean[]
  >(new Array(FILTER_TYPES.length).fill(false));
  const [maxEvents, setMaxEvents]: [number, (x: number) => void] = useState<
    number
  >(DEFAULT_EVENTS_TO_DISPLAY);
  const [scrollYPosition, setScrollYPosition]: [
    number,
    (x: number) => void
  ] = useState<number>(0);

  // Toggle total number of events to show (for button click)
  const toggleNumEvents: () => void = (): void => {
    if (maxEvents > DEFAULT_EVENTS_TO_DISPLAY) {
      setMaxEvents(DEFAULT_EVENTS_TO_DISPLAY);
      window.scrollTo(0, scrollYPosition);
    } else {
      setMaxEvents(events.length);
      setScrollYPosition(window.pageYOffset);
    }
  };

  // Add filter if checkbox is checked
  const toggleCheckbox: (x: number) => void = (index: number): void => {
    const newFilters: boolean[] = [...filters];
    newFilters[index] = !newFilters[index];
    setFilters(newFilters);
  };

  // Check if default number of events should be shown
  const showDefault: () => boolean = (): boolean => {
    return countEvents() <= DEFAULT_EVENTS_TO_DISPLAY;
  };

  // Check if there are no events shown with the given filter
  const noFilteredEvents: () => boolean = (): boolean => {
    return countEvents() === 0;
  };

  // Determine if event should be shown
  const showEvent: (x: string) => boolean = (group: string): boolean => {
    if (
      filters.every((filter: boolean) => {
        return filter === false;
      }) ||
      filters[FILTER_TYPES.indexOf(group)]
    ) {
      return true;
    }
    return false;
  };

  // Get the total number of events that should be shown with the given filter
  const countEvents: () => number = (): number => {
    let count: number = 0;

    if (
      filters.every((filter: boolean) => {
        return filter === false;
      })
    ) {
      count = events.length;
    } else {
      for (const e of events) {
        if (filters[FILTER_TYPES.indexOf(e.hostCommunity.name)]) {
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
          <div style={{ display: "flex", width: "100%" }}>
            <FilterWrapper>
              <h3>Filter</h3>
              <Communitys>
                <ImgWrapper>
                  <ImgImg src={`${config.CDN_URI}/static/comp-dark.png`} />
                  <ImgImg src={`${config.CDN_URI}/static/data-dark.png`} />
                  <ImgImg src={`${config.CDN_URI}/static/game-dark.png`} />
                  <ImgImg src={`${config.CDN_URI}/static/acm-dark.png`} />
                  <ImgImg src={`${config.CDN_URI}/static/hack-dark.png`} />
                  <ImgImg src={`${config.CDN_URI}/static/sec-dark.png`} />
                  <ImgImg src={`${config.CDN_URI}/static/acm-w-dark.png`} />
                </ImgWrapper>
                <CommunityWrapper>
                  <h4>ACM Comp</h4>
                  <h4>ACM Data</h4>
                  <h4>ACM Game</h4>
                  <h4>ACM General</h4>
                  <h4>ACM Hack</h4>
                  <h4>ACM Sec</h4>
                  <h4>ACM-W</h4>
                </CommunityWrapper>
                <CheckBoxWrapper>
                  <Checkbox
                    checked={filters[0]}
                    onClick={() => {
                      toggleCheckbox(0);
                    }}
                  />
                  <Checkbox
                    checked={filters[1]}
                    onClick={() => {
                      toggleCheckbox(1);
                    }}
                  />
                  <Checkbox
                    checked={filters[2]}
                    onClick={() => {
                      toggleCheckbox(2);
                    }}
                  />
                  <Checkbox
                    checked={filters[3]}
                    onClick={() => {
                      toggleCheckbox(3);
                    }}
                  />
                  <Checkbox
                    checked={filters[4]}
                    onClick={() => {
                      toggleCheckbox(4);
                    }}
                  />
                  <Checkbox
                    checked={filters[5]}
                    onClick={() => {
                      toggleCheckbox(5);
                    }}
                  />
                  <Checkbox
                    checked={filters[6]}
                    onClick={() => {
                      toggleCheckbox(6);
                    }}
                  />
                </CheckBoxWrapper>
              </Communitys>
            </FilterWrapper>
            <EventsWrapper>
              {events
                .filter((event: IEvent) => {
                  return showEvent(event.hostCommunity.name);
                })
                .slice(0, maxEvents)
                .map((event: IEvent, i: number) => {
                  return <Event {...event} key={i} />;
                })}
              <CalendarLink
                style={{ display: noFilteredEvents() ? "" : "none" }}
                href={CALENDAR_LINK}
                target="_blank"
              >
                {result.loading
                  ? "Loading events... Click here to take a look at our full calendar for more details."
                  : "We have no events scheduled with this filter. Click here to take a look at our full calendar for more details."}
              </CalendarLink>
            </EventsWrapper>
          </div>
          <button
            style={{ display: showDefault() ? "none" : "" }}
            onClick={toggleNumEvents}
          >
            {!showDefault() && maxEvents !== events.length
              ? "SHOW ALL EVENTS"
              : "SHOW FEWER EVENTS"}
          </button>
          <CalendarLink
            style={{
              display: noFilteredEvents() ? "none" : "",
              fontSize: "15px",
              margin: "-10px auto 0 auto",
              paddingTop: showDefault() ? "50px" : ""
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
