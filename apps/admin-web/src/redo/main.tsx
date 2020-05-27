import React from "react";
import { Route, Switch } from "react-router-dom";
import { Upcoming } from "src/screens/Events/Upcoming";
import { Previous } from "src/screens/Events/Previous";
import { Membership } from "src/screens/Membership";
import { ToolList } from "src/Tools";
// import { Event } from "./Eventss";
import { RedemptionCodes } from "src/screens/RedemptionCodes";

const NotFound: React.FC<{}> = (): JSX.Element => {
  return <h1>You are lost!</h1>;
};

const Main: React.SFC<{}> = (): JSX.Element => {
  return (
    <Switch>
      <Route exact={true} path="/" component={ToolList} />
      <Route path="/events/upcoming" component={Upcoming} />
      <Route path="/events/previous" component={Previous} />
      <Route path="/membership" component={Membership} />
      <Route path="/redemption" component={RedemptionCodes} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Main;
