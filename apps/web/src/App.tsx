import gql from "graphql-tag";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { config } from "./config";
import { HomePage, NotFoundPage, EventRegistration } from "./screens";
import { useAuth0 } from "./utils/react-auth0-wrapper";

import "./static/css/App.css";

export const REDEEM_MEMBERSHIP: any = gql`
  mutation RedeemRedemptionCode($code: String!) {
    redeemRedemptionCode(redemptionCode: $code) {
      id
      redeemed
    }
  }
`;

const App: React.FC<{}> = (): JSX.Element => {
  const { loading, isAuthenticated, getTokenSilently } = useAuth0();

  useEffect(() => {
    if (loading || !isAuthenticated) {
      return;
    }

    const setToken: () => void = async (): Promise<void> => {
      const token: string = (await getTokenSilently()) || "";
      localStorage.setItem(config.ACCESS_TOKEN_KEY, token);
    };

    setToken();
  }, [loading, isAuthenticated, getTokenSilently]);

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
