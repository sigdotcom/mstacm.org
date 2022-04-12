import React from "react";
import { Input } from 'antd';
import styled from "styled-components";
import { ProfileOptions } from "../../Dashboard/Profile";

const Wrapper: any = styled.div`
	display: flex;
`;

const HeaderText = styled.div`
	font-weight: bold;
	font-size: 64px;
	padding-bottom: 15px;
	color: #333333;
	display: flex;
	padding-right: 25px;
	transition: all 0.2s ease-in-out;
	@media (max-width: 900px) {
		font-size: 40px;
	}
	@media (max-width: 700px) {
		font-size: 30px;
	}
	@media (max-width: 550px) {
		font-size: 25px;
	}
	@media (max-width: 450px) {
		font-size: 23px;
	}
	@media (max-width: 380px) {
		font-size: 20px;
	}
	@media (max-width: 340px) {
		font-size: 17px;
	}
`;
const Group = styled.div`
	display: flex;
	align-items: center;
`;
const Log = styled.div`
  display: inline-block;
  position: absolute;
  right: 175px;
	@media (max-width: 1530px) {
		display: none;
	}
`;
const AddOfficerButton = styled.button`
	display: inline-block;
	background: #2d9cdb;
	backdrop-filter: blur(4px);
	width: 155px;
	cursor: pointer;
	height: 43px;
	outline: 0;
	font-weight: bold;
	font-size: 17px;
	border: none;
	border-radius: 40px;
	transition: all 0.2s ease-in-out;
	color: #ffffff;
	margin-right: 50px;
	&:hover {
		background: #087abb;
	}
	@media (max-width: 900px) {
		margin-top: -15px;
	}
	@media (max-width: 700px) {
		width: 125px;
		height: 35px;
		font-size: 15px;
	}
	@media (max-width: 550px) {
		width: 111px;
		height: 29px;
		font-size: 14px;
	}
	@media (max-width: 450px) {
		width: 100px;
		height: 24px;
		font-size: 14px;
	}
	@media (max-width: 380px) {
		width: 90px;
		height: 20px;
		font-size: 13px;
	}
`;
const SearchInput = styled(Input)`
	display: inline-block;
	width: 260px;
	background: transparent;
	border-top: none;
	border-right: none;
	border-left: none;
	border-bottom: solid 1px black;
	border-radius: 0;
	&:focus {
        box-shadow: none;
    }
]`;

const OfficersHeader: React.SFC<{}> = (): JSX.Element => {
	const addOfficer: () => void = (): void => {
		console.log("Officer Added");
	};

	return (
		<Wrapper>
			<Group>
				<HeaderText>Officers</HeaderText>
				<AddOfficerButton onClick={addOfficer}>Add Officer</AddOfficerButton>
				<SearchInput placeholder="&#128269; Search" />
				<Log>
					<ProfileOptions />
				</Log>
			</Group>
		</Wrapper>
	);
};

export { OfficersHeader };
