import React from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";

// import { GlobalRoute } from "@/components/module/basic";

const LoadableIndex = Loadable({
  loader: () => import("@/pages/index"),
  loading: () => null,
});

export default function Routes() {
  return (
    <Switch>
      <Route path="/" component={LoadableIndex} />
    </Switch>
  );
}
