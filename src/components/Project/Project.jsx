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

const Project = () => {
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
        <MoreVertIcon />
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
