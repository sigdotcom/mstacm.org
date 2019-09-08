// CheckoutForm.js
import { Result } from "antd";
import gql from "graphql-tag";
import React, { useState } from "react";
import Icon from "react-eva-icons";

import { ExecutionResult } from "@apollo/react-common";
import {
  CardElement,
  Elements,
  injectStripe,
  ReactStripeElements
} from "react-stripe-elements";
import styled, { AnyStyledComponent } from "styled-components";

import {
  GetMembershipMutation,
  MembershipTypes,
  useGetMembershipMutation
} from "../generated/graphql";
import { IconContainer } from "./IconContainer";
import { PrimaryButton } from "./PrimaryButton";

export const GET_MEMBERSHIP: any = gql`
  mutation GetMembership($membership: MembershipTypes!) {
    startMembershipTransaction(membershipType: $membership) {
      id
      charged
      clientSecret
    }
  }
`;

const createOptions = (fontSize: string, padding?: string) => {
  return {
    style: {
      base: {
        fontSize,
        borderRadius: "20px",
        width: "100%",
        color: "#424770",
        letterSpacing: "0.025em",
        fontFamily: "Source Code Pro, monospace",
        "::placeholder": {
          color: "#aab7c4"
        },
        padding
      },
      invalid: {
        color: "#9e2146"
      }
    }
  };
};

const FormContainer: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;

  margin: 3rem 1rem 0 1rem;
`;

const ElementContainer: AnyStyledComponent = styled.div`
  width: 100%;
  input,
  .StripeElement {
    display: block;
    margin: 10px 0 20px 0;
    max-width: 500px;
    padding: 8px 12px;
    font-size: 1em;
    font-family: "Source Code Pro", monospace;
    box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
      rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
    border: 0;
    outline: 0;
    border-radius: 0.5rem;
    background: white;
  }
`;

const ErrorContainer: AnyStyledComponent = styled.div`
  display: flex;
  align-items: center;
  align-content: center;

  color: #f56565;
`;

interface ICheckoutFormProps {
  tag: MembershipTypes;
  onSuccess?: () => void;
}

type CheckoutProps = ReactStripeElements.InjectedStripeProps &
  ICheckoutFormProps;

type setString = React.Dispatch<React.SetStateAction<string>>;
type setBoolean = React.Dispatch<React.SetStateAction<boolean>>;

const CheckoutFormBase: React.FC<CheckoutProps> = (
  props: CheckoutProps
): JSX.Element => {
  const [cardElement, setCardElement] = useState<any>(undefined);
  const [intent, setIntent]: [string, setString] = useState<string>("");
  const [clientSecret, setClientSecret]: [string, setString] = useState<string>(
    ""
  );
  const [error, setError]: [string, setString] = useState<string>("");
  const [success, setSuccess]: [boolean, setBoolean] = useState<boolean>(false);
  const [loading, setLoading]: [boolean, setBoolean] = useState<boolean>(false);

  const [getMembership] = useGetMembershipMutation();

  const handleError: (message: string) => void = (message: string): void => {
    setLoading(false);
    setError(message);
  };

  const handleSubmit: (ev: React.FormEvent) => void = async (
    ev: React.FormEvent
  ): Promise<void> => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    setLoading(true);
    if (!props.stripe) {
      handleError("Stripe.js hasn't loaded yet.");
      return;
    }
    let secret: string = clientSecret;

    if (!secret) {
      let result: ExecutionResult<GetMembershipMutation>;
      try {
        result = await getMembership({
          variables: { membership: props.tag }
        });
      } catch (e) {
        handleError(e.message);
        return;
      }

      const data = result.data;

      if (!data) {
        if (result.errors) {
          handleError(result.errors[0].message || "Unknown Error occurred.");
        }

        return;
      }
      secret = data.startMembershipTransaction.clientSecret;
      setClientSecret(secret);
    }

    const response: stripe.PaymentIntentResponse = await props.stripe.handleCardPayment(
      secret,
      cardElement
    );

    if (response.error) {
      handleError(response.error.message || "Unknown error occurred");

      return;
    }

    if (!response.paymentIntent) {
      handleError("Unknown error occurred");

      return;
    }

    setIntent(response.paymentIntent.id);
    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    if (props.onSuccess) {
      props.onSuccess();
    }

    return (
      <Result
        status="success"
        title="Membership Added!"
        subTitle={`Your membership may take 1-5 minutes to show. ref: ${intent}`}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <label style={{ width: "100%", fontSize: "16px" }}>
          Card details
          <ElementContainer>
            <CardElement {...createOptions("18px")} onReady={setCardElement} />
          </ElementContainer>
        </label>
        {error !== "" && (
          <ErrorContainer>
            <IconContainer>
              <Icon
                name="alert-circle-outline"
                size="medium"
                fill="currentColor"
              />
            </IconContainer>
            <span style={{ marginLeft: ".5rem" }}>{error}</span>
          </ErrorContainer>
        )}
        <PrimaryButton
          loading={loading}
          disabled={loading}
          style={{ margin: "2rem auto" }}
        >
          Purchase
        </PrimaryButton>
      </FormContainer>
    </form>
  );
};

const InjectedCheckoutForm: React.ComponentType<CheckoutProps> = injectStripe(
  CheckoutFormBase
);

export const CheckoutForm: React.FC<ICheckoutFormProps> = (
  props: ICheckoutFormProps
): JSX.Element => {
  return (
    <Elements>
      <InjectedCheckoutForm {...props} />
    </Elements>
  );
};
