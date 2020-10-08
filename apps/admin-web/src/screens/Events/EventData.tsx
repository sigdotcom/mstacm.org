import React from "react";
import styled, { AnyStyledComponent } from "styled-components";
import { NumberOfEventCard } from "./DataCards/NumberOfEventCard";
import { NumberOfParts } from "./DataCards/NumberOfParts";
// import { EventPartGraph } from "./DataCards/EventPartGraph"; //taking this out until fully implented

const Group: AnyStyledComponent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
`;
const Center: AnyStyledComponent = styled.div``;
const EventData: React.SFC<{}> = (): JSX.Element => {
	return (
		<div>
			<Center>
				<Group>
					<NumberOfParts />
					<NumberOfEventCard />
					{/* <EventPartGraph /> taking this out until fully implented */}
				</Group>
			</Center>
		</div>
	);
};

export { EventData };
