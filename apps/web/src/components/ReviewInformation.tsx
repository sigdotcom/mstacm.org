// ReviewInformation.js
import React, { useState } from "react";

import { useAuth0 } from "../utils/react-auth0-wrapper";
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
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 0.8rem 0;
  padding-right: 4rem;
`;

const Name: AnyStyledComponent = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #525252;
`;

const CardNumber: AnyStyledComponent = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #525252;
`;

const Membership: AnyStyledComponent = styled.div`
  display: flex;
  align-items: flex-end;
`;

const MembershipCost: AnyStyledComponent = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: #42c0fc;

  &::after {
    content: "$";
    font-size: 18px;
    font-weight: bold;
    color: #525252;
  }
`;

const MembershipType: AnyStyledComponent = styled.div`
  color: #525252;
  font-size: 18px;
  font-weight: bold;
  margin: 0 12px 8px 0;
  white-space: nowrap;
`;

const PurchaseButton: AnyStyledComponent = styled(PrimaryButton)`
  margin: 1rem auto .5rem;
  font-size: 18px;
  font-weigth: 800;
`;

interface TempNameProps {
  stripe: ReactStripeElements.StripeProps | null;
  handleError: (message: string) => void;
  setIntent: setString;
  nextModal: () => void;
  paymentMethod: stripe.paymentMethod.PaymentMethod;
  clientSecret: string;
  tag: MembershipTypes;
}

type setString = React.Dispatch<React.SetStateAction<string>>;
type setBoolean = React.Dispatch<React.SetStateAction<boolean>>;

export const ReviewInformationForm: React.FC<TempNameProps> = (
  props: TempNameProps
): JSX.Element => {
  const [loadingPayment, setLoadingPayment]: [boolean, setBoolean] = useState<boolean>(false);
  const { loading, user } = useAuth0();

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
    props.setIntent(paymentIntent.id);
    props.nextModal();
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <Header>Review</Header>
        {!loading && <Name>{user.name}</Name>}
        <CardNumber>xxxx xxxx xxxx {
          props.paymentMethod.card ? props.paymentMethod.card.last4 : "xxxx"
        }</CardNumber>
        <Membership>
          <MembershipCost>{props.tag === "YEARLY" ? 20 : 11}</MembershipCost>
          <div style={{ width: "2rem" }} />
          <MembershipType>{props.tag} MEMBERSHIP</MembershipType>
        </Membership>
        <PurchaseButton
          disabled={loadingPayment}
          loading={loadingPayment}
        >
          PURCHASE
        </PurchaseButton>
      </FormContainer>
    </form>
  )
}
