import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile/Profile";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/profile" component={Profile} />
        <Route exact path="/" component={Feed} />
        {/* <Route path="/"></Route> */}
      </Switch>
    </Router>
  );
}

export default App;
