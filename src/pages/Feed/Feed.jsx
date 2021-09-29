import Layout from "../../components/Layout/Layout";
import Project from "../../components/Project/Project";
import HomeIcon from "@mui/icons-material/Home";
import { FiEdit } from "react-icons/fi";
import "./Feed.css";

const Feed = () => {
  return (
    <Layout>
      <>
        <div className="feed-header">
          <HomeIcon />
          &nbsp;&nbsp;
          <span>Feed</span>
        </div>
        <button className="new-project-btn">
          <span>
            <FiEdit style={{ height: "1.2rem", width: "1.2rem" }} />
          </span>
          <span>&nbsp;&nbsp;New Project</span>
        </button>
        <div className="feed-content">
          <>
            {[1, 2].map((item) => (
              <Project />
            ))}
          </>
        </div>
      </>
    </Layout>
  );
};

export default Feed;
