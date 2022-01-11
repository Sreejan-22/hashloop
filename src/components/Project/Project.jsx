import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUpvoteCount,
  setSavedProjects,
  projectSelector,
} from "../../slices/project.slice";
import { StyledMenu } from "../StyledMenu/StyledMenu";
import CommentSection from "../CommentSection/CommentSection";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { BiCommentDetail } from "react-icons/bi";
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";
import upvotefilled from "../../assets/upvotefilled.svg";
import upvoteoutlined from "../../assets/upvoteoutlined.svg";
import "./Project.css";
import { isAuthenticated, getUser } from "../../utils/auth";
import { getDate } from "../../utils/date";
import { baseUrl } from "../../utils/constants";
import {
  notifySuccess,
  notifyError,
  notifyInfo,
} from "../../utils/notifyToasts";
import { doesPropertyExist } from "../../utils/doesPropertyExist";

const isUpvoted = (upvoters) => {
  return isAuthenticated()
    ? upvoters.includes(getUser().username)
      ? true
      : false
    : false;
};

const Project = ({ project }) => {
  const history = useHistory();
  const [showComments, setShowComments] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { savedProjects } = useSelector(projectSelector);

  const {
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
    _id: id,
    authorId,
  } = project;

  const dispatch = useDispatch();

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (history.location.pathname.includes("/projects")) {
      setShowComments(true);
    }

    if (isAuthenticated()) {
      dispatch(setSavedProjects(getUser().savedProjects));
    }
  }, [history.location.pathname, dispatch]);

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
            Authorization: `Bearer ${getUser().token}`,
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
      const newCount = isUpvoted(upvoters) ? upvotes - 1 : upvotes + 1;
      let newUpvotersList = [...upvoters];
      if (isUpvoted(upvoters)) {
        newUpvotersList = newUpvotersList.filter(
          (item) => item !== getUser().username
        );
      } else {
        newUpvotersList.push(getUser().username);
      }

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
        if (data.success) {
          dispatch(updateUpvoteCount({ id, newCount, newUpvotersList }));
        } else {
          notifyError(data.message);
        }
      } catch (err) {
        notifyError("Failed to upvote project");
      }
    } else {
      history.push("/login");
    }
  };

  const save = async () => {
    if (isAuthenticated()) {
      try {
        const res = await fetch(
          `${baseUrl}/saved/${getUser().username}/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getUser().token}`,
            },
          }
        );
        const data = await res.json();
        if (data.success) {
          let temp = [...getUser().savedProjects];
          temp.push(id);
          let userData = { ...getUser(), savedProjects: temp };
          localStorage.setItem("user", JSON.stringify(userData));
          dispatch(setSavedProjects(temp));
          notifySuccess("Project bookmarked");
        } else {
          notifyError("Failed to bookmark project");
        }
      } catch (err) {
        notifyError("Failed to bookmark project");
      }
    }
  };

  const unsave = async () => {
    if (isAuthenticated()) {
      try {
        const res = await fetch(
          `${baseUrl}/saved/${getUser().username}/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getUser().token}`,
            },
          }
        );
        const data = await res.json();
        if (data.success) {
          let temp = [...getUser().savedProjects];
          const index = temp.findIndex((item) => item === id);
          temp.splice(index, 1);
          let userData = { ...getUser(), savedProjects: temp };
          localStorage.setItem("user", JSON.stringify(userData));
          dispatch(setSavedProjects(temp));
          if (window.location.pathname === "/saved") {
            window.location.reload();
          } else {
            notifyInfo("Project removed from bookmarks");
          }
        } else {
          notifyError("Failed to remove from bookmarks");
        }
      } catch (err) {
        notifyError("Failed to remove from bookmarks");
      }
    }
  };

  return (
    <div className="project">
      <div className="project-header">
        <Link to={`/profile/${username}`}>
          <img
            src={
              doesPropertyExist("pic", authorId)
                ? authorId.pic
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
        {isAuthenticated() && getUser().username === username ? (
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
                    history.push(`/edit/${id}`, { project });
                  }}
                >
                  Edit
                </MenuItem>
              )}
              {getUser().username === username && (
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              )}
            </StyledMenu>
          </>
        ) : null}
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
            src={isUpvoted(upvoters) ? upvotefilled : upvoteoutlined}
            alt=""
            style={{ height: "18px", width: "18px" }}
            onClick={handleUpvote}
          />{" "}
          &nbsp;&nbsp; <span className="upvotes">{upvotes}</span>
        </span>
        <BiCommentDetail
          onClick={() => {
            history.push(`/projects/${id}`, { project });
          }}
        />
        {isAuthenticated() ? (
          savedProjects.includes(id) ? (
            <MdBookmark
              style={{ height: "1.5rem", width: "1.5rem" }}
              onClick={unsave}
            />
          ) : (
            <MdBookmarkBorder
              style={{ height: "1.5rem", width: "1.5rem" }}
              onClick={save}
            />
          )
        ) : null}
      </div>
      {/* comments section */}
      {showComments && <CommentSection />}
    </div>
  );
};

export default Project;
