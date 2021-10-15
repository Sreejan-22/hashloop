import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import BookmarkIcon from "@mui/icons-material/Bookmark";
// import NotificationsIcon from "@mui/icons-material/Notifications";
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
          &nbsp;&nbsp;Feed
        </Link>
        <Link to="/explore" className="menu-item">
          <ExploreIcon />
          &nbsp;&nbsp;Explore
        </Link>
        {isAuthenticated() && (
          <>
            <Link to={`/profile/${getUser().username}`} className="menu-item">
              <PersonIcon />
              &nbsp;&nbsp;Profile
            </Link>
            <Link to="/saved" className="menu-item">
              <BookmarkIcon />
              &nbsp;&nbsp;Saved
            </Link>
            {/* <Link
              to="/notifications"
              className="menu-item"
            >
              <NotificationsIcon />
              &nbsp;&nbsp;Notifications
            </Link> */}
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
              &nbsp;&nbsp;Logout
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
