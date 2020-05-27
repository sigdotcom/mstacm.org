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
  font-family: Nunito Sans;
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
// const AttendeeIcon: AnyStyledComponent = styled.div`
//   display: inline-block;
//   padding-left: 20px;
// `;
const AttendeePercentage: AnyStyledComponent = styled.div`
  font-size: 40px;
  font-weight: bold;
  padding-left: 10px;
`;
const AttendeeGroup: AnyStyledComponent = styled.div`
  padding-top: 10px;
`;
const NumberOfParts: React.SFC<{}> = (): JSX.Element => {
  const menu = (
    <Menu>
      <Menu.Item>
        <a>N/A</a>
      </Menu.Item>
      <Menu.Item>
        <a>N/A</a>
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
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                This week
                <DownOutlined />
              </a>
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
