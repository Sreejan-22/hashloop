import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { StyledCommentMenu } from "../StyledMenu/StyledMenu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { CircularProgress } from "@mui/material";
import profile from "../../assets/profile.png";
import "./CommentSection.css";
import { isAuthenticated, getUser } from "../../utils/auth";
import { baseUrl } from "../../utils/constants";
import { notifyError } from "../../utils/notifyToasts";
import { getDate } from "../../utils/date";

const user = getUser();

const CommentSection = () => {
  const projectId = useParams().id;
  const [anchorComment, setAnchorComment] = useState(null);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);

  const open2 = Boolean(anchorComment);

  useEffect(() => {
    setCommentsLoading(true);

    fetch(`${baseUrl}/comments/${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAllComments(data.comments);
        } else {
          notifyError("Failed to fetch comments");
        }
        setCommentsLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        notifyError("Failed to fetch comments");
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick2 = (e) => {
    setAnchorComment(e.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorComment(null);
  };

  const postComment = async () => {
    if (comment.length) {
      setLoading(true);
      setComment("");
      try {
        const res = await fetch(`${baseUrl}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            projectId,
            username: user.username,
            author: user.name,
            commentText: comment,
          }),
        });

        const data = await res.json();
        if (data.success) {
          setAllComments((prev) => {
            const temp = [...prev];
            temp.push(data.comment);
            return temp;
          });
          setLoading(false);
        } else {
          setLoading(false);
          notifyError("Failed to post comment");
        }
      } catch (err) {
        setLoading(false);
        notifyError("Failed to post comment");
      }
    }
  };

  const deleteComment = async (id, index) => {
    handleClose2();

    if (window.confirm("Do you want to delete this comment?")) {
      try {
        const res = await fetch(`${baseUrl}/comments/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setAllComments((prev) => {
            const temp = [...prev];
            temp.splice(index, 1);
            return temp;
          });
        } else {
          notifyError("Failed to delete comment");
        }
      } catch (err) {
        notifyError("Failed to delete comment");
      }
    }
  };

  return (
    <>
      <hr className="divider" />
      <div className="comment-section">
        {!isAuthenticated() ? (
          <div>
            <Link
              to="/login"
              style={{ textDecoration: "underline", color: "blue" }}
            >
              Login
            </Link>
            &nbsp;to comment
          </div>
        ) : (
          <div className="post-comment">
            <div>
              <Link to={`/profile/${user.username}`}>
                <img
                  src={
                    user.username === "sam"
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
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            {/* <button className="post-comment-btn" onClick={postComment}>
            Post <CircularProgress style={{ color: "white" }} />
          </button> */}
            {loading ? (
              <Button
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: "#4399ff",
                  height: "2.5rem",
                  fontFamily: "Montserrat, sans-serif",
                }}
                endIcon={
                  <CircularProgress
                    sx={{ color: "white" }}
                    thickness="3"
                    size="1rem"
                  />
                }
                onClick={postComment}
              >
                Post
              </Button>
            ) : (
              <button className="post-comment-btn" onClick={postComment}>
                Post
              </button>
            )}
          </div>
        )}
        <br />
        <br />
        {commentsLoading && <p>Loading...</p>}
        {!commentsLoading &&
          allComments.map((item, index) => (
            <div className="comment-box" key={item._id}>
              <div className="project-header">
                <Link to={`/profile/${item.username}`}>
                  <img
                    src={
                      item.username === "sam"
                        ? profile
                        : "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                    }
                    alt=""
                    className="profile-img"
                  />
                </Link>
                <div className="project-header-child">
                  <div>
                    <Link to={`/profile/${item.username}`}>
                      {item.author} &#8226;{" "}
                      <span>{getDate(item.createdAt)}</span>
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
                      // borderRadius="6"
                      padding="0"
                    >
                      <MenuItem onClick={handleClose2}>Report</MenuItem>
                      {user.username === item.username && (
                        <MenuItem
                          onClick={() => deleteComment(item._id, index)}
                        >
                          Delete
                        </MenuItem>
                      )}
                    </StyledCommentMenu>
                  </>
                )}
              </div>
              <div className="comment-text">{item.commentText}</div>
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
