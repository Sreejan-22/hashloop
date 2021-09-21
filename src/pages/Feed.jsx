import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import {
  BiUpvote,
  BiCommentDetail,
  BiShareAlt,
  BiBookmark,
  BiSearch,
} from "react-icons/bi";
import ExploreIcon from "@mui/icons-material/Explore";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import NotificationsIcon from "@mui/icons-material/Notifications";

import profile from "../assets/profile.png";
import project from "../assets/project.png";
import trending from "../assets/trending.png";
import "./Feed.css";

const Feed = () => {
  return (
    <div className="feed">
      <div className="feed-left-container">
        <div className="feed-left">
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
        </div>
      </div>
      <div className="feed-content-container">
        <div className="feed-header">
          <HomeIcon />
          &nbsp;&nbsp;
          <span>Feed</span>
        </div>
        <button className="new-project-btn">
          <span>
            <AddCircleOutlineIcon />
          </span>
          <span>&nbsp;&nbsp;New Project</span>
        </button>
        <div className="feed-content">
          <div className="project">
            <div className="project-header">
              <img src={profile} alt="" className="profile-img" />
              <div className="project-header-child">
                <div>
                  Mahesh Sharma &#8226; <span>21/03/21</span>
                </div>
                <div>
                  <span>React / Vue Developer</span>
                </div>
              </div>
              <MoreVertIcon />
            </div>
            <div className="project-desc">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta ea
              fuga laboriosam labore blanditiis, dolor animi voluptatem. Nihil
              corrupti dolorem, rem tempore eum error, quo enim veritatis,
              mollitia animi adipisci.
            </div>
            <div className="project-tags">
              <button className="project-tag">React</button>
              <button className="project-tag">Material UI</button>
              <button className="project-tag">Node</button>
            </div>
            <div className="project-links">
              <a href="">View Live</a>&nbsp;&nbsp;&nbsp;
              <a href="">View Source</a>
            </div>
            <img src={project} alt="" className="project-img" />
            <div className="project-options">
              <span>
                <BiUpvote />
                &nbsp; <span className="upvotes">123</span>
              </span>
              <BiCommentDetail />
              <BiShareAlt />
              <BiBookmark />
            </div>
          </div>
          <div className="project">
            <div className="project-header">
              <img src={profile} alt="" className="profile-img" />
              <div className="project-header-child">
                <div>
                  Mahesh Sharma &#8226; <span>21/03/21</span>
                </div>
                <div>
                  <span>React / Vue Developer</span>
                </div>
              </div>
              <MoreVertIcon />
            </div>
            <div className="project-desc">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta ea
              fuga laboriosam labore blanditiis, dolor animi voluptatem. Nihil
              corrupti dolorem, rem tempore eum error, quo enim veritatis,
              mollitia animi adipisci.
            </div>
            <div className="project-tags">
              <button className="project-tag">React</button>
              <button className="project-tag">Material UI</button>
              <button className="project-tag">Node</button>
            </div>
            <div className="project-links">
              <a href="">View Live</a>&nbsp;&nbsp;&nbsp;
              <a href="">View Source</a>
            </div>
            <img src={project} alt="" className="project-img" />
            <div className="project-options">
              <span>
                <BiUpvote /> &nbsp; <span className="upvotes">123</span>
              </span>
              <BiCommentDetail />
              <BiShareAlt />
              <BiBookmark />
            </div>
          </div>
        </div>
      </div>
      <div className="feed-right-container">
        <div className="feed-right">
          <input type="text" placeholder="Search" className="search" />
          <div className="trending">
            <h5>Trending</h5>
            <div className="trending-project">
              <div className="trending-project-desc">
                <p>A better Twitter</p>
                <h6>by Rahul Mehra</h6>
              </div>
              <img src={trending} alt="" className="trending-project-img" />
            </div>
            <div className="trending-project">
              <div className="trending-project-desc">
                <p>A better Twitter</p>
                <h6>by Rahul Mehra</h6>
              </div>
              <img src={trending} alt="" className="trending-project-img" />
            </div>
            <div className="trending-project">
              <div className="trending-project-desc">
                <p>A better Twitter</p>
                <h6>by Rahul Mehra</h6>
              </div>
              <img src={trending} alt="" className="trending-project-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
