import React from "react";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styled, { AnyStyledComponent } from "styled-components";
import { Graph } from "./Graph";

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
const Title: AnyStyledComponent = styled.div`
  display: inline-block;
`;
const DropdownStyle: AnyStyledComponent = styled.div`
  padding-left: 30px;
  display: inline-block;
`;
const Group: AnyStyledComponent = styled.div`
  padding-left: 10px;
`;
const GraphStyles: AnyStyledComponent = styled.div`
  margin-left: -15px;
  margin-top: -20px;
`;

const DropdownButton: AnyStyledComponent = styled.button`
  outline: 0;
  border: 0;
  cursor: pointer;
  background: none;
`;

const EventPartGraph: React.FC<{}> = (): JSX.Element => {
  const menu = (
    <Menu>
      <Menu.Item>
        <DropdownButton>N/A</DropdownButton>
      </Menu.Item>
      <Menu.Item>
        <DropdownButton>N/A</DropdownButton>
      </Menu.Item>
    </Menu>
  );
  return (
    <Center>
      <Box>
        <Group>
          <Title>Event Participation</Title>

          <DropdownStyle>
            <Dropdown overlay={menu}>
              <DropdownButton
                className="ant-dropdown-link"
                onClick={(e: any) => e.preventDefault()}
              >
                6 months
                <DownOutlined />
              </DropdownButton>
            </Dropdown>
          </DropdownStyle>
          <GraphStyles>
            <Graph />
          </GraphStyles>
        </Group>
      </Box>
    </Center>
  );
};

export { EventPartGraph };
