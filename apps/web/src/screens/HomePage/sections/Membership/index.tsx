import gql from "graphql-tag";
import React, { useState } from "react";
import Modal from "react-modal";
import { Element } from "react-scroll";
import styled, { AnyStyledComponent } from "styled-components";

import Icon from "react-eva-icons";

import { CheckoutForm } from "../../../../components/CheckoutForm";
import { PageConstraint } from "../../../../components/PageConstraint";
import {
  MeExpirationQueryHookResult,
  MembershipTypes,
  useMeExpirationQuery
} from "../../../../generated/graphql";
import { ConfirmationContainer } from "./ConfirmationContainer";
import { Header, TierContainer } from "./TierContainer";

export const ME_EXPIRATION_QUERY: any = gql`
  query MeExpiration {
    me {
      membershipExpiration
    }
  }
`;

const MembershipWrapper: AnyStyledComponent = styled.div`
  margin: auto;
  margin-bottom: 100px 
  width: 100%;
  max-width: 1200px
  padding: 0 5%;
  font-family: "Nunito Sans"
`;

const Heading: AnyStyledComponent = styled.h1`
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  font-size: 23px;
  & i {
    margin-right: 10px;
  }
`;

const Description: AnyStyledComponent = styled.p`
  margin-bottom: 20px;
  font-size: 19px;
`;

const Line: AnyStyledComponent = styled.hr`
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  margin: 100px 0;
`;

const TierList: AnyStyledComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media all and (min-width: 790px) {
    flex-direction: row;
  }
`;

type voidFunction = () => void;
const Membership: React.FC = (): JSX.Element => {
  const [tag, setTag]: [
    MembershipTypes | undefined,
    React.Dispatch<React.SetStateAction<MembershipTypes | undefined>>
  ] = useState<MembershipTypes | undefined>(undefined);
  const modalStyle: any = {
    content: {
      padding: "0",
      minWidth: "350px",
      width: "380px",
      height: "380px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };

  const result: MeExpirationQueryHookResult = useMeExpirationQuery();
  let expirationDate: string | undefined;

  if (result.data && result.data.me) {
    expirationDate = result.data.me.membershipExpiration;
    result.data.me.membershipExpiration;
  }

  const removeTag: () => void = (): void => {
    setTag(undefined);
  };

  const setYearly: voidFunction = (): void => setTag(MembershipTypes.Yearly);
  const setSemesterly: voidFunction = (): void =>
    setTag(MembershipTypes.Semesterly);

  return (
    <Element name="membership">
      <MembershipWrapper>
        <Line />
        <Modal
          isOpen={tag !== undefined}
          onRequestClose={removeTag}
          contentLabel="Example Modal"
          style={modalStyle}
        >
          <Header>{tag}</Header>
          <CheckoutForm tag={tag!} />
        </Modal>
        <PageConstraint>
          <Heading>
            <Icon name="people" size="large" fill="#777" /> Become a Member
          </Heading>
          <Description>
            Become a dues-paying member of S&T ACM an receive over $100 dollars
            in benefits including:
          </Description>
          {!expirationDate && (
            <TierList>
              <TierContainer onClick={setYearly} title={"Yearly"} cost={"20"} />
              <TierContainer
                onClick={setSemesterly}
                title={"Semesterly"}
                cost={"11"}
              />
            </TierList>
          )}
          {expirationDate && (
            <TierList>
              <ConfirmationContainer date={expirationDate} />
            </TierList>
          )}
        </PageConstraint>
      </MembershipWrapper>
    </Element>
  );
};

export { Membership };