import React from "react";
import { Route, Switch } from "react-router-dom";
import { Events } from "src/components/pages/tools/Events";
import { Membership } from "src/components/pages/tools/Membership";

const NotFound: React.FC<{}> = (): JSX.Element => {
  return <h1>You are lost!</h1>;
};

const Main: React.SFC<{}> = (): JSX.Element => {
  return (
    <Switch>
      <Route exact={true} path="/" component={Events} />
      <Route path="/events" component={Events} />
      <Route path="/membership" component={Membership} />
      {/* <Route path="/redemption" component={RedemptionCodes} /> */}
      <Route component={NotFound} />
    </Switch>
  );
};

export default Main;
