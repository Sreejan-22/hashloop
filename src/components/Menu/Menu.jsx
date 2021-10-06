import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./Menu.css";

const Menu = () => {
  const history = useHistory();
  const [active, setActive] = useState("feed");

  useEffect(() => {
    if (history.location.pathname === "/") {
      setActive("feed");
    }
    if (history.location.pathname.includes("/explore")) {
      setActive("explore");
    }
    if (history.location.pathname.includes("/profile")) {
      setActive("profile");
    }
    if (history.location.pathname.includes("/saved")) {
      setActive("saved");
    }
    if (history.location.pathname.includes("/notifications")) {
      setActive("notifications");
    }
  }, [history.location.pathname]);

  return (
    <div className="feed-menu">
      <br />
      <br />
      <br />
      <div className="menu-items">
        <Link
          to="/"
          className={`menu-item ${active === "feed" ? "active-menu-item" : ""}`}
        >
          <HomeIcon />
          &nbsp;&nbsp;Feed
        </Link>
        <Link
          to="/explore"
          className={`menu-item ${
            active === "explore" ? "active-menu-item" : ""
          }`}
        >
          <ExploreIcon />
          &nbsp;&nbsp;Explore
        </Link>
        {localStorage.getItem("user") && (
          <>
            <Link
              to="/profile"
              className={`menu-item ${
                active === "profile" ? "active-menu-item" : ""
              }`}
            >
              <PersonIcon />
              &nbsp;&nbsp;Profile
            </Link>
            <Link
              to="/saved"
              className={`menu-item ${
                active === "saved" ? "active-menu-item" : ""
              }`}
            >
              <BookmarkIcon />
              &nbsp;&nbsp;Saved
            </Link>
            <Link
              to="/notifications"
              className={`menu-item ${
                active === "notifications" ? "active-menu-item" : ""
              }`}
            >
              <NotificationsIcon />
              &nbsp;&nbsp;Notifications
            </Link>
            <div
              className={`menu-item ${
                active === "logout" ? "active-menu-item" : ""
              }`}
              onClick={() => {
                setActive("logout");
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
