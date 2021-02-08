import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Loadable from "react-loadable";

// import { GlobalRoute } from '@/components/module/basic';

// const LoadableDemo = Loadable({
//   loader: () => import('@/pages/Demo'),
//   loading: () => null,
// });

const LoadableDemo = Loadable({
  loader: () => import("@/pages/Demo"),
  loading: () => null,
});

// const LoadableLogin = Loadable({
//   loader: () => import('@/pages/Login'),
//   loading: () => null,
// });

export default function Index() {
  return (
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/demo" />} />
      <Route path="/demo" component={LoadableDemo} />
    </Switch>
  );
}
