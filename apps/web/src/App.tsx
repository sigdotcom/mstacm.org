import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { HomePage, NotFoundPage } from "./components/pages";
import "./static/css/App.css";

localStorage.debug = "oasis:*";

const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export { App };
