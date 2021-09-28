import Layout from "../../components/Layout/Layout";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  BiUpvote,
  BiCommentDetail,
  BiShareAlt,
  BiBookmark,
  BiArrowBack,
} from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import {
  AiOutlineGithub,
  AiOutlineTwitter,
  AiFillLinkedin,
} from "react-icons/ai";
import LanguageIcon from "@mui/icons-material/Language";

import profile from "../../assets/profile.png";
import profilecover from "../../assets/profilecover.png";
import project from "../../assets/project.png";
import message from "../../assets/message.svg";
import "./Profile.css";

const tags = ["HTML", "CSS", "Javascript", "React", "Node", "MongoDB"];

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
          <div className="profile-pic">
            <img
              src={profile}
              alt=""
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderRadius: "inherit",
                border: "1px solid white",
              }}
            />
          </div>
          <div className="profile-details">
            <div className="profile-name-container">
              <h4>Mahesh Sharma</h4>
              <div>
                <img
                  src={message}
                  alt=""
                  className="message-icon"
                  style={{
                    width: "34px",
                    height: "34px",
                    marginRight: "1rem",
                    cursor: "pointer",
                  }}
                />
                <button className="follow-btn">Follow</button>
              </div>
            </div>
            <div className="profile-bio">
              Senior Software Engineer @Microsoft | Creator of India’s biggest
              programming community | Tweets about JavaScript, ReactJS, Career
              and Startups
            </div>
            <div className="profile-location">
              <GrLocation />
              &nbsp;&nbsp;
              <h5>Bangalore, India</h5>
            </div>
            <div className="profile-tags">
              {tags.map((item) => (
                <button className="profile-tag">{item}</button>
              ))}
            </div>
            <div className="profile-links">
              <a href="">
                <AiOutlineGithub />
              </a>
              <a href="">
                <AiOutlineTwitter />
              </a>
              <a href="">
                <AiFillLinkedin />
              </a>
              <a href="">
                <LanguageIcon />
              </a>
            </div>
            <div className="profile-follower-data">
              <div className="followers">
                <span>316</span>&nbsp;
                <span style={{ fontSize: "0.8rem" }}>Followers</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              <div className="following">
                <span>116</span>&nbsp;
                <span style={{ fontSize: "0.8rem" }}>Following</span>
                &nbsp;&nbsp;
              </div>
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
