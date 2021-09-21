import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./Menu.css";

const Menu = () => {
  return (
    <div className="feed-menu">
      <br />
      <br />
      <br />
      <div className="menu-items">
        <div className="menu-item active-menu-item">
          <HomeIcon />
          &nbsp;&nbsp;Feed
        </div>
        <div className="menu-item">
          <ExploreIcon />
          &nbsp;&nbsp;Explore
        </div>
        <div className="menu-item">
          <PersonIcon />
          &nbsp;&nbsp;Profile
        </div>
        <div className="menu-item">
          <BookmarkIcon />
          &nbsp;&nbsp;Saved
        </div>
        <div className="menu-item">
          <NotificationsIcon />
          &nbsp;&nbsp;Notifications
        </div>
        <div className="menu-item">
          <PersonIcon />
          &nbsp;&nbsp;Logout
        </div>
      </div>
    </div>
  );
};

export default Menu;
