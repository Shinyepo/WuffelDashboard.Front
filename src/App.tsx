import React, { ComponentClass, FC } from "react";
import "./App.css";
import { Route, Router, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { createBrowserHistory } from "history";
import { NoMatch } from "./pages/NoMatch";
import { Dashboard } from "./pages/Dashboard";

interface Props {
  Component?: ComponentClass;
  pageProps?: Object;
}
const history = createBrowserHistory();

const App: FC<Props> = ({ Component, pageProps }) => {

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/dashboard/:id?" component={Dashboard} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
};

export default App;
