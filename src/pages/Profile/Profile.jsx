import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  projectSelector,
  fetchProjectsOfUser,
} from "../../slices/project.slice";
import Layout from "../../components/Layout/Layout";
import Project from "../../components/Project/Project";
import PageHeader from "../../components/PageHeader/PageHeader";
import { GrLocation } from "react-icons/gr";
import {
  AiOutlineGithub,
  AiOutlineTwitter,
  AiFillLinkedin,
} from "react-icons/ai";
import LanguageIcon from "@mui/icons-material/Language";
import { CircularProgress } from "@mui/material";
import profile from "../../assets/profile.png";
import profilecover from "../../assets/profilecover.png";
import message from "../../assets/message.svg";
import "./Profile.css";
import { getUser } from "../../utils/auth.js";

const tempTags = ["HTML", "CSS", "Javascript", "React", "Node", "MongoDB"];

const Profile = () => {
  const history = useHistory();
  const { username } = useParams();
  const dispatch = useDispatch();
  const { userProjects, userProjectsLoading, userProjectsError } =
    useSelector(projectSelector);

  useEffect(() => {
    dispatch(fetchProjectsOfUser(username));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <>
        {userProjectsLoading && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "5rem",
            }}
          >
            <CircularProgress color="primary" size="5rem" />
          </div>
        )}
        <PageHeader text="Mahesh Sharma" />
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
              {tempTags.map((item, index) => (
                <button className="profile-tag" key={`${item}-${index}`}>
                  {item}
                </button>
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
            {userProjects.map(
              ({
                author,
                projectName,
                details,
                tags,
                code,
                live,
                image,
                createdAt,
                upvotes,
                upvoters,
                _id,
              }) => (
                <Project
                  author={author}
                  projectName={projectName}
                  details={details}
                  tags={tags}
                  code={code}
                  live={live}
                  image={image}
                  createdAt={createdAt}
                  upvotes={upvotes}
                  upvoters={upvoters}
                  key={_id}
                />
              )
            )}
          </>
        </div>
      </>
    </Layout>
  );
};

export default Profile;
