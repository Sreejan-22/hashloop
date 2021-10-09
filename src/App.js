import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Feed from "./pages/Feed/Feed";
import Profile from "./pages/Profile/Profile";
import SingleProject from "./pages/SingleProject/SingleProject";
import Create from "./pages/Create/Create";
import Explore from "./pages/Explore/Explore";
import ExploreAll from "./pages/ExploreAll/ExploreAll";
import Saved from "./pages/Saved/Saved";
import Notifications from "./pages/Notifications/Notifications";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import "./App.css";
import { isAuthenticated } from "./utils/auth";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signup">
          {isAuthenticated() ? <Redirect to="/" /> : <Signup />}
        </Route>
        <Route path="/login">
          {isAuthenticated() ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/profile" component={Profile} />
        <Route path="/projects" component={SingleProject} />
        <PrivateRoute path="/create" component={Create} />
        <Route path="/tags" component={Explore} />
        <Route path="/explore" component={ExploreAll} />
        <PrivateRoute path="/saved" component={Saved} />
        <PrivateRoute path="/notifications" component={Notifications} />
        <Route exact path="/" component={Feed} />
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
