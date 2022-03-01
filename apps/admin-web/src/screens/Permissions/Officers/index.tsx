import React from "react";
import styled, { AnyStyledComponent } from "styled-components";
import { Menu, Dropdown } from 'antd';
// import { DownOutlined } from '@ant-design/icons';
import { OfficersHeader } from "./OfficersHeader";

const PageWrapper: AnyStyledComponent = styled.div`
  padding-left: 70px;
  padding-top: 50px;
  @media (max-width: 900px) {
  padding-top: 50px;
	padding-left: 0;
  }
`;

const Filters: AnyStyledComponent = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: center;
`;

const AllOfficersButton: AnyStyledComponent = styled.div`
	height: 50px;
	width: 175px;
	padding: 10px;
  margin-right: 15px;
	user-select: none;
	background-color: white;
	border-radius: 12px;
	padding-top: 10px;
	box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.08);
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

const CommunitiesDropDown: AnyStyledComponent = styled.div`
	height: 50px;
	width: 185px;
	padding: 10px;
  margin-left: 15px;
	user-select: none;
	background-color: white;
	border-radius: 12px;
	padding-top: 10px;
	box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.08);
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

const InnerDropDown: AnyStyledComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TriangleDown = styled.div`
  margin-left: 8px;
  height: 0;
  width: 0;

  border-top: 6px solid black;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  @media (max-width: 1500px) {
    border-top: 6px solid white;
  }
`;

const Officers: React.SFC<{}> = (): JSX.Element => {
  const menu = (
    <Menu>
      <Menu.Item>
        General
      </Menu.Item>
      <Menu.Item>
        Web
      </Menu.Item>
      <Menu.Item>
        Competition
      </Menu.Item>
      <Menu.Item>
        Security
      </Menu.Item>
      <Menu.Item>
        Game
      </Menu.Item>
      <Menu.Item>
        Data
      </Menu.Item>
      <Menu.Item>
        Women
      </Menu.Item>
      <Menu.Item>
        Hack
      </Menu.Item>
      <Menu.Item>
        Arcade
      </Menu.Item>
      <Menu.Item>
        Grad
      </Menu.Item>
    </Menu>
  );

	return (
		<PageWrapper>
      <OfficersHeader />
      <Filters>
        <AllOfficersButton>All Officers</AllOfficersButton>
        <CommunitiesDropDown>
          <Dropdown overlay={menu} trigger={['click']}>
            <InnerDropDown className="ant-dropdown-link">
              Communities <TriangleDown />
            </InnerDropDown>
          </Dropdown>
        </CommunitiesDropDown>
      </Filters>
		</PageWrapper>
	);
};

export { Officers };
