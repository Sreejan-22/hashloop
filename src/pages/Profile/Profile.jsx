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
import profile from "../../assets/profile.png";
import profilecover from "../../assets/profilecover.png";
// import message from "../../assets/message.svg";
import "./Profile.css";
import { isAuthenticated, getUser } from "../../utils/auth.js";
import { baseUrl } from "../../utils/constants";
import { notifyError } from "../../utils/notifyToasts";

const user = getUser();

const Profile = () => {
  const history = useHistory();
  const { username } = useParams();
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { userProjects, userProjectsLoading, userProjectsError } =
    useSelector(projectSelector);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    async function fetchProfileDetails() {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/profile/${username}`);
        const data = await res.json();
        if (data.success) {
          setProfileData(data.profile);
          setFollowing((prev) => {
            if (
              isAuthenticated() &&
              data.profile.followers.includes(user.username)
            ) {
              return true;
            } else {
              return false;
            }
          });
          setLoading(false);
        } else {
          console.log("error here");
          setLoading(false);
          notifyError("Failed to fetch profile details");
        }
      } catch (err) {
        console.log("error here", err);
        setLoading(false);
        notifyError("Failed to fetch profile details");
      }
    }

    fetchProfileDetails();

    dispatch(fetchProjectsOfUser(username));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        setProfileData((prev) => {
          const temp = { ...prev };
          temp.followers = following ? temp.followers - 1 : temp.followers + 1;
          return temp;
        });
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
            <CircularProgress color="primary" size="5rem" />
          </div>
        )}
        {!(userProjectsLoading || loading) && (
          <>
            <PageHeader text={profileData.name} />
            <div className="profile-info-container">
              {"cover" in profileData ? (
                <img src={profilecover} alt="" className="profile-cover-img" />
              ) : (
                <div
                  className="profile-cover-img"
                  style={{ backgroundColor: "rgb(207, 217, 222)" }}
                ></div>
              )}
              <div className="profile-pic">
                <img
                  src={
                    "pic" in profileData
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
                            // history.push(`/editprofile/${profileData.username}`)
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
                <div className="profile-location">
                  {"city" in profileData || "country" in profileData ? (
                    <GrLocation />
                  ) : null}
                  &nbsp;&nbsp;
                  <h5>
                    {"city" in profileData ? `${profileData.city}, ` : null}
                    {"country" in profileData ? profileData.country : null}
                  </h5>
                </div>
                <div className="profile-tags">
                  {"skills" in profileData &&
                    profileData.skills.map((item, index) => (
                      <button className="profile-tag" key={`${item}-${index}`}>
                        {item}
                      </button>
                    ))}
                </div>
                <div className="profile-links">
                  {"github" in profileData && (
                    <a href={profileData.github}>
                      <AiOutlineGithub />
                    </a>
                  )}
                  {"twitter" in profileData && (
                    <a href={profileData.twitter}>
                      <AiOutlineTwitter />
                    </a>
                  )}
                  {"linkedin" in profileData && (
                    <a href={profileData.linkedin}>
                      <AiFillLinkedin />
                    </a>
                  )}
                  {"portfolio" in profileData && (
                    <a href={profileData.portfolio}>
                      <LanguageIcon />
                    </a>
                  )}
                </div>
                <div className="profile-follower-data">
                  <div className="followers">
                    <span>
                      {"followers" in profileData
                        ? profileData.followers.length
                        : ""}
                    </span>
                    &nbsp;
                    <span style={{ fontSize: "0.8rem" }}>Followers</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </div>
                  <div className="following">
                    <span>
                      {"following" in profileData
                        ? profileData.following.length
                        : ""}
                    </span>
                    &nbsp;
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
                    username,
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
                      username={username}
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
