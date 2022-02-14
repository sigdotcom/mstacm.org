// CheckoutForm.js
import { Result } from "antd";
import gql from "graphql-tag";
import React, { useState } from "react";
import Icon from "react-eva-icons";

import { ExecutionResult } from "@apollo/react-common";
import {
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
import { PaymentInformationForm } from "./PaymentInformation";
import { ReviewInformationForm } from "./ReviewInformation";
import { IconContainer } from "./IconContainer";
import { ModalWrapper } from "./ModalWrapper";

export const GET_MEMBERSHIP: any = gql`
  mutation GetMembership($membershipType: MembershipTypes!) {
    startMembershipTransaction(membershipType: $membershipType) {
      id
      charged
      clientSecret
    }
  }
`;

const ErrorContainer: AnyStyledComponent = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  margin-bottom: .5rem;

  color: #f56565;
`;

interface ICheckoutFormProps {
  onSuccess?: () => void;
  removeTag: () => void;
  tag: MembershipTypes;
}

type CheckoutFormProps = ReactStripeElements.InjectedStripeProps &
  ICheckoutFormProps;

type setString = React.Dispatch<React.SetStateAction<string>>;
type setNumber = React.Dispatch<React.SetStateAction<number>>;
type setPaymentMethod = React.Dispatch<React.SetStateAction<stripe.paymentMethod.PaymentMethod | undefined>>;
type voidFunction = () => void;
type asyncVoidFunction = () => Promise<void>;

const CheckoutFormBase: React.FC<CheckoutFormProps> = (
  props: CheckoutFormProps
): JSX.Element => {
  // const [intent, setIntent]: [string, setString] = useState<string>("");
  const [paymentMethod, setPaymentMethod]: [stripe.paymentMethod.PaymentMethod | undefined, setPaymentMethod] = useState<stripe.paymentMethod.PaymentMethod | undefined>(undefined);
  const [clientSecret, setClientSecret]: [string, setString] = useState<string>("");
  const [error, setError]: [string, setString] = useState<string>("");
  const [index, setIndex]: [number, setNumber] = useState<number>(0);

  const [getMembership] = useGetMembershipMutation();

  const handleError: (message: string) => void = (message: string): void => {
    setPaymentMethod(undefined);
    setError(message);
    setIndex(0);
  };

  const resetForm: asyncVoidFunction = async (): Promise<void> => {
    props.removeTag();
    setPaymentMethod(undefined);
    setClientSecret("");
    setTimeout(() => {
      setIndex(0);
      setError("");
    }, 400);
  }

  const nextModal: voidFunction = (): void => {
    setIndex(index + 1);
  }

  const prevModal: voidFunction = (): void => {
    setIndex(index - 1);
  }

  const getClientSecret: () => Promise<string> = async (): Promise<string> => {
    let result: ExecutionResult<GetMembershipMutation>;
    try {
      result = await getMembership({
        variables: { membershipType: props.tag }
      });
    } catch (e) {
      if (e instanceof Error) handleError(e.message);
      return "";
    }
    const { data } = result;

    if (!data) {
      if (result.errors)
        handleError(result.errors[0].message || "Unknown Error occurred.");

      return "";
    }
    const newClientSecret = data.startMembershipTransaction.clientSecret;
    setClientSecret(newClientSecret);
    return newClientSecret;
  };

  const slides = [
    <ModalWrapper
      resetForm={resetForm}
      tag={props.tag}
    >
      <PaymentInformationForm
        stripe={props.stripe}
        setPaymentMethod={setPaymentMethod}
        getClientSecret={getClientSecret}
        handleError={handleError}
        resetForm={resetForm}
        nextModal={nextModal}
        clientSecret={clientSecret}
      >
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
      </PaymentInformationForm>
    </ModalWrapper>,
    <ModalWrapper
      resetForm={resetForm}
      tag={props.tag}
    >
      <ReviewInformationForm
        stripe={props.stripe}
        handleError={handleError}
        // setIntent={setIntent}
        nextModal={nextModal}
        prevModal={prevModal}
        paymentMethod={paymentMethod!}
        clientSecret={clientSecret}
        tag={props.tag}
      />
    </ModalWrapper>,
    <ModalWrapper
      resetForm={resetForm}
      tag={props.tag}
    >
      <Result
        status="success"
        title="Membership Added!"
        subTitle="Your membership may take 1-5 minutes to show."
      />
    </ModalWrapper>
  ]

  return (
    slides[index]
  );
};

const InjectedCheckoutForm: React.ComponentType<ICheckoutFormProps> = injectStripe(
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
