import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loadable from "react-loadable";

const LoadableDemo = new Loadable({
  loader: () => import("./Demo"),
  loading: () => null,
});
const Index = () => {
  return (
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/demo" />}></Route>
      <Route path="/demo" component={LoadableDemo}></Route>
    </Switch>
  );
};
export default Index;
