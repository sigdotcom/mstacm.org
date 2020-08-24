import React from "react";
import styled, { AnyStyledComponent } from "styled-components";
import { Event } from "./Event";

import { IEvent } from "./interfaces";

const PageWrapper: AnyStyledComponent = styled.div`
  padding: 15px;
  max-width: 800px;
  @media (max-width: 750px) {
    margin: 0 auto;
  }
`;
const List: AnyStyledComponent = styled.ul`
  padding: 0;
  margin: 0;
`;
interface IQueryProps {
  loading: any;
  error: any;
  data: any;
}
const todaysDate = new Date();
const todaysISO = todaysDate.toISOString();
const errorData = [
  //This allows Event data to error to this if it cannot fetch
  {
    id: 4,
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2019-10-03T18:59:21.955Z",
    dateExpire: "2019-10-03T18:59:21.955Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmw_bob_ross_painting_night.png",
    eventLink: null,
  },
];

const PrevioustList: React.SFC<IQueryProps> = ({
  loading,
  error,
  data,
}): JSX.Element => {
  if (loading) {
    return (
      <PageWrapper>
        <h3>Loading...</h3>
      </PageWrapper>
    );
  } else if (error) {
    return (
      <PageWrapper>
        <h3>{error.toString()}</h3>
      </PageWrapper>
    );
  } else {
    const events: IEvent[] = data.events;

    events
      .sort(
        (a: any, b: any) =>
          new Date(a.dateHosted).getTime() - new Date(b.dateHosted).getTime() //Sorts dates by upcoming - later
      )
      .reverse();
    const previousEventFilter = events.filter(
      (c: any) =>
        new Date(c.dateHosted).getTime() -
          new Date(todaysISO.split("T")[0]).getTime() < //Filters out dates that have passed
        0
    );
    const listElements: JSX.Element[] = previousEventFilter.map(
      (event: IEvent, index: number) => (
        <Event event={event} index={index} key={event.id} />
      )
    );

    return (
      <PageWrapper>
        <List>
          {listElements.length < 1 ? "No previous events" : listElements}
        </List>
      </PageWrapper>
    );
  }
};

const ThisWeekList: React.SFC<IQueryProps> = ({
  loading,
  error,
  data,
}): JSX.Element => {
  if (loading) {
    return (
      <PageWrapper>
        <h3>Loading...</h3>
      </PageWrapper>
    );
  } else if (error) {
    return (
      <PageWrapper>
        <h3>{error.toString()}</h3>
      </PageWrapper>
    );
  } else {
    const events: IEvent[] = data.events;
    events.sort(
      (a: any, b: any) =>
        new Date(a.dateHosted).getTime() - new Date(b.dateHosted).getTime() //sorts by upcoming - later
    );

    const thisWeekEventFilter = events.filter(
      (a: any) =>
        new Date(a.dateHosted.split("T")[0]).getTime() -
          new Date(a.dateHosted.split("T")[0]).getDay() * 86400000 ===
        new Date(todaysISO.split("T")[0]).getTime() -
          new Date(todaysISO.split("T")[0]).getDay() * 86400000 //Finds the monday of our week and the monday of the the events week and tests if its equal
    );
    const passedEventFilter = thisWeekEventFilter.filter(
      (c: any) =>
        new Date(c.dateHosted).getTime() -
          new Date(todaysISO.split("T")[0]).getTime() > //Filters out dates that have passed
        0
    );

    const listElements: JSX.Element[] = passedEventFilter.map(
      (event: IEvent, index: number) => (
        <Event event={event} index={index} key={event.id} />
      )
    );

    return (
      <PageWrapper>
        <List>
          {listElements.length < 1
            ? "No upcoming events this week"
            : listElements}
        </List>
      </PageWrapper>
    );
  }
};
const NextWeekList: React.SFC<IQueryProps> = ({
  loading,
  error,
  data,
}): JSX.Element => {
  if (loading) {
    return (
      <PageWrapper>
        <h3>Loading...</h3>
      </PageWrapper>
    );
  } else if (error) {
    return (
      <PageWrapper>
        <h3>{error.toString()}</h3>
      </PageWrapper>
    );
  } else {
    const events: IEvent[] = data.events;
    events.sort(
      (a: any, b: any) =>
        new Date(a.dateHosted).getTime() - new Date(b.dateHosted).getTime() //sorts by upcoming - later
    );

    const nextWeekEventFilter = events.filter(
      (a: any) =>
        new Date(a.dateHosted.split("T")[0]).getTime() -
          new Date(a.dateHosted.split("T")[0]).getDay() * 86400000 ===
        new Date(todaysISO.split("T")[0]).getTime() +
          7 * 86400000 -
          new Date(todaysISO.split("T")[0]).getDay() * 86400000 //Finds our monday and event monday but 7 days in the future
    );
    const passedEventFilter = nextWeekEventFilter.filter(
      (c: any) =>
        new Date(c.dateHosted).getTime() -
          new Date(todaysISO.split("T")[0]).getTime() >
        0
    );

    const listElements: JSX.Element[] = passedEventFilter.map(
      (event: IEvent, index: number) => (
        <Event event={event} index={index} key={event.id} />
      )
    );

    return (
      <PageWrapper>
        <List>
          {listElements.length < 1
            ? "No upcoming events next week"
            : listElements}
        </List>
      </PageWrapper>
    );
  }
};

const Future: React.SFC<IQueryProps> = ({
  loading,
  error,
  data,
}): JSX.Element => {
  if (loading) {
    return (
      <PageWrapper>
        <h3>Loading...</h3>
      </PageWrapper>
    );
  } else if (error) {
    return (
      <PageWrapper>
        <h3>{error.toString()}</h3>
      </PageWrapper>
    );
  } else {
    const events: IEvent[] = data.events;
    events.sort(
      (a: any, b: any) =>
        new Date(a.dateHosted).getTime() - new Date(b.dateHosted).getTime() //sorts by new dates to old dates
    );

    const futureEventFilter = events.filter(
      (c: any) =>
        new Date(c.dateHosted.split("T")[0]).getTime() >
        new Date(todaysISO.split("T")[0]).getTime() +
          13 * 86400000 -
          new Date(todaysISO.split("T")[0]).getDay() * 86400000 //Filters outs previous, this week, and next week dates
    );

    const listElements: JSX.Element[] = futureEventFilter.map(
      (event: IEvent, index: number) => (
        <Event event={event} index={index} key={event.id} />
      )
    );

    return (
      <PageWrapper>
        <List>
          {listElements.length < 1 ? "No upcoming future events" : listElements}
        </List>
      </PageWrapper>
    );
  }
};
export { PrevioustList, ThisWeekList, NextWeekList, Future, errorData };
