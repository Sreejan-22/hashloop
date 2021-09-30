import Layout from "../../components/Layout/Layout";
import Project from "../../components/Project/Project";
import { BiArrowBack } from "react-icons/bi";

import "./SingleProject.css";

const SingleProject = () => {
  return (
    <Layout>
      <>
        <div className="profile-page-header">
          <BiArrowBack />
          &nbsp;&nbsp;&nbsp;
          <span>Project</span>
        </div>
        <div className="feed-content">
          <Project />
        </div>
      </>
    </Layout>
  );
};

export default SingleProject;
