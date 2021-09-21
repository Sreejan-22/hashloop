import Layout from "../../components/Layout/Layout";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  BiUpvote,
  BiCommentDetail,
  BiShareAlt,
  BiBookmark,
  // BiSearch,
  BiArrowBack,
} from "react-icons/bi";
import { GrLocation } from "react-icons/gr";

import profile from "../../assets/profile.png";
import profilecover from "../../assets/profilecover.png";
import project from "../../assets/project.png";
import message from "../../assets/message.svg";
import "./Profile.css";

const profileBio =
  "Senior Software Engineer @Microsoft | Creator of India’s biggest programming community | Tweets about JavaScript, ReactJS, Career and Startups";

const Profile = () => {
  return (
    <Layout>
      <>
        <div className="profile-page-header">
          <BiArrowBack />
          &nbsp;&nbsp;&nbsp;
          <span>Mahesh Sharma</span>
        </div>
        <div className="profile-info-container">
          <img src={profilecover} alt="" className="profile-cover-img" />
          <br />
          <br />
          <div className="profile-details">
            <div className="profile-name-container">
              <h4>Mahesh Sharma</h4>
              <span>
                <img
                  src={message}
                  alt=""
                  className="message-icon"
                  style={{ width: "24px", height: "24px" }}
                />
                <button className="follow-btn">Follow</button>
              </span>
            </div>
          </div>
        </div>
        <div className="feed-content">
          <>
            {[1, 2].map((item) => (
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
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dicta ea fuga laboriosam labore blanditiis, dolor animi
                  voluptatem. Nihil corrupti dolorem, rem tempore eum error, quo
                  enim veritatis, mollitia animi adipisci.
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
            ))}
          </>
        </div>
      </>
    </Layout>
  );
};

export default Profile;
