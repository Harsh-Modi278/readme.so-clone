import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Editor from "../pages/Editor";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/editor" component={Editor} />
    </Switch>
  );
};

export default Main;
