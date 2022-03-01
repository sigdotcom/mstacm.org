import React from "react";
import styled, { AnyStyledComponent } from "styled-components";
import { OfficersHeader } from "./OfficersHeader";

const PageWrapper: AnyStyledComponent = styled.div`
  padding-left: 70px;
  padding-top: 50px;
  @media (max-width: 900px) {
  padding-top: 50px;
	padding-left: 0;
  }
`;

const Officers: React.SFC<{}> = (): JSX.Element => {
	return (
		<PageWrapper>
			<OfficersHeader />
		</PageWrapper>
	);
};

export { Officers };
