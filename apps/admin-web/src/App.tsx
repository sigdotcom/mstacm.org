import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ToolList } from "./components/pages";
import { Events } from "./components/pages/tools";
import "./static/css/App.css";

localStorage.debug = "warden:*";

const App: React.SFC<{}> = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={ToolList} />
        <Route exact={true} path="/events" component={Events} />
      </Switch>
    </BrowserRouter>
  );
};

/*
 * Future Routes
        <Route exact={true} path="/membership" component={Membership} />
        <Route exact={true} path="/sigs" component={Sigs} />
        <Route exact={true} path="/sponsors" component={Sponsors} />
        <Route exact={true} path="/products" component={Products} />
*/

export { App };
