import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Feed from "./pages/Feed/Feed";
import Profile from "./pages/Profile/Profile";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/profile" component={Profile} />
        <Route path="/error" component={Profile}></Route>
        <Route exact path="/" component={Feed} />
      </Switch>
    </Router>
  );
}

export default App;
