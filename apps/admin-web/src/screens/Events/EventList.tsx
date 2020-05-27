import React from "react";

import styled, { AnyStyledComponent } from "styled-components";

import { Event } from "./Event";

import { useEventsQuery } from "../../generated/graphql";

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

const testing: any = [
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2019-10-08T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Haleigh is bad  Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },

  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-02T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-03T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-04T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-05T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-06T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-07T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-08T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-09T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-10T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-11T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-12T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-13T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-14T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },

  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-16T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-17T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-18T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-19T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },

  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-20T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-21T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-22T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-23T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-24T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-25T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-26T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-27T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-28T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-29T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-30T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-31T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-04-32T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-02T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-03T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-04T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-05T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-06T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-07T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-08T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-09T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-10T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-11T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-12T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-13T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-14T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },

  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-15T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-16T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-17T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-18T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-19T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },

  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-20T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-21T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-22T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-23T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-23T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-24T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-25T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Competition",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-26T00:00:00.208Z",
    dateExpire: "2019-10-10T01:00:00.208Z",
    hostSig: {
      name: "Hack",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-27T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Data",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-28T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Security",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-29T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Web",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-30T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Game",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-31T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-05-32T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-06-01T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-06-02T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-06-02T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
  {
    id: "4",
    dateCreated: "2019-10-03T18:59:21.955Z",
    dateHosted: "2020-06-02T00:00:00.208Z",
    dateExpire: "2019-10-10T02:00:00.208Z",
    hostSig: {
      name: "Women",
    },
    eventTitle: "Bob Ross Painting Night",
    description:
      "Join ACM-W and ACM Hack for a night of painting happy little trees while following a Bob Ross tutorial with friends. Not very good at painting? Well, no fear! Bob Ross was an American painter known for hosting a tv series on painting techniques for beginners. Easels and paint will be provided, but you must RSVP at https://tinyurl.com/y52roqb6.",
    location: "Toomey 254",
    flierLink: "https://cdn.mstacm.org/events/acmcomp_programming_cup.jpg",
    eventLink: null,
  },
];

const todaysDate = new Date();
const todaysISO = todaysDate.toISOString();

const EventList: React.SFC<{}> = (): JSX.Element => {
  const { loading }: any = useEventsQuery();

  if (loading) {
    return (
      <PageWrapper>
        <h3>Loading...</h3>
      </PageWrapper>
    );
  } else {
    const events: any = testing;
    events
      .sort(
        (a: any, b: any) =>
          new Date(a.dateHosted).getTime() - new Date(b.dateHosted).getTime()
      )
      .reverse();

    const listElements: JSX.Element[] = events.map(
      (event: IEvent, index: number) => (
        <Event event={event} index={index} key={event.id} />
      )
    );

    return (
      <PageWrapper>
        <List>{listElements}</List>
      </PageWrapper>
    );
  }
};

const PrevioustList: React.SFC<{}> = (): JSX.Element => {
  const { loading }: any = useEventsQuery();

  if (loading) {
    return (
      <PageWrapper>
        <h3>Loading...</h3>
      </PageWrapper>
    );
  } else {
    const events: any = testing;

    events
      .sort(
        (a: any, b: any) =>
          new Date(a.dateHosted).getTime() - new Date(b.dateHosted).getTime() //Sorts dates by upcoming - later
      )
      .reverse();
    const t = events.filter(
      (c: any) =>
        new Date(c.dateHosted).getTime() -
          new Date(todaysISO.split("T")[0]).getTime() < //Filters out dates that have passed
        0
    );
    const listElements: JSX.Element[] = t.map(
      (event: IEvent, index: number) => (
        <Event event={event} index={index} key={event.id} />
      )
    );

    return (
      <PageWrapper>
        <List>{listElements}</List>
      </PageWrapper>
    );
  }
};

const ThisWeekList: React.SFC<{}> = (): JSX.Element => {
  const { loading }: any = useEventsQuery();

  if (loading) {
    return (
      <PageWrapper>
        <h3>Loading...</h3>
      </PageWrapper>
    );
  } else {
    const events: any = testing;
    events.sort(
      (a: any, b: any) =>
        new Date(a.dateHosted).getTime() - new Date(b.dateHosted).getTime() //sorts by upcoming - later
    );

    const q = events.filter(
      (a: any) =>
        new Date(a.dateHosted.split("T")[0]).getTime() -
          new Date(a.dateHosted.split("T")[0]).getDay() * 86400000 ===
        new Date(todaysISO.split("T")[0]).getTime() -
          new Date(todaysISO.split("T")[0]).getDay() * 86400000 //Finds the monday of our week and the monday of the the events week and tests if its equal
    );
    const t = q.filter(
      (c: any) =>
        new Date(c.dateHosted).getTime() -
          new Date(todaysISO.split("T")[0]).getTime() > //Filters out dates that have passed
        0
    );

    const listElements: JSX.Element[] = t.map(
      (event: IEvent, index: number) => (
        <Event event={event} index={index} key={event.id} />
      )
    );

    return (
      <PageWrapper>
        <List>{listElements}</List>
      </PageWrapper>
    );
  }
};
const NextWeekList: React.SFC<{}> = (): JSX.Element => {
  const { loading }: any = useEventsQuery();

  if (loading) {
    return (
      <PageWrapper>
        <h3>Loading...</h3>
      </PageWrapper>
    );
  } else {
    const events: any = testing;
    events.sort(
      (a: any, b: any) =>
        new Date(a.dateHosted).getTime() - new Date(b.dateHosted).getTime() //sorts by upcoming - later
    );

    const q = events.filter(
      (a: any) =>
        new Date(a.dateHosted.split("T")[0]).getTime() -
          new Date(a.dateHosted.split("T")[0]).getDay() * 86400000 ===
        new Date(todaysISO.split("T")[0]).getTime() +
          7 * 86400000 -
          new Date(todaysISO.split("T")[0]).getDay() * 86400000 //Finds our monday and event monday but 7 days in the future
    );
    const t = q.filter(
      (c: any) =>
        new Date(c.dateHosted).getTime() -
          new Date(todaysISO.split("T")[0]).getTime() >
        0
    );

    const listElements: JSX.Element[] = t.map(
      (event: IEvent, index: number) => (
        <Event event={event} index={index} key={event.id} />
      )
    );

    return (
      <PageWrapper>
        <List>{listElements}</List>
      </PageWrapper>
    );
  }
};

const Future: React.SFC<{}> = (): JSX.Element => {
  const { loading }: any = useEventsQuery();

  if (loading) {
    return (
      <PageWrapper>
        <h3>Loading...</h3>
      </PageWrapper>
    );
  } else {
    const events: any = testing;
    events.sort(
      (a: any, b: any) =>
        new Date(a.dateHosted).getTime() - new Date(b.dateHosted).getTime() //sorts by new dates to old dates
    );

    const t = events.filter(
      (c: any) =>
        new Date(c.dateHosted.split("T")[0]).getTime() >
        new Date(todaysISO.split("T")[0]).getTime() +
          13 * 86400000 -
          new Date(todaysISO.split("T")[0]).getDay() * 86400000 //Filters outs previous, this week, and next week dates
    );

    const listElements: JSX.Element[] = t.map(
      (event: IEvent, index: number) => (
        <Event event={event} index={index} key={event.id} />
      )
    );

    return (
      <PageWrapper>
        <List>{listElements}</List>
      </PageWrapper>
    );
  }
};
export {
  EventList,
  PrevioustList,
  ThisWeekList,
  NextWeekList,
  Future,
  testing,
};
