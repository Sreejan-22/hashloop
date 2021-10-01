import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Feed from "./pages/Feed/Feed";
import Profile from "./pages/Profile/Profile";
import SingleProject from "./pages/SingleProject/SingleProject";
import Saved from "./pages/Saved/Saved";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/profile" component={Profile} />
        <Route path="/projects" component={SingleProject} />
        <Route path="/saved" component={Saved} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Feed} />
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
