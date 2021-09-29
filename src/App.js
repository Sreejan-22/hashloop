import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Feed from "./pages/Feed/Feed";
import Profile from "./pages/Profile/Profile";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/profile" component={Profile} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/" component={Feed} />
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
