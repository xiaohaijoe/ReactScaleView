import Loadable from "react-loadable";
import { Route, Switch } from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";

const LoadableIndex = Loadable({
  loader: () => import("./pages/index"),
  loading: () => null,
});

function App() {
  return (
    <Switch>
      <Route path="/" component={LoadableIndex}></Route>
    </Switch>
  );
}

export default App;
