import { useHistory } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Project from "../../components/Project/Project";
import { BiArrowBack } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import {
  AiOutlineGithub,
  AiOutlineTwitter,
  AiFillLinkedin,
} from "react-icons/ai";
import LanguageIcon from "@mui/icons-material/Language";

import profile from "../../assets/profile.png";
import profilecover from "../../assets/profilecover.png";
import message from "../../assets/message.svg";
import "./Profile.css";

const tags = ["HTML", "CSS", "Javascript", "React", "Node", "MongoDB"];

const Profile = () => {
  const history = useHistory();

  return (
    <Layout>
      <>
        <div className="profile-page-header">
          <BiArrowBack onClick={() => history.goBack()} />
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
              <a href="https://github.com/Sreejan-22">
                <AiOutlineGithub />
              </a>
              <a href="https://github.com/Sreejan-22">
                <AiOutlineTwitter />
              </a>
              <a href="https://github.com/Sreejan-22">
                <AiFillLinkedin />
              </a>
              <a href="https://github.com/Sreejan-22">
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
              <Project />
            ))}
          </>
        </div>
      </>
    </Layout>
  );
};

export default Profile;
