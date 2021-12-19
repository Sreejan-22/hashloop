import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Menu.css";
import { isAuthenticated, getUser } from "../../utils/auth";

const Menu = () => {
  const history = useHistory();

  return (
    <div className="feed-menu">
      <br />
      <br />
      <br />
      <div className="menu-items">
        <Link to="/" className="menu-item">
          <HomeIcon />
          &nbsp;&nbsp;<span>Feed</span>
        </Link>
        <Link to="/explore" className="menu-item">
          <ExploreIcon />
          &nbsp;&nbsp;<span>Explore</span>
        </Link>
        {isAuthenticated() && (
          <>
            <Link to={`/profile/${getUser().username}`} className="menu-item">
              <PersonIcon />
              &nbsp;&nbsp;<span>Profile</span>
            </Link>
            <div
              className="menu-item"
              onClick={() => {
                localStorage.removeItem("user");
                if (history.location.pathname === "/") {
                  window.location.reload();
                } else {
                  history.push("/");
                }
              }}
            >
              <LogoutIcon />
              &nbsp;&nbsp;<span>Logout</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
