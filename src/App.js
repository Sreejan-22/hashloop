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
import SingleProject from "./pages/SingleProject/ProjectWithComments";
import Create from "./pages/Create/Create";
import Edit from "./pages/Edit/Edit";
import ExploreAll from "./pages/ExploreAll/ExploreAll";
import Saved from "./pages/Saved/Saved";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { isAuthenticated } from "./utils/auth";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route path="/signup">
          {isAuthenticated() ? <Redirect to="/" /> : <Signup />}
        </Route>
        <Route path="/login">
          {isAuthenticated() ? <Redirect to="/" /> : <Login />}
        </Route>
        <PrivateRoute path="/profile/:username" component={Profile} />
        <PrivateRoute path="/projects/:id" component={SingleProject} />
        <PrivateRoute path="/create" component={Create} />
        <PrivateRoute path="/edit/:id" component={Edit} />
        <PrivateRoute path="/explore" component={ExploreAll} />
        <PrivateRoute path="/saved" component={Saved} />
        <PrivateRoute exact path="/" component={Feed} />
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
