import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  projectSelector,
  fetchProjectsOfUser,
} from "../../slices/project.slice";
import Layout from "../../components/Layout/Layout";
import Project from "../../components/Project/Project";
import PageHeader from "../../components/PageHeader/PageHeader";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";
import { GrLocation } from "react-icons/gr";
import {
  AiOutlineGithub,
  AiOutlineTwitter,
  AiFillLinkedin,
} from "react-icons/ai";
import LanguageIcon from "@mui/icons-material/Language";
import { CircularProgress } from "@mui/material";
import "./Profile.css";
import { isAuthenticated, getUser } from "../../utils/auth.js";
import { baseUrl } from "../../utils/constants";
import { notifyError } from "../../utils/notifyToasts";
import { doesPropertyExist } from "../../utils/doesPropertyExist";

const user = getUser();

const Profile = () => {
  const history = useHistory();
  const { username } = useParams();
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { currentProjects, userProjectsLoading } = useSelector(projectSelector);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    async function fetchProfileDetails() {
      // setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/profile/${username}`);
        const data = await res.json();
        if (data.success) {
          setProfileData(data.profile);
          setFollowing((prev) => {
            if (
              isAuthenticated() &&
              data.profile.followers.includes(getUser().username)
            ) {
              return true;
            } else {
              return false;
            }
          });
          setLoading(false);
        } else {
          setLoading(false);
          notifyError("Failed to fetch profile details");
        }
      } catch (err) {
        setLoading(false);
        notifyError("Failed to fetch profile details");
      }
    }

    fetchProfileDetails();

    dispatch(fetchProjectsOfUser(username));
  }, [dispatch, username]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFollow = async () => {
    let follow = following;
    follow = !follow;

    try {
      const res = await fetch(`${baseUrl}/follow`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          follow,
          follower: user.username,
          person: profileData.username,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setProfileData(data.personProfile);
        setFollowing(!following);
      } else {
        notifyError("An error occurred");
      }
    } catch (err) {
      notifyError("An error occurred");
    }
  };

  return (
    <Layout>
      <>
        {(userProjectsLoading || loading) && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "5rem",
            }}
          >
            <CircularProgress color="primary" />
          </div>
        )}
        {!(userProjectsLoading || loading) && (
          <>
            <PageHeader text={profileData.name} />
            <div className="profile-info-container">
              {doesPropertyExist("cover", profileData) ? (
                <img
                  src={profileData.cover}
                  alt=""
                  className="profile-cover-img"
                />
              ) : (
                <div
                  className="profile-cover-img"
                  style={{ backgroundColor: "rgb(207, 217, 222)" }}
                ></div>
              )}
              <div className="profile-pic">
                <img
                  src={
                    doesPropertyExist("pic", profileData)
                      ? profileData.pic
                      : "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                  }
                  alt=""
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "inherit",
                    border: "1px solid white",
                  }}
                />
                {/* <AccountCircleIcon /> */}
              </div>
              <div className="profile-details">
                <div className="profile-name-container">
                  <h4>{profileData.name}</h4>
                  <div>
                    {isAuthenticated() ? (
                      profileData.username === getUser().username ? (
                        <button
                          className="follow-btn"
                          onClick={() =>
                            handleClickOpen()
                          }
                        >
                          Edit Profile
                        </button>
                      ) : (
                        <button className="follow-btn" onClick={handleFollow}>
                          {following ? "Following" : "Follow"}
                        </button>
                      )
                    ) : (
                      <button
                        className="follow-btn"
                        onClick={() => history.push("/login")}
                      >
                        Follow
                      </button>
                    )}
                  </div>
                </div>
                <div className="profile-bio">
                  {"bio" in profileData ? profileData.bio : null}
                </div>
                {doesPropertyExist("city", profileData) ? (
                  <div className="profile-location">
                    <GrLocation />
                    &nbsp;&nbsp;
                    <h5>
                      {profileData.city}
                      {/* {"country" in profileData ? profileData.country : null} */}
                    </h5>
                  </div>
                ) : null}
                <div className="profile-tags">
                  {doesPropertyExist("skills", profileData)
                    ? profileData.skills.map((item, index) => (
                        <button
                          className="profile-tag"
                          key={`${item}-${index}`}
                        >
                          {item}
                        </button>
                      ))
                    : null}
                </div>
                <div className="profile-links">
                  {doesPropertyExist("github", profileData) ? (
                    <a
                      href={profileData.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <AiOutlineGithub />
                    </a>
                  ) : null}
                  {doesPropertyExist("twitter", profileData) ? (
                    <a
                      href={profileData.twitter}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <AiOutlineTwitter />
                    </a>
                  ) : null}
                  {doesPropertyExist("linkedin", profileData) ? (
                    <a
                      href={profileData.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <AiFillLinkedin />
                    </a>
                  ) : null}
                  {doesPropertyExist("portfolio", profileData) ? (
                    <a
                      href={profileData.portfolio}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <LanguageIcon />
                    </a>
                  ) : null}
                </div>
                <div className="profile-follower-data">
                  <div className="followers">
                    <span>{profileData.followers.length}</span>
                    &nbsp;
                    <span style={{ fontSize: "0.8rem" }}>{profileData.followers.length > 1 ? "Followers": "Follower"}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="following">
                    <span>{profileData.following.length}</span>
                    &nbsp;
                    <span style={{ fontSize: "0.8rem" }}>Following</span>
                    &nbsp;&nbsp;
                  </div>
                </div>
              </div>
            </div>
            <div className="feed-content">
              <>
                {currentProjects.map((item) => (
                  <Project project={item} key={item._id} />
                ))}
              </>
            </div>
          </>
        )}
      </>
      {open && (
        <EditProfileModal
          open={open}
          handleClose={handleClose}
          profileData={profileData}
        />
      )}
    </Layout>
  );
};

export default Profile;
