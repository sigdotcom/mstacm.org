// PaymentInformation.js
import React, { useState } from "react";

import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  ReactStripeElements
} from "react-stripe-elements";
import styled, { AnyStyledComponent } from "styled-components";

import { PrimaryButton } from "./PrimaryButton";

const defaultColor = "#c4c4c4";
const inProgressColor = "#525252";
const errorColor = "red";
const completeColor = "#42c0fc";

const createOptions = (fontSize: string, padding?: string) => {
  return {
    style: {
      base: {
        fontSize,
        fontWeight: "800",
        color: "#000000",
        letterSpacing: "0.025em",
        fontFamily: "Source Code Pro, monospace",
        "::placeholder": {
          color: "#a4a4a4"
        },
        padding
      },
      invalid: {
        color: errorColor
      }
    }
  };
};

const Header: AnyStyledComponent = styled.h2`
  color: black;
  text-align: left;
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  padding-right: 4rem;
`;

const FormContainer: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 280px;

  .StripeElement {
    display: block;
    height: 50px;
    max-width: 500px;
    padding: 11px 26px;
    font-size: 18px;
    font-family: "Source Code Pro", monospace;
    background: white;
    border: 0;
    outline: 0;
    border-bottom: 4px solid ${defaultColor};
    border-radius: 4px;
    transition: .2s ease-in-out border-bottom-color;
  }
`;

const CardNumberElementContainer: AnyStyledComponent = styled.div`
  width: 100%;
  cursor: text;

  .StripeElement {
    border-bottom-color: ${props => props.color};
  }
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

const ReviewButton: AnyStyledComponent = styled(PrimaryButton)`
  margin: 1rem auto .5rem;
  font-size: 18px;
  font-weigth: 800;
`;

type FormProps = React.HTMLAttributes<HTMLDivElement> & {
  stripe: ReactStripeElements.StripeProps | null;
  setPaymentMethod: setPaymentMethod;
  getClientSecret: () => Promise<string>;
  handleError: (message: string) => void;
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

  const [shake, setShake]: [boolean, setBoolean] = useState<boolean>(false);
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

    if (cardNumberElementColor !== completeColor ||
      cardExpiryElementColor !== completeColor ||
      cardCvcElementColor !== completeColor) {
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }
    setLoading(true);

    let clientSecret = props.clientSecret;
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
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <Header>Payment Information</Header>
        <CardNumberElementContainer color={cardNumberElementColor}>
          <CardElementLabel>Card Number</CardElementLabel>
          <CardNumberElement
            {...createOptions("18px")}
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
              {...createOptions("18px")}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onReady={setCardExpiryElement}
            />
          </CardExpiryElementContainer>
          <CardCVCElementContainer color={cardCvcElementColor}>
            <CardElementLabel>Security Code</CardElementLabel>
            <CardCVCElement
              {...createOptions("18px")}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onReady={setCardCvcElement}
            />
          </CardCVCElementContainer>
        </ExpiryCvcFlexbox>
        {props.children}
        <ReviewButton
          loading={loading}
          disabled={loading || shake}
          shake={shake}
        >
          REVIEW
        </ReviewButton>
      </FormContainer>
    </form >
  );
};
