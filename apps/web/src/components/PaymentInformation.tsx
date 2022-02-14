// PaymentInformation.js
import React, { useState } from "react";

import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  ReactStripeElements
} from "react-stripe-elements";
import styled, { AnyStyledComponent } from "styled-components";

import { config } from "../config";
import { PrimaryButton } from "./PrimaryButton";

const defaultColor = "#c4c4c4";
const inProgressColor = "#525252";
const errorColor = "red";
const completeColor = "#42c0fc";

const inputOptions = {
  style: {
    base: {
      fontSize: "18px",
      fontWeight: "800",
      color: "#000000",
      letterSpacing: "0.025em",
      fontFamily: "Source Code Pro, monospace",
      "::placeholder": {
        color: "#a4a4a4"
      }
    },
    invalid: {
      color: errorColor
    }
  }
};

const Header: AnyStyledComponent = styled.h2`
  color: black;
  text-align: left;
  font-size: 1.375rem;
  font-weight: 700;
  margin: 0;
  padding-right: 5rem;
  line-height: 23px;
`;

const FormContainer: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 244px;

  .StripeElement {
    display: block;
    height: 35px;
    max-width: 500px;
    padding-top: 5px;
    padding-left: 20px;
    background: white;
    border: 0;
    outline: 0;
    border-bottom: 2px solid ${defaultColor};
    border-radius: 4px;
    transition: .2s ease-in-out border-bottom-color;
  }
`;

const CardNumberElementContainer: AnyStyledComponent = styled.div`
  position: relative;
  width: 100%;
  cursor: text;
  margin-top: .5rem;

  .StripeElement {
    border-bottom-color: ${props => props.color};
  }
`;

const StripeSVG: AnyStyledComponent = styled.img`
  position: absolute;
  width: 95px;
  height: 21px;
  top: 8px;
  right: 0;
  background: #C4C4C4;
  border-radius: 4px;
`;

const ExpiryCvcFlexbox: AnyStyledComponent = styled.div`
  display: flex;
  margin-bottom: 1rem;
  width: 100%;
`;

const CardExpiryElementContainer: AnyStyledComponent = styled.div`
  width: 100%;
  margin-right: 2rem;

  .StripeElement {
    border-bottom-color: ${props => props.color};
  }
`;

const CardCVCElementContainer: AnyStyledComponent = styled.div`
  width: 75%;

  .StripeElement {
    border-bottom-color: ${props => props.color};
  }
`;

const CardElementLabel: AnyStyledComponent = styled.label`
  display: inline-block;
  font-weight: bold;
  color: #545454;
  margin-top: .8rem;
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

const CancelButton: AnyStyledComponent = styled.input`
  background: none;
  color: #909090;
  border: none;
  font-size: 18px;
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

const ReviewButton: AnyStyledComponent = styled(PrimaryButton)`
  font-size: 18px;
  font-weight: 800;
  height: 2.5rem;
  padding: 0 1.5rem;
`;

type FormProps = React.HTMLAttributes<HTMLDivElement> & {
  stripe: ReactStripeElements.StripeProps | null;
  setPaymentMethod: setPaymentMethod;
  getClientSecret: () => Promise<string>;
  handleError: (message: string) => void;
  resetForm: () => Promise<void>;
  nextModal: () => void;
  clientSecret: string;
};

type setBoolean = React.Dispatch<React.SetStateAction<boolean>>;
type setPaymentMethod = React.Dispatch<React.SetStateAction<stripe.paymentMethod.PaymentMethod | undefined>>;

export const PaymentInformationForm: React.FC<FormProps> = (
  props: FormProps
): JSX.Element => {
  const [cardNumberElement, setCardNumberElement] = useState<any>(undefined);
  const [, setCardExpiryElement] = useState<any>(undefined);
  const [, setCardCvcElement] = useState<any>(undefined);
  const [cardNumberElementColor, setCardNumberElementColor] = useState<String>(defaultColor);
  const [cardExpiryElementColor, setCardExpiryElementColor] = useState<String>(defaultColor);
  const [cardCvcElementColor, setCardCvcElementColor] = useState<String>(defaultColor);

  const [loading, setLoading]: [boolean, setBoolean] = useState<boolean>(false);

  const handleChange = (ev: stripe.elements.ElementChangeResponse): void => {
    let color = inProgressColor;

    if (ev.error) {
      color = errorColor;
    } else if (ev.complete) {
      color = completeColor;
    }

    if (ev.elementType === "cardNumber" && color !== cardNumberElementColor) {
      setCardNumberElementColor(color);
    } else if (ev.elementType === "cardExpiry" && color !== cardExpiryElementColor) {
      setCardExpiryElementColor(color);
    } else if (ev.elementType === "cardCvc" && color !== cardCvcElementColor) {
      setCardCvcElementColor(color);
    }
  }

  const handleBlur = (ev: stripe.elements.ElementChangeResponse): void => {
    if (ev.elementType === "cardNumber" &&
      cardNumberElementColor !== errorColor &&
      cardNumberElementColor !== completeColor &&
      cardNumberElementColor !== defaultColor) {
      setCardNumberElementColor(defaultColor);
    } else if (ev.elementType === "cardExpiry" &&
      cardExpiryElementColor !== errorColor &&
      cardExpiryElementColor !== completeColor &&
      cardExpiryElementColor !== defaultColor) {
      setCardExpiryElementColor(defaultColor);
    } else if (ev.elementType === "cardCvc" &&
      cardCvcElementColor !== errorColor &&
      cardCvcElementColor !== completeColor &&
      cardCvcElementColor !== defaultColor) {
      setCardCvcElementColor(defaultColor);
    }
  }

  const handleFocus = (ev: stripe.elements.ElementChangeResponse): void => {
    if (ev.elementType === "cardNumber" &&
      cardNumberElementColor !== errorColor &&
      cardNumberElementColor !== completeColor) {
      setCardNumberElementColor(inProgressColor);
    } else if (ev.elementType === "cardExpiry" &&
      cardExpiryElementColor !== errorColor &&
      cardExpiryElementColor !== completeColor) {
      setCardExpiryElementColor(inProgressColor);
    } else if (ev.elementType === "cardCvc" &&
      cardCvcElementColor !== errorColor &&
      cardCvcElementColor !== completeColor) {
      setCardCvcElementColor(inProgressColor);
    }
  }

  const handleSubmit: (ev: React.FormEvent) => void = async (
    ev: React.FormEvent
  ): Promise<void> => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    if (!props.stripe) {
      props.handleError("Stripe.js hasn't loaded yet.");
      return;
    }

    if (cardNumberElementColor !== completeColor) {
      setCardNumberElementColor(errorColor);
      return;
    }

    if (cardExpiryElementColor !== completeColor) {
      setCardExpiryElementColor(errorColor);
      return;
    }

    if (cardCvcElementColor !== completeColor) {
      setCardCvcElementColor(errorColor);
      return;
    }
    setLoading(true);

    let { clientSecret } = props;
    if (!clientSecret) {
      clientSecret = await props.getClientSecret()
      if (!clientSecret) {
        setLoading(false);
        return;
      }
    }

    const { paymentMethod, error }: stripe.PaymentMethodResponse = await props.stripe.createPaymentMethod({
      type: 'card',
      card: cardNumberElement
    });

    if (error) {
      setLoading(false);
      props.handleError(error.message || "Unknown error occurred");
      return;
    }

    if (!paymentMethod) {
      setLoading(false);
      props.handleError("Unknown error occurred");
      return;
    }

    setLoading(false);
    props.setPaymentMethod(paymentMethod);
    props.nextModal();
  };

  return (
    <form onSubmit={handleSubmit} onReset={props.resetForm}>
      <FormContainer>
        <Header>Payment Information</Header>
        <CardNumberElementContainer color={cardNumberElementColor}>
          <CardElementLabel>Card Number</CardElementLabel>
          <StripeSVG src={`${config.CDN_URI}/static/stripe-badge.png`} alt="Stripe" />
          <CardNumberElement
            {...inputOptions}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onReady={setCardNumberElement}
          />
        </CardNumberElementContainer>
        <ExpiryCvcFlexbox>
          <CardExpiryElementContainer color={cardExpiryElementColor}>
            <CardElementLabel>Expiration Date</CardElementLabel>
            <CardExpiryElement
              {...inputOptions}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onReady={setCardExpiryElement}
            />
          </CardExpiryElementContainer>
          <CardCVCElementContainer color={cardCvcElementColor}>
            <CardElementLabel>Security Code</CardElementLabel>
            <CardCVCElement
              {...inputOptions}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onReady={setCardCvcElement}
            />
          </CardCVCElementContainer>
        </ExpiryCvcFlexbox>
        {props.children}
        <Buttons>
          <LineBreak />
          <CancelButton
            type="reset"
            value="Cancel"
            disabled={loading}
          />
          <ReviewButton
            loading={loading}
            disabled={loading}
          >
            Review
          </ReviewButton>
        </Buttons>
      </FormContainer>
    </form >
  );
};
