import { useState } from "react";
import { styled } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  BiUpvote,
  BiCommentDetail,
  BiShareAlt,
  BiBookmark,
} from "react-icons/bi";
import profile from "../../assets/profile.png";
import project from "../../assets/project.png";
import "./Project.css";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 20,
    boxShadow: "0px 2px 24px 2px rgba(0, 6, 148, 0.08);",
    width: "150px",
    padding: 10,
  },
}));

const Project = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
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
        <MoreVertIcon onClick={handleClick} />
        <StyledMenu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Message</MenuItem>
          <MenuItem onClick={handleClose}>Follow</MenuItem>
          <MenuItem onClick={handleClose}>Report</MenuItem>
        </StyledMenu>
      </div>
      <div className="project-desc">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta ea fuga
        laboriosam labore blanditiis, dolor animi voluptatem. Nihil corrupti
        dolorem, rem tempore eum error, quo enim veritatis, mollitia animi
        adipisci.
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
  );
};

export default Project;
