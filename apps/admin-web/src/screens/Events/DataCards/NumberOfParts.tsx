import React from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styled, { AnyStyledComponent } from "styled-components";

const Center: AnyStyledComponent = styled.div`
  display: flex;
  padding-top: 20px;

  padding-bottom: 40px;
  justify-content: center;
`;
const Box: AnyStyledComponent = styled.div`
  height: 140px;
  width: 300px;
  padding: 10px;
  background-color: white;
  border-radius: 12px;
  padding-top: 10px;
  display: flex;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.08);
  font-family: sans-serif;
  padding-bottom: 5px;
`;
const Title: AnyStyledComponent = styled.div``;
const GroupOne: AnyStyledComponent = styled.div`
  display: flex;
  width: 100%;
  padding-left: 10px;
  height: 100%;
  flex-direction: column;
  flex: 1;
`;
const GroupTwo: AnyStyledComponent = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  height: 100%;
`;
const DropdownStyle: AnyStyledComponent = styled.div`
  padding-left: 20px;
  display: inline-block;
`;
const EventPartNumbers: AnyStyledComponent = styled.div`
  font-size: 30px;
  font-weight: bold;
  display: inline-block;
`;
const AttendeesText: AnyStyledComponent = styled.div`
  display: inline-block;
`;
const AttendeesNumbers: AnyStyledComponent = styled.div`
  font-weight: bold;
  font-size: 21px;
`;
const AttendeeText: AnyStyledComponent = styled.div`
  font-size: 15px;
  font-weight: bold;
  display: flex;
  padding-left: 10px;
  margin-top: -15px;
`;

const AttendeePercentage: AnyStyledComponent = styled.div`
  font-size: 40px;
  font-weight: bold;
  padding-left: 10px;
`;
const AttendeeGroup: AnyStyledComponent = styled.div`
  padding-top: 10px;
`;
const DropdownButton: AnyStyledComponent = styled.button`
  outline: 0;
  border: 0;
  cursor: pointer;
  background: none;
`;
const NumberOfParts: React.FC<{}> = (): JSX.Element => {
  const menu = (
    <Menu>
      <Menu.Item>
        <DropdownButton>Last week </DropdownButton>
      </Menu.Item>
      <Menu.Item>
        <DropdownButton>Last month </DropdownButton>
      </Menu.Item>
    </Menu>
  );
  return (
    <Center>
      <Box>
        <GroupOne>
          <Title>Event Participation</Title>
          <EventPartNumbers>N/A</EventPartNumbers>
          <AttendeesText>Unique Attendees</AttendeesText>
          <AttendeesNumbers>N/A</AttendeesNumbers>
        </GroupOne>
        <GroupTwo>
          <DropdownStyle>
            <Dropdown overlay={menu}>
              <DropdownButton
                className="ant-dropdown-link"
                onClick={(e: any) => e.preventDefault()}
              >
                Last week
                <DownOutlined />
              </DropdownButton>
            </Dropdown>
          </DropdownStyle>
          <AttendeeGroup>
            <AttendeePercentage>N/A</AttendeePercentage>
            <AttendeeText>From last week</AttendeeText>
          </AttendeeGroup>
        </GroupTwo>
      </Box>
    </Center>
  );
};

export { NumberOfParts };