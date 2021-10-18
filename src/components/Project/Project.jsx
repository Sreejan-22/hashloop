import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUpvoteCount } from "../../slices/project.slice";
import { StyledMenu } from "../StyledMenu/StyledMenu";
import CommentSection from "../CommentSection/CommentSection";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { BiCommentDetail, BiShareAlt, BiBookmark } from "react-icons/bi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profile from "../../assets/profile.png";
import upvotefilled from "../../assets/upvotefilled.svg";
import upvoteoutlined from "../../assets/upvoteoutlined.svg";
import "./Project.css";
import { isAuthenticated, getUser } from "../../utils/auth";
import { getDate } from "../../utils/date";
import { baseUrl } from "../../utils/constants";
import { notifyError, notifySuccess } from "../../utils/notifyToasts";

const user = getUser();

const Project = ({
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
  id,
}) => {
  const history = useHistory();
  const [showComments, setShowComments] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const isUpvotedInitial = isAuthenticated()
    ? upvoters.includes(getUser().username)
      ? true
      : false
    : false;
  const [isUpvoted, setIsUpvoted] = useState(isUpvotedInitial);

  const dispatch = useDispatch();

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (history.location.pathname.includes("/projects")) {
      setShowComments(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (e) => {
    handleClose();

    if (window.confirm("Do you want to delete this project?")) {
      try {
        const res = await fetch(`${baseUrl}/projects/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          window.location.reload();
        } else {
          notifyError(data.message);
        }
      } catch (err) {
        notifyError("Failed to delete project");
      }
    }
  };

  const handleUpvote = async () => {
    if (isAuthenticated()) {
      // if isUpvoted is false, after clicking on the upvote button it will become true and vice versa
      const newCount = isUpvoted ? upvotes - 1 : upvotes + 1;
      let newUpvotersList = [...upvoters];
      if (isUpvoted) {
        newUpvotersList = newUpvotersList.filter(
          (item) => item !== getUser().username
        );
      } else {
        newUpvotersList.push(getUser().username);
      }

      // update frontend
      setIsUpvoted(!isUpvoted);
      dispatch(updateUpvoteCount({ id, newCount, newUpvotersList }));

      // update database
      const upvoteData = {
        newCount,
        newUpvotersList,
      };
      try {
        const res = await fetch(`${baseUrl}/upvotes/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${getUser().token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(upvoteData),
        });
        const data = await res.json();
        if (!data.success) {
          notifyError(data.message);
        }
      } catch (err) {
        notifyError("Failed to upvote project");
      }
    } else {
      history.push("/login");
    }
  };

  const postComment = () => {};

  return (
    <div className="project">
      <div className="project-header">
        <Link to={`/profile/${username}`}>
          <img
            src={
              username === "sam"
                ? profile
                : "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
            }
            alt=""
            className="profile-img"
          />
        </Link>
        <div className="project-header-child">
          <div>
            <Link to={`/profile/${username}`}>
              {author} &#8226; <span>{getDate(createdAt)}</span>
            </Link>
          </div>
        </div>
        {isAuthenticated() && (
          <>
            <MoreHorizIcon onClick={handleClick} />
            <StyledMenu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {getUser().username === username && (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    const project = {
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
                      id,
                    };
                    history.push(`/edit/${id}`, { project });
                  }}
                >
                  Edit
                </MenuItem>
              )}
              {getUser().username === username && (
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              )}
              {getUser().username !== username && (
                <MenuItem onClick={handleClose}>Follow</MenuItem>
              )}
              {getUser().username !== username && (
                <MenuItem onClick={handleClose}>Report</MenuItem>
              )}
            </StyledMenu>
          </>
        )}
      </div>
      <div className="project-title">{projectName}</div>
      <div className="project-desc">{details}</div>
      <div className="project-tags">
        {tags.map((item) => (
          <button className="project-tag" key={item}>
            {item}
          </button>
        ))}
      </div>
      <div className="project-links">
        {live && (
          <a href={live} target="_blank" rel="noreferrer">
            View Live
          </a>
        )}
        &nbsp;&nbsp;&nbsp;
        <a href={code} target="_blank" rel="noreferrer">
          View Source
        </a>
      </div>
      {image && <img src={image} alt="" className="project-img" />}
      <div className="project-options">
        <span>
          <img
            src={isUpvoted ? upvotefilled : upvoteoutlined}
            alt=""
            style={{ height: "18px", width: "18px" }}
            onClick={handleUpvote}
          />{" "}
          &nbsp;&nbsp; <span className="upvotes">{upvotes}</span>
        </span>
        <BiCommentDetail
          onClick={() => {
            const project = {
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
              id,
            };
            history.push(`/projects/${id}`, { project });
          }}
        />
        <BiShareAlt />
        <BiBookmark />
      </div>
      {/* comments section */}
      {showComments && <CommentSection username={username} />}
      <ToastContainer />
    </div>
  );
};

export default Project;
