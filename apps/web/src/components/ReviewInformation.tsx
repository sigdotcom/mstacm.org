// ReviewInformation.js
import React, { useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import styled, { AnyStyledComponent } from "styled-components";
import { ReactStripeElements } from "react-stripe-elements";

import { MembershipTypes } from "../generated/graphql";
import { PrimaryButton } from "./PrimaryButton";

const FormContainer: AnyStyledComponent = styled.div`
  width: auto;
`;

const Header: AnyStyledComponent = styled.h2`
  color: black;
  text-align: left;
  font-size: 1.375rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 23px;
`;

const Name: AnyStyledComponent = styled.div`
  font-size: 1.125rem;
  font-weight: bold;
  color: black;
`;

const CardNumber: AnyStyledComponent = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.25rem;
  color: #525252;
  margin-bottom: 1.5rem;
`;

const Membership: AnyStyledComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  padding-bottom: 1rem;
`;

const MembershipCost: AnyStyledComponent = styled.div`
  position: relative;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.875rem;
  color: #42c0fc;

  &::after {
    content: "$";
    position: absolute;
    bottom: -5px;
    right: -10px;
    font-size: 1.125rem;
    font-weight: bold;
    color: #525252;
  }
`;

const MembershipType: AnyStyledComponent = styled.div`
  color: black;
  font-size: 1.125rem;
  font-weight: bold;
  line-height: 1.25rem;
`;

const Buttons: AnyStyledComponent = styled.div`
  position: relative;
  margin: 1rem auto 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const LineBreak: AnyStyledComponent = styled.div`
  position: absolute;
  top: -1rem;
  left: 50%;
  transform: translateX(-50%);
  height: 2px;
  width: 340px;
  background: #C4C4C4;
`;

const BackButton: AnyStyledComponent = styled.input`
  background: none;
  color: #909090;
  border: none;
  font-size: 1.125rem;
  font-weight: 800;
  padding: 0 8px;
  margin-right: .75rem;
  cursor: pointer;
  transition: 0.2s ease-in-out all;

  &:hover {
    background: none;
    color: #717171;
  }
`;

const PurchaseButton: AnyStyledComponent = styled(PrimaryButton)`
  font-size: 1.125rem;
  font-weigth: 800;
  height: 2.5rem;
  padding: 0 1.5rem;
`;

// type setString = React.Dispatch<React.SetStateAction<string>>;
type setBoolean = React.Dispatch<React.SetStateAction<boolean>>;

interface TempNameProps {
  stripe: ReactStripeElements.StripeProps | null;
  handleError: (message: string) => void;
  // setIntent: setString;
  nextModal: () => void;
  prevModal: () => void;
  paymentMethod: stripe.paymentMethod.PaymentMethod;
  clientSecret: string;
  tag: MembershipTypes;
}

export const ReviewInformationForm: React.FC<TempNameProps> = (
  props: TempNameProps
): JSX.Element => {
  const [loadingPayment, setLoadingPayment]: [boolean, setBoolean] = useState<boolean>(false);
  const { isLoading, user } = useAuth0();

  const handleSubmit: (ev: React.FormEvent) => void = async (
    ev: React.FormEvent
  ): Promise<void> => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    if (!props.stripe) {
      props.handleError("Stripe.js hasn't loaded yet.");
      return;
    }
    setLoadingPayment(true);

    const { paymentIntent, error }: stripe.PaymentIntentResponse = await props.stripe.confirmCardPayment(
      props.clientSecret,
      { payment_method: props.paymentMethod.id }
    );

    if (error) {
      setLoadingPayment(false);
      props.handleError(error.message || "Unknown error occurred");
      return;
    }

    if (!paymentIntent) {
      setLoadingPayment(false);
      props.handleError("Unknown error occurred");
      return;
    }

    setLoadingPayment(false);
    // props.setIntent(paymentIntent.id);
    props.nextModal();
  }

  return (
    <form onSubmit={handleSubmit} onReset={props.prevModal}>
      <FormContainer>
        <Header>Review</Header>
        {!isLoading && <Name>{user?.name}</Name>}
        <CardNumber>xxxx xxxx xxxx {1234
          // props.paymentMethod.card ? props.paymentMethod.card.last4 : "xxxx"
        }</CardNumber>
        <Membership>
          <MembershipCost>{props.tag === "YEARLY" ? 20 : 11}</MembershipCost>
          <div style={{ width: "100%" }} />
          <MembershipType>{props.tag} Membership</MembershipType>
        </Membership>
        <Buttons>
          <LineBreak />
          <BackButton
            type="reset"
            value="Back"
            disabled={isLoading}
          />
          <PurchaseButton
            disabled={loadingPayment}
            loading={loadingPayment}
          >
            Purchase
          </PurchaseButton>
        </Buttons>
      </FormContainer>
    </form >
  )
}
