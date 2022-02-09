import gql from "graphql-tag";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReactGA from 'react-ga';

import { config } from "./config";
import { HomePage, NotFoundPage, EventRegistration } from "./screens";
import { useAuth0 } from "@auth0/auth0-react";

import "./static/css/App.css";

export const REDEEM_MEMBERSHIP: any = gql`
  mutation RedeemRedemptionCode($code: String!) {
    redeemRedemptionCode(redemptionCode: $code) {
      id
      redeemed
    }
  }
`;

if (process.env.NODE_ENV === "production") {

  ReactGA.initialize('UA-105827065-1');
  ReactGA.pageview(window.location.pathname + window.location.search);
}


const App: React.FC<{}> = (): JSX.Element => {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isLoading || !isAuthenticated) {
      return;
    }

    const setToken: () => void = async (): Promise<void> => {
      const token: string = (await getAccessTokenSilently()) || "";
      localStorage.setItem(config.ACCESS_TOKEN_KEY, token);
    };

    setToken();
  }, [isLoading, isAuthenticated, getAccessTokenSilently]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <Route path="/e/:eventId" component={EventRegistration} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export { App };
