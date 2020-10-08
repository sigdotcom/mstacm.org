import React, { useState } from "react";
import styled from "styled-components";
import { ProfileOptions } from "../Dashboard/Profile";
import { EventFormModal } from "./EventFormModal";

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
	@media (max-width: 1530px) {
		display: none;
	}
`;
const AddEventButton = styled.button`
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
const UpcomingHeader: React.SFC<{}> = (): JSX.Element => {
	const [formVisible, setFormVisible] = useState(false);
	const addEvent: () => void = (): void => {
		setFormVisible(true);
	};

	return (
		<Wrapper>
			<Group>
				<HeaderText>Upcoming Events</HeaderText>
				<AddEventButton onClick={addEvent}>Add Event</AddEventButton>
				<Log>
					<ProfileOptions />
				</Log>
			</Group>
			<EventFormModal
				formVisible={formVisible}
				setFormVisible={setFormVisible}
			/>
		</Wrapper>
	);
};
const PreviousHeader: React.SFC<{}> = (): JSX.Element => {
	return (
		<Wrapper>
			<Group>
				<HeaderText>Previous Events</HeaderText>
			</Group>
		</Wrapper>
	);
};

export { UpcomingHeader, PreviousHeader };
