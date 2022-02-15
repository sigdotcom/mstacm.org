import React, { useEffect } from "react";
import styled from "styled-components";

import { toast } from "react-toastify";

import { useAuth0 } from "@auth0/auth0-react";
import { config } from "../../config";
import { RedeemRedemptionCodeDocument } from "../../graphql-operations";
import { useMutation } from "@apollo/client";

import { Toast } from "../../components/Toast";
import { Events } from "./sections/Events";
import { Footer } from "./sections/Footer";
import Hero from "./sections/Hero";
import { Membership } from "./sections/Membership";
import { Nav } from "./sections/Nav";
import { ResumeBanner } from "./sections/ResumeBanner";
import { SIGs } from "./sections/SIGs";
import { Sponsors } from "./sections/Sponsors";

const NavHeroWrapper = styled.div`
  height: 100vh;
  background: #f4f5f8;
  display: flex;
  flex-direction: column;
  max-height: 1000px;
  position: relative;
  overflow: hidden;

  @media screen and (min-height: 1000px) {
    height: 600px;
  }
`;

const HomePage: React.FC = () => {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
  const [redeemCode] = useMutation(RedeemRedemptionCodeDocument);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const queryParams: URLSearchParams = new URLSearchParams(
      window.location.search
    );
    const redemptionCode: string | null = queryParams.get(
      config.REDEMPTION_QUERY_PARAM_KEY
    );
    const storedCode: string | null = localStorage.getItem(
      config.REDEMPTION_CODE_KEY
    );

    if (!redemptionCode && !storedCode) {
      return;
    }

    if (!isAuthenticated) {
      if (redemptionCode) {
        localStorage.setItem(config.REDEMPTION_CODE_KEY, redemptionCode);
      }

      const login: () => void = async (): Promise<void> => {
        await loginWithRedirect({});
      };
      login();
      return;
    }

    const runRedeemCode: (code: string) => void = async (
      code: string
    ): Promise<void> => {
      try {
        const { data } = await redeemCode({
          variables: { code }
        });

        if (data?.redeemRedemptionCode.redeemed === true) {
          toast(
            <Toast
              iconName={"alert-circle-outline"}
              message={
                "Success! Redemption code applied to your account. Please refresh to see changes."
              }
              fill={"green"}
            />
          );
          queryParams.delete(config.REDEMPTION_QUERY_PARAM_KEY);
          // history.push(`/?${queryParams.toString()}`);

          localStorage.removeItem(config.REDEMPTION_CODE_KEY);
        } else {
          toast(
            <Toast
              iconName={"alert-circle-outline"}
              message={"Unexpected error occurred."}
              fill={"red"}
            />
          );
          return;
        }
      } catch (e) {
        if (e instanceof Error) {
          if (e.message.includes("expired")) {
            localStorage.removeItem(config.REDEMPTION_CODE_KEY);
          }
          toast(
            <Toast
              iconName={"alert-circle-outline"}
              message={e.message}
              fill={"red"}
            />
          );
        }
        // TODO: what do we do if e isn't Error?
      }
    };

    // Because of the !code && !storedCode, we know at least one must
    // be valid
    runRedeemCode(redemptionCode || (storedCode as string));
  }, [isLoading, isAuthenticated, loginWithRedirect, redeemCode]);

  return (
    <div>
      <ResumeBanner />
      <NavHeroWrapper>
        <Nav />
        <Hero />
      </NavHeroWrapper>
      <SIGs />
      <Events />
      <Membership />
      <Sponsors />
      <Footer />
    </div>
  );
};

export { HomePage };
