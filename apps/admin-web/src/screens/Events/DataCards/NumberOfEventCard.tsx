import React, { useState } from "react";
import { Menu, Dropdown } from "antd";
import {
  DownOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";
import styled, { AnyStyledComponent } from "styled-components";
import { useEventsQuery } from "../../../generated/graphql";
import { errorData } from "../EventList";

const Box: AnyStyledComponent = styled.div`
  height: 140px;
  width: 300px;
  padding: 10px;
  user-select: none;
  background-color: white;
  border-radius: 12px;
  padding-top: 10px;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.08);
  font-family: Nunito Sans;
  padding-bottom: 5px;
`;
const Title: AnyStyledComponent = styled.div`
  display: inline-block;
`;
const Group: AnyStyledComponent = styled.div`
  display: flex;
  justify-content: center;
`;
const Center: AnyStyledComponent = styled.div`
  display: flex;
  padding-top: 20px;
  justify-content: center;
  padding-bottom: 40px;
`;
const DropdownStyle: AnyStyledComponent = styled.div`
  padding-left: 20px;
  display: inline-block;
`;
const EventNumbersGroup: AnyStyledComponent = styled.div`
  display: flex;
  padding-top: 20px;
`;
const EventNumbers: AnyStyledComponent = styled.div`
  font-size: 30px;
  flex: 1;
  padding-left: 50px;
  font-weight: bold;
`;
const EventNumbersText: AnyStyledComponent = styled.div`
  font-size: 15px;
  padding: 0;
  display: flex;
  margin-top: -15px;
`;
const EventDifference: AnyStyledComponent = styled.div`
  display: flex;
  flex: 1;
  font-size: 30px;
  font-weight: bold;
  flex-direction: column;
`;
const EventDifferenceText: AnyStyledComponent = styled.div`
  font-size: 15px;

  display: flex;
  margin-top: -15px;
`;
const EventDifferenceIcon: AnyStyledComponent = styled.div`
  display: inline-block;
  padding-left: 20px;
`;
const EventDifferenceNumber: AnyStyledComponent = styled.div`
  display: inline-block;
  padding-left: 20px;
`;

const todaysDate = new Date();
const todaysISO = todaysDate.toISOString();

const NumberOfEventCard: React.SFC<{}> = (): JSX.Element => {
  const { loading, error, data }: any = useEventsQuery();
  let events: any;
  if (loading) {
    events = errorData;
  } else if (error) {
    events = errorData;
  } else {
    events = data.events;
  }

  const [title, setTitle] = useState("This week ");
  let [eventNumber, difference] = ThisWeekData();
  let carrot, fromLast;

  const greenRed = {
    color: "#59595a",
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={() => setTitle("This week ")}>This week</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={() => setTitle("This month ")}>This month</a>
      </Menu.Item>
      {/* <Menu.Item>
        <a onClick={() => setTitle("6 months ")}>6 months</a>
      </Menu.Item> */}
    </Menu>
  );

  function ThisWeekData() {
    const thisWeekFilter = events.filter(
      (a: any) =>
        new Date(a.dateHosted.split("T")[0]).getTime() -
          new Date(a.dateHosted.split("T")[0]).getDay() * 86400000 ===
        new Date(todaysISO.split("T")[0]).getTime() -
          new Date(todaysISO.split("T")[0]).getDay() * 86400000
    );

    const lastWeekFilter = events.filter(
      (a: any) =>
        new Date(a.dateHosted.split("T")[0]).getTime() -
          new Date(a.dateHosted.split("T")[0]).getDay() * 86400000 ===
        new Date(todaysISO.split("T")[0]).getTime() -
          new Date(todaysISO.split("T")[0]).getDay() * 86400000 -
          7 * 86400000
    );

    const amountOfThisWeekEvents = thisWeekFilter.length;
    const thisWeekDifference = amountOfThisWeekEvents - lastWeekFilter.length;

    return [amountOfThisWeekEvents, thisWeekDifference];
  }

  function thisMonthData() {
    const thisMonthFilter = events.filter(
      (c: any) =>
        new Date(c.dateHosted.split("T")[0]).getTime() <
        new Date(todaysISO.split("T")[0]).getTime() + 30 * 86400000
    );
    const thisMonthPreviousFilter = thisMonthFilter.filter(
      (c: any) =>
        new Date(c.dateHosted.split("T")[0]).getTime() -
          new Date(todaysISO.split("T")[0]).getTime() >
        0
    );
    const lastMonthFilter = events.filter(
      (c: any) =>
        new Date(c.dateHosted.split("T")[0]).getTime() >
        new Date(todaysISO.split("T")[0]).getTime() - 30 * 86400000
    );
    const lastMonthPreviousFilter = lastMonthFilter.filter(
      (c: any) =>
        new Date(c.dateHosted.split("T")[0]).getTime() -
          new Date(todaysISO.split("T")[0]).getTime() <
        0
    );
    const amountOfThisMonthEvents = thisMonthPreviousFilter.length;
    const thisMonthDifference =
      amountOfThisMonthEvents - lastMonthPreviousFilter.length;

    return [amountOfThisMonthEvents, thisMonthDifference];
  }

  if (title === "This week ") {
    [eventNumber, difference] = ThisWeekData();
    fromLast = "From last week";
  } else if (title === "This month ") {
    [eventNumber, difference] = thisMonthData();
    fromLast = "From last month";
  }

  if (difference > 0) {
    greenRed.color = "#2FC022";
    carrot = <CaretUpOutlined style={greenRed} />;
  } else if (difference < 0) {
    greenRed.color = "#FF0000";
    carrot = <CaretDownOutlined style={greenRed} />;
  } else {
    carrot = <CaretUpOutlined />;
    greenRed.color = "#59595a";
  }
  return (
    <Center>
      <Box>
        <Group>
          <Title>Number of Events</Title>
          <DropdownStyle>
            <Dropdown overlay={menu}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                {title}

                <DownOutlined />
              </a>
            </Dropdown>
          </DropdownStyle>
        </Group>

        <EventNumbersGroup>
          <EventNumbers>
            {eventNumber}

            <EventNumbersText>Events</EventNumbersText>
          </EventNumbers>

          <EventDifference>
            <div>
              <EventDifferenceIcon>{carrot}</EventDifferenceIcon>

              <EventDifferenceNumber>
                <div style={greenRed}>{Math.abs(difference)}</div>
              </EventDifferenceNumber>
            </div>
            <EventDifferenceText>{fromLast}</EventDifferenceText>
          </EventDifference>
        </EventNumbersGroup>
      </Box>
    </Center>
  );
};

export { NumberOfEventCard };
