import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { StyledMenu, StyledCommentMenu } from "../StyledMenu/StyledMenu";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  BiUpvote,
  BiCommentDetail,
  BiShareAlt,
  BiBookmark,
} from "react-icons/bi";
import profile from "../../assets/profile.png";
import "./Project.css";
import { isAuthenticated, getUser } from "../../utils/auth";
import { getDate } from "../../utils/date";

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
}) => {
  const history = useHistory();
  const [showComments, setShowComments] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorComment, setAnchorComment] = useState(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorComment);

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

  const handleClick2 = (e) => {
    setAnchorComment(e.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorComment(null);
  };

  return (
    <div className="project">
      <div className="project-header">
        <Link to="/profile">
          <img src={profile} alt="" className="profile-img" />
        </Link>
        <div className="project-header-child">
          <div>
            <Link to="/profile">
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
                <MenuItem onClick={handleClose}>Edit</MenuItem>
              )}
              {getUser().username === username && (
                <MenuItem onClick={handleClose}>Delete</MenuItem>
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
        <a href={live} target="_blank" rel="noreferrer">
          View Live
        </a>
        &nbsp;&nbsp;&nbsp;
        <a href={code} target="_blank" rel="noreferrer">
          View Source
        </a>
      </div>
      <img src={image} alt="" className="project-img" />
      <div className="project-options">
        <span>
          <BiUpvote />
          &nbsp; <span className="upvotes">{upvotes}</span>
        </span>
        <BiCommentDetail />
        <BiShareAlt />
        <BiBookmark />
      </div>
      {showComments && (
        <>
          <hr className="divider" />
          <div className="comment-section">
            <div className="post-comment">
              <div>
                <Link to="/profile">
                  <img src={profile} alt="" className="profile-img" />
                </Link>
                <OutlinedInput
                  placeholder="Enter comment"
                  multiline
                  minRows="1"
                  style={{
                    padding: "10px 14px",
                    marginLeft: "1rem",
                    flexGrow: "0.9",
                  }}
                />
              </div>
              <button className="post-comment-btn">Post</button>
            </div>
            <br />
            <br />
            {[1, 2].map((item) => (
              <div className="comment-box" key={item}>
                <div className="project-header">
                  <Link to="/profile">
                    <img src={profile} alt="" className="profile-img" />
                  </Link>
                  <div className="project-header-child">
                    <div>
                      <Link to="/profile">
                        Mahesh Sharma &#8226; <span>21/03/21</span>
                      </Link>
                    </div>
                    <div>
                      <span>React / Vue Developer</span>
                    </div>
                  </div>
                  {isAuthenticated() && (
                    <>
                      <MoreHorizIcon onClick={handleClick2} />
                      <StyledCommentMenu
                        id="basic-menu"
                        anchorEl={anchorComment}
                        open={open2}
                        onClose={handleClose2}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                        borderRadius="6"
                        padding="0"
                      >
                        <MenuItem onClick={handleClose2}>Report</MenuItem>
                      </StyledCommentMenu>
                    </>
                  )}
                </div>
                <div className="comment-text">Looks cool lets talk</div>
                <div className="comment-icons">
                  <BiUpvote />{" "}
                  <span> &nbsp;&nbsp;Upvote &nbsp;&#8226;&nbsp; 2</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Project;
