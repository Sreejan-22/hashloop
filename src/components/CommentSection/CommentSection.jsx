import { useState } from "react";
import { Link } from "react-router-dom";
import { StyledCommentMenu } from "../StyledMenu/StyledMenu";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import profile from "../../assets/profile.png";
import "./CommentSection.css";
import { isAuthenticated } from "../../utils/auth";

const CommentSection = ({ username }) => {
  const [anchorComment, setAnchorComment] = useState(null);

  const open2 = Boolean(anchorComment);

  const handleClick2 = (e) => {
    setAnchorComment(e.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorComment(null);
  };

  return (
    <>
      <hr className="divider" />
      <div className="comment-section">
        <div className="post-comment">
          <div>
            <Link to="/profile">
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
                  <Link to="/profile">
                    Mahesh Sharma &#8226; <span>21/03/21</span>
                  </Link>
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
            {/* <div className="comment-icons">
                  <img
                    src={upvoteoutlined}
                    alt=""
                    style={{ height: "20px", width: "18px" }}
                  />{" "}
                  <span> &nbsp;&nbsp;Upvote &nbsp;&#8226;&nbsp; 2</span>
                </div> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentSection;
