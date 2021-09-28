import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./Menu.css";

const Menu = () => {
  const [active, setActive] = useState("feed");

  return (
    <div className="feed-menu">
      <br />
      <br />
      <br />
      <div className="menu-items">
        <div
          className={`menu-item ${active === "feed" ? "active-menu-item" : ""}`}
          onClick={() => setActive("feed")}
        >
          <HomeIcon />
          &nbsp;&nbsp;Feed
        </div>
        <div
          className={`menu-item ${
            active === "explore" ? "active-menu-item" : ""
          }`}
          onClick={() => setActive("explore")}
        >
          <ExploreIcon />
          &nbsp;&nbsp;Explore
        </div>
        <div
          className={`menu-item ${
            active === "profile" ? "active-menu-item" : ""
          }`}
          onClick={() => setActive("profile")}
        >
          <PersonIcon />
          &nbsp;&nbsp;Profile
        </div>
        <div
          className={`menu-item ${
            active === "saved" ? "active-menu-item" : ""
          }`}
          onClick={() => setActive("saved")}
        >
          <BookmarkIcon />
          &nbsp;&nbsp;Saved
        </div>
        <div
          className={`menu-item ${
            active === "notifications" ? "active-menu-item" : ""
          }`}
          onClick={() => setActive("notifications")}
        >
          <NotificationsIcon />
          &nbsp;&nbsp;Notifications
        </div>
        <div
          className={`menu-item ${
            active === "logout" ? "active-menu-item" : ""
          }`}
          onClick={() => setActive("logout")}
        >
          <LogoutIcon />
          &nbsp;&nbsp;Logout
        </div>
      </div>
    </div>
  );
};

export default Menu;
