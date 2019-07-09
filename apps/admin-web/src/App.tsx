import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ToolList } from "./components/pages";
import {
  Events,
  Membership,
  Products,
  Sigs,
  Sponsors
} from "./components/pages/tools";
import "./static/css/App.css";

localStorage.debug = "warden:*";

const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={ToolList} />
        <Route exact={true} path="/membership" component={Membership} />
        <Route exact={true} path="/events" component={Events} />
        <Route exact={true} path="/sigs" component={Sigs} />
        <Route exact={true} path="/sponsors" component={Sponsors} />
        <Route exact={true} path="/products" component={Products} />
      </Switch>
    </BrowserRouter>
  );
};

export { App };
